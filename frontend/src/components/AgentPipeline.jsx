import { useState } from 'react'

const AGENTS = [
  { id: 'librarian',        dept: 'CDO',         label: 'Librarian',         desc: 'Recuperando contexto de memória' },
  { id: 'machine_learner',  dept: 'CDO',         label: 'Machine-Learner',   desc: 'Identificando padrões e erros' },
  { id: 'scanner_steep',    dept: 'Foresight',   label: 'Scanner (STEEP)',   desc: 'Análise Social, Tech, Eco, Amb, Pol' },
  { id: 'crawler',          dept: 'Intelligence',label: 'Crawler',           desc: 'Coletando dados de mercado' },
  { id: 'grounding_teacher',dept: 'Intelligence',label: 'Grounding-Teacher', desc: 'Ancoramento em dados reais' },
  { id: 'morphologist',     dept: 'Foresight',   label: 'Morphologist',      desc: 'Gerando cenários futuros' },
  { id: 'financial_bridge', dept: 'Financial',   label: 'Financial-Bridge',  desc: 'Oportunidades de arbitragem' },
  { id: 'quant_modeler',    dept: 'Financial',   label: 'Quant-Modeler',     desc: 'Calculando VPL, TIR, Payback' },
  { id: 'red_teamer',       dept: 'Governance',  label: 'Red-Teamer',        desc: 'Stress test e contra-argumentos' },
  { id: 'socrates',         dept: 'Governance',  label: 'Socrates',          desc: 'Questionar premissas' },
  { id: 'mentor_explainer', dept: 'Foresight',   label: 'Mentor-Explainer',  desc: 'Nota executiva' },
  { id: 'database_architect',dept: 'CDO',        label: 'DB-Architect',      desc: 'Estruturando payload de memória' },
]

const DEPT_COLORS = {
  CDO: 'text-purple-400',
  Foresight: 'text-brand-400',
  Intelligence: 'text-blue-400',
  Financial: 'text-gold-400',
  Governance: 'text-red-400',
}

export default function AgentPipeline({ loading, completedAgents = [] }) {
  return (
    <div className="card">
      <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
        Pipeline Multi-Agente
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {AGENTS.map((agent, i) => {
          const done = completedAgents.includes(agent.id)
          const active = loading && !done && i === completedAgents.length
          return (
            <div
              key={agent.id}
              className={`flex items-start gap-2 p-2 rounded-lg border transition-all ${
                done
                  ? 'border-brand-700/60 bg-brand-900/20'
                  : active
                  ? 'border-gold-500/60 bg-gold-900/10 animate-pulse-brand'
                  : 'border-gray-800 bg-gray-900/40 opacity-50'
              }`}
            >
              <span className="mt-0.5 text-base leading-none">
                {done ? '✅' : active ? '⚡' : '○'}
              </span>
              <div>
                <p className={`text-xs font-semibold ${DEPT_COLORS[agent.dept] || 'text-gray-400'}`}>
                  {agent.label}
                </p>
                <p className="text-[11px] text-gray-500 leading-tight">{agent.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
