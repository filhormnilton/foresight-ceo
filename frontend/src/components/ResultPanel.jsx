import { useState } from 'react'

function SteepBadge({ label, value }) {
  return (
    <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700/60">
      <p className="text-[11px] font-mono text-brand-400 uppercase mb-1">{label}</p>
      <p className="text-xs text-gray-300 leading-relaxed">{value}</p>
    </div>
  )
}

function Section({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{title}</span>
        <span className="text-gray-600">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  )
}

export default function ResultPanel({ result }) {
  if (!result) return null

  const { agent_reports = {}, risk_matrix = {} } = result
  const steep = agent_reports.scanner_steep || {}
  const morpho = agent_reports.morphologist || {}
  const quant = agent_reports.quant_modeler || {}

  const scenarioBadge = (s) => {
    if (!s) return null
    return (
      <div className="bg-gray-800/60 border border-gray-700/40 rounded-lg p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-gray-200">{s.name}</span>
          <span className="badge bg-brand-900/40 text-brand-300">{Math.round((s.probability || 0) * 100)}%</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{s.description}</p>
        {s.key_drivers?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {s.key_drivers.map((d, i) => (
              <span key={i} className="agent-tag">{d}</span>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Executive Summary */}
      <Section title="📋 Relatório Executivo">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-brand-400 bg-brand-900/30 px-2 py-1 rounded">
            ID: {result.id_estudo}
          </span>
          <span className="text-xs text-gray-500">{result.timestamp?.slice(0, 19).replace('T', ' ')} UTC</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{result.executive_summary}</p>
      </Section>

      {/* CDO Report */}
      <Section title="🧠 CDO — Memória & Aprendizado">
        <div className="space-y-2">
          <div>
            <p className="agent-tag mb-1 inline-block">Librarian</p>
            <p className="text-xs text-gray-400 leading-relaxed">{agent_reports.librarian}</p>
          </div>
          <div>
            <p className="agent-tag mb-1 inline-block">Machine-Learner</p>
            <p className="text-xs text-gray-400 leading-relaxed">{agent_reports.machine_learner}</p>
          </div>
        </div>
      </Section>

      {/* STEEP */}
      <Section title="🔭 Scanner STEEP">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <SteepBadge label="Social" value={steep.social} />
          <SteepBadge label="Tecnológico" value={steep.technological} />
          <SteepBadge label="Econômico" value={steep.economic} />
          <SteepBadge label="Ambiental" value={steep.environmental} />
          <SteepBadge label="Político" value={steep.political} />
        </div>
      </Section>

      {/* Scenarios */}
      <Section title="🔮 Morfologia — Cenários Futuros">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenarioBadge(morpho.optimistic)}
          {scenarioBadge(morpho.base)}
          {scenarioBadge(morpho.pessimistic)}
        </div>
      </Section>

      {/* Intelligence */}
      <Section title="🕵️ Inteligência & OSINT">
        <div className="space-y-2">
          <div>
            <p className="agent-tag mb-1 inline-block">Crawler</p>
            <p className="text-xs text-gray-400 leading-relaxed">{agent_reports.crawler}</p>
          </div>
          <div>
            <p className="agent-tag mb-1 inline-block">Grounding-Teacher</p>
            <p className="text-xs text-gray-400 leading-relaxed">{agent_reports.grounding_teacher}</p>
          </div>
        </div>
      </Section>

      {/* Financial */}
      <Section title="💰 Engenharia Financeira">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: 'VPL (Base)', value: quant.vpl_base },
            { label: 'TIR', value: quant.tir },
            { label: 'Payback', value: quant.payback },
            { label: 'Ret. Ajust. Risco', value: quant.risk_adjusted_return },
          ].map((m) => (
            <div key={m.label} className="bg-gray-800/60 rounded-lg p-3 text-center">
              <p className="text-[11px] text-gray-500 mb-1">{m.label}</p>
              <p className="font-mono text-gold-400 font-semibold text-sm">{m.value || '—'}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="agent-tag mb-1 inline-block">Financial-Bridge</p>
          <p className="text-xs text-gray-400 leading-relaxed">{agent_reports.financial_bridge}</p>
        </div>
        {quant.assumptions?.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Premissas:</p>
            <ul className="list-disc list-inside space-y-1">
              {quant.assumptions.map((a, i) => (
                <li key={i} className="text-xs text-gray-400">{a}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Risk */}
      <Section title="⚠️ Governança & Risco">
        {Object.keys(risk_matrix).length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { key: 'high', label: 'Alto', cls: 'border-red-700/60 bg-red-900/20 text-red-300' },
              { key: 'medium', label: 'Médio', cls: 'border-yellow-700/60 bg-yellow-900/20 text-yellow-300' },
              { key: 'low', label: 'Baixo', cls: 'border-green-700/60 bg-green-900/20 text-green-300' },
            ].map(({ key, label, cls }) => (
              <div key={key} className={`rounded-lg p-3 border ${cls}`}>
                <p className="text-[11px] font-mono uppercase mb-2">{label}</p>
                {(risk_matrix[key] || []).map((r, i) => (
                  <p key={i} className="text-xs leading-snug">• {r}</p>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="space-y-2">
          <div>
            <p className="agent-tag mb-1 inline-block">Red-Teamer</p>
            <p className="text-xs text-gray-400 leading-relaxed">{agent_reports.red_teamer}</p>
          </div>
          <div>
            <p className="agent-tag mb-1 inline-block">Socrates</p>
            <p className="text-xs text-gray-400 leading-relaxed italic">{agent_reports.socrates}</p>
          </div>
        </div>
      </Section>

      {/* Mentor */}
      <Section title="🎓 Mentor-Explainer — Nota Executiva">
        <p className="text-sm text-gray-300 leading-relaxed">{agent_reports.mentor_explainer}</p>
      </Section>
    </div>
  )
}
