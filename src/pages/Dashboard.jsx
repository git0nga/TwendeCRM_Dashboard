import { useEffect, useState } from "react";
import api from "../api/client";
import StatCard from "../components/StatCard";

export default function Dashboard(){
  const [ok, setOk] = useState(false);
  useEffect(()=>{
    api.get("/").then(()=>setOk(true)).catch(()=>setOk(false));
  },[]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <StatCard label="API Status" value={ok ? "Live ✅" : "Down ❌"} />
      <div className="p-4 border rounded">📣 Bulk Send & Schedule</div>
      <div className="p-4 border rounded">🕒 Jobs (APScheduler)</div>
      <div className="p-4 border rounded">📊 Reports & Logs</div>
    </div>
  );
}