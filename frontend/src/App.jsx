import { useState, useEffect } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import AgentPipeline from './components/AgentPipeline'
import ResultPanel from './components/ResultPanel'
import StudyTable from './components/StudyTable'
import PayloadViewer from './components/PayloadViewer'
import MemoryPanel from './components/MemoryPanel'
import { sendQuery, fetchMemory } from './services/api'

// Simulate agent completion in order for the UI animation
const AGENT_ORDER = [
  'librarian', 'machine_learner', 'scanner_steep', 'crawler',
  'grounding_teacher', 'morphologist', 'financial_bridge', 'quant_modeler',
  'red_teamer', 'socrates', 'mentor_explainer', 'database_architect',
]

export default function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [memory, setMemory] = useState({ studies: [], global_insights: [] })
  const [completedAgents, setCompletedAgents] = useState([])

  useEffect(() => { loadMemory() }, [])

  async function loadMemory() {
    try {
      const data = await fetchMemory()
      setMemory(data)
    } catch {
      // memory panel will just be empty
    }
  }

  async function handleQuery(query) {
    setLoading(true)
    setResult(null)
    setError(null)
    setCompletedAgents([])

    // Animate agent completion during loading
    let idx = 0
    const interval = setInterval(() => {
      if (idx < AGENT_ORDER.length) {
        setCompletedAgents((prev) => [...prev, AGENT_ORDER[idx]])
        idx++
      } else {
        clearInterval(interval)
      }
    }, 1800)

    try {
      const data = await sendQuery(query)
      clearInterval(interval)
      setCompletedAgents(AGENT_ORDER)
      setResult(data)
      await loadMemory()
    } catch (err) {
      clearInterval(interval)
      const msg = err.response?.data?.detail || err.message || 'Erro desconhecido'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header totalStudies={memory.studies?.length || 0} />

      <div className="max-w-screen-2xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar – Memory */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 sticky top-20 h-[calc(100vh-5rem)]">
          <MemoryPanel
            studies={memory.studies || []}
            insights={memory.global_insights || []}
            onClear={loadMemory}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-5">
          {/* Chat input */}
          <ChatWindow onSubmit={handleQuery} loading={loading} />

          {/* Agent pipeline – always visible during and after processing */}
          {(loading || result) && (
            <AgentPipeline loading={loading} completedAgents={completedAgents} />
          )}

          {/* Error */}
          {error && (
            <div className="card border-red-800 bg-red-950/30">
              <p className="text-xs font-mono text-red-400 uppercase mb-1">Erro</p>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Result sections */}
          {result && (
            <>
              <ResultPanel result={result} />
              <StudyTable rows={result.study_table || []} />
              <PayloadViewer payload={result.persistence_payload} />
            </>
          )}

          {/* Empty state */}
          {!loading && !result && !error && (
            <div className="card text-center py-16">
              <div className="text-4xl mb-4">🏛️</div>
              <p className="text-gray-400 font-medium mb-2">Future Equity Holding</p>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Submeta um tema estratégico para análise completa com 12 agentes especializados:
                STEEP, cenários morfológicos, modelagem financeira e stress test.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  'IA Generativa no setor financeiro',
                  'Energia solar distribuída',
                  'Bioeconomia amazônica',
                  'Tokenização de ativos reais',
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleQuery(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gray-700 text-gray-400 hover:border-brand-600 hover:text-brand-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
