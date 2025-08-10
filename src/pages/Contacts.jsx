import { useState } from "react";
import Papa from "papaparse";
import api from "../api/client";

export default function Contacts(){
  const [json, setJson] = useState(`[{
  "phone":"+254712345678","name":"Janet","tags":["VIP"],"group":"Retail"
}]`);
  const [resp, setResp] = useState(null);
  const [csvInfo, setCsvInfo] = useState(null);

  const importContacts = async (contacts) => {
    const body = { contacts };
    const { data } = await api.post("/contacts/import", body);
    setResp(data);
  };

  const handleJsonImport = async () => {
    try {
      const contacts = JSON.parse(json);
      await importContacts(contacts);
    } catch(e){
      alert("Invalid JSON");
    }
  };

  const onCsv = (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data.map(r => ({
          phone: String(r.phone || "").trim(),
          name: r.name || null,
          tags: (r.tags ? String(r.tags).split(/[;,]/).map(s=>s.trim()).filter(Boolean) : []),
          group: r.group || null
        })).filter(r => r.phone);
        setCsvInfo({ rows: rows.length, sample: rows.slice(0,3) });
        await importContacts(rows);
      }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Import Contacts</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="font-medium">JSON</div>
          <textarea className="w-full h-56 border p-2 rounded" value={json} onChange={e=>setJson(e.target.value)}/>
          <button onClick={handleJsonImport} className="px-3 py-2 bg-black text-white rounded">Import JSON</button>
        </div>
        <div className="space-y-2">
          <div className="font-medium">CSV (phone,name,tags,group)</div>
          <input type="file" accept=".csv" onChange={onCsv} className="border p-2 rounded w-full"/>
          {csvInfo && <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(csvInfo,null,2)}</pre>}
        </div>
      </div>
      {resp && <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(resp,null,2)}</pre>}
    </div>
  );
}