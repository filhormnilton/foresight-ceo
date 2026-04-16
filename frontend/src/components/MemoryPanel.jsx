import { useState } from 'react'
import { clearMemory } from '../services/api'

export default function MemoryPanel({ studies = [], insights = [], onClear }) {
  const [confirmClear, setConfirmClear] = useState(false)

  async function handleClear() {
    if (!confirmClear) { setConfirmClear(true); return }
    await clearMemory()
    setConfirmClear(false)
    onClear?.()
  }

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Memória Persistente
        </p>
        {studies.length > 0 && (
          <button
            onClick={handleClear}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              confirmClear
                ? 'border-red-600 text-red-400 bg-red-900/20'
                : 'border-gray-700 text-gray-500 hover:border-red-700 hover:text-red-400'
            }`}
          >
            {confirmClear ? 'Confirmar?' : 'Limpar'}
          </button>
        )}
      </div>

      {studies.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xs text-gray-600 text-center">
            Nenhum estudo na memória.<br />Realize sua primeira análise.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {[...studies].reverse().map((s, i) => {
            const payload = s.persistence_payload || {}
            return (
              <div key={i} className="p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors bg-gray-900/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-brand-400">{s.id_estudo}</span>
                  <span className="text-[11px] text-gray-600">{s.timestamp?.slice(0, 10)}</span>
                </div>
                <p className="text-xs text-gray-400 leading-snug line-clamp-2">{s.query_original}</p>
                {payload.ceo_insight && (
                  <p className="text-[11px] text-brand-300/70 mt-1 leading-snug line-clamp-2">
                    💡 {payload.ceo_insight}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {insights.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-[11px] text-gray-600 uppercase tracking-wider mb-2">Insights Globais</p>
          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {insights.slice(-5).reverse().map((ins, i) => (
              <div key={i} className="text-[11px] text-gray-500 leading-snug">
                <span className="text-brand-500">•</span> {ins.insight}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
