export default function Table({columns, rows}){
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(c => <th key={c.key} className="text-left px-3 py-2">{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-t">
              {columns.map(c => <td key={c.key} className="px-3 py-2">{r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}