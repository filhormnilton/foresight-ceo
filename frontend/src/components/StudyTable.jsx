export default function StudyTable({ rows = [] }) {
  if (!rows.length) return null

  return (
    <div className="card overflow-hidden">
      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
        Tabela de Cenários — Saída Executiva
      </p>
      <div className="overflow-x-auto">
        <table className="w-full study-table">
          <thead>
            <tr>
              <th>ID Estudo</th>
              <th>Categoria STEEP</th>
              <th>Cenário</th>
              <th>VPL Estimado</th>
              <th>Ação de Arbitragem</th>
              <th>Status de Memória</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <span className="font-mono text-xs text-brand-400">{row.id_estudo}</span>
                </td>
                <td>
                  <span className="badge bg-blue-900/40 text-blue-300">{row.categoria_steep}</span>
                </td>
                <td className="font-medium text-gray-200 min-w-[180px]">{row.cenario}</td>
                <td>
                  <span className="font-mono text-gold-400 font-semibold">{row.vpl_estimado}</span>
                </td>
                <td className="min-w-[200px]">{row.acao_arbitragem}</td>
                <td className="text-gray-400 text-xs min-w-[180px]">{row.status_memoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
