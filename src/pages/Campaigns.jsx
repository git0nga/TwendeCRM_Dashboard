import { useState } from "react";
import api from "../api/client";
export default function Campaigns(){
  const [body, setBody] = useState({
    campaign_id:"august-promo",
    message:"Karibu! 20% off leo na kesho—twende!",
    group:"Retail", tags:["VIP"]
  });
  const [resp,setResp] = useState(null);
  const sendNow = async () => {
    const { data } = await api.post("/campaigns/bulk-send-now", body);
    setResp(data);
  };
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Bulk Send Now</h2>
      <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(body,null,2)}</pre>
      <button onClick={sendNow} className="px-3 py-2 bg-black text-white rounded">Send</button>
      {resp && <pre className="bg-gray-50 p-3 rounded text-sm">{JSON.stringify(resp,null,2)}</pre>}
    </div>
  );
}