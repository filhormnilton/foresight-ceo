import { useState } from 'react'

export default function ChatWindow({ onSubmit, loading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim() || loading) return
    onSubmit(query.trim())
    setQuery('')
  }

  const placeholder = `Descreva o tema para análise estratégica...
Ex.: "Impacto da IA generativa no setor financeiro brasileiro"
Ex.: "Oportunidades em energia solar distribuída no Nordeste"`

  return (
    <form onSubmit={handleSubmit} className="card">
      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
        Consulta ao CEO
      </p>
      <div className="relative">
        <textarea
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-brand-500 transition-colors min-h-[100px]"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e)
          }}
          disabled={loading}
        />
        <p className="text-[11px] text-gray-600 mt-1">Ctrl+Enter para enviar</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-600">
          {loading ? (
            <span className="flex items-center gap-2 text-gold-400 animate-pulse-brand">
              <span className="w-2 h-2 rounded-full bg-gold-400" />
              Processando com 12 agentes…
            </span>
          ) : (
            'Análise completa: STEEP + Cenários + VPL + Risco'
          )}
        </p>
        <button type="submit" className="btn-primary" disabled={loading || !query.trim()}>
          {loading ? 'Processando…' : 'Analisar →'}
        </button>
      </div>
    </form>
  )
}
