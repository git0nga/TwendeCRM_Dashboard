export default function StatCard({label, value}){
  return (
    <div className="p-4 border rounded">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}