import { useMemo, useState } from "react";
import api from "../api/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

function toDay(s){
  if(!s) return "";
  const d = new Date(s);
  return d.toISOString().slice(0,10);
}

export default function Reports(){
  const [campaignId,setCid]=useState("august-promo");
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);

  const load=async()=>{
    setLoading(true);
    try{
      const res = await api.get(`/reports/${campaignId}`);
      setData(res.data);
    } finally{
      setLoading(false);
    }
  };

  const chartData = useMemo(()=>{
    if(!data?.details) return [];
    const map = new Map();
    data.details.forEach(row=>{
      const day = toDay(row.updated_at || row.created_at);
      const isDelivered = (row.status || "").toLowerCase()==="success";
      if(!map.has(day)) map.set(day, { day, delivered:0, failed:0 });
      const obj = map.get(day);
      if(isDelivered) obj.delivered += 1;
      else obj.failed += 1;
    });
    return Array.from(map.values()).sort((a,b)=>a.day.localeCompare(b.day));
  },[data]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reports</h2>
      <div className="flex gap-2">
        <input className="border p-2 rounded" value={campaignId} onChange={e=>setCid(e.target.value)} placeholder="campaign_id"/>
        <button onClick={load} className="px-3 py-2 bg-black text-white rounded">{loading?"Loading...":"Load"}</button>
      </div>
      {data && (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-2xl font-semibold">{data.summary.total}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm text-gray-500">Delivered</div>
              <div className="text-2xl font-semibold">{data.summary.delivered}</div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm text-gray-500">Failed/Pending</div>
              <div className="text-2xl font-semibold">{data.summary.failed_or_pending}</div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="delivered" />
                <Line type="monotone" dataKey="failed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(data.details.slice(0,50),null,2)}</pre>
        </>
      )}
    </div>
  );
}