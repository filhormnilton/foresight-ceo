export default function Header({ totalStudies }) {
  return (
    <header className="border-b border-gray-800 bg-gray-950/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-gray-950 font-mono font-bold text-sm">
            AI
          </div>
          <div>
            <p className="font-semibold text-sm leading-none">Architect CEO <span className="text-brand-400">V.8</span></p>
            <p className="text-xs text-gray-500 leading-none mt-0.5">Future Equity Holding · Infinity Edition</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-brand" />
            <span>12 Agents Online</span>
          </div>
          {totalStudies > 0 && (
            <span className="badge bg-brand-900/50 text-brand-300 border border-brand-700">
              {totalStudies} {totalStudies === 1 ? 'estudo' : 'estudos'} na memória
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
