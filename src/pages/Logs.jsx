import { useEffect, useState } from "react";
import api from "../api/client";
export default function Logs(){
  const [logs,setLogs]=useState(null);
  useEffect(()=>{ api.get("/logs").then(r=>setLogs(r.data)); },[]);
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Logs</h2>
      <a className="inline-block px-3 py-2 bg-black text-white rounded" href={`${import.meta.env.VITE_API_BASE}/logs/csv`} target="_blank">Download CSV</a>
      <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(logs,null,2)}</pre>
    </div>
  );
}