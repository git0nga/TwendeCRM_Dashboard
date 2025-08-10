import { useState } from "react";
import api from "../api/client";
export default function Schedule(){
  const [body,setBody] = useState({
    campaign_id:"evening-deal",
    message:"Deal ya jioni! 10% off saa hii.",
    group:"Retail", tags:["Promo"],
    send_at:"2025-08-09T22:00:00+03:00", max_recipients:500
  });
  const [resp,setResp] = useState(null);
  const schedule = async () => {
    const { data } = await api.post("/campaigns/schedule-bulk", body);
    setResp(data);
  };
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Schedule Bulk</h2>
      <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(body,null,2)}</pre>
      <button onClick={schedule} className="px-3 py-2 bg-black text-white rounded">Schedule</button>
      {resp && <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(resp,null,2)}</pre>}
    </div>
  );
}