import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function PayloadViewer({ payload }) {
  const [copied, setCopied] = useState(false)

  if (!payload) return null

  const code = JSON.stringify(payload, null, 2)

  async function copyToClipboard() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Script de Persistência (Payload DB)
        </p>
        <button
          onClick={copyToClipboard}
          className="text-xs px-3 py-1 rounded border border-gray-700 text-gray-400 hover:text-brand-300 hover:border-brand-600 transition-colors"
        >
          {copied ? '✓ Copiado!' : 'Copiar JSON'}
        </button>
      </div>
      <div className="rounded-lg overflow-hidden text-sm">
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: '8px', fontSize: '13px' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Cole este payload no seu Supabase/MongoDB para persistência cumulativa.
      </p>
    </div>
  )
}
