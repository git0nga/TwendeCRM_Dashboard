import { useEffect, useState } from "react";
import api from "../api/client";
export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const load = async () => setJobs((await api.get("/jobs")).data.jobs || []);
  useEffect(()=>{ load(); },[]);
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Scheduled Jobs</h2>
      <button onClick={load} className="px-3 py-2 bg-black text-white rounded">Refresh</button>
      <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(jobs,null,2)}</pre>
    </div>
  );
}