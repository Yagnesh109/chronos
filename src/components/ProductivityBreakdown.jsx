export default function ProductivityBreakdown({ values }) {
  const { productive, neutral, unproductive, uncategorized } = values
  const total = productive + neutral + unproductive + uncategorized

  const segments = [
    { key: 'productive', label: 'Productive', value: productive, color: 'bg-emerald-500', dot: 'bg-emerald-400', text: 'text-emerald-400' },
    { key: 'neutral', label: 'Neutral', value: neutral, color: 'bg-blue-500', dot: 'bg-blue-400', text: 'text-blue-400' },
    { key: 'unproductive', label: 'Unproductive', value: unproductive, color: 'bg-rose-500', dot: 'bg-rose-400', text: 'text-rose-400' },
    { key: 'uncategorized', label: 'Uncategorized', value: uncategorized, color: 'bg-slate-500', dot: 'bg-slate-400', text: 'text-slate-400' },
  ]

  const pct = (val) => (total > 0 ? Math.round((val / total) * 100) : 0)
  const formatTime = (min) => {
    const h = Math.floor(min / 60)
    const m = min % 60
    if (h === 0) return `${m}m`
    if (m === 0) return `${h}h`
    return `${h}h ${m}m`
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-base font-semibold text-slate-100">Productivity Breakdown</h3>
        <span className="badge bg-surface-border text-slate-300">Today</span>
      </div>
      <div className="card-body">
        <div className="relative h-5 w-full rounded-full overflow-hidden bg-surface-dark/60 border border-surface-border">
          {segments.map((seg, idx) => {
            const width = pct(seg.value)
            if (width === 0) return null
            const left = segments.slice(0, idx).reduce((acc, s) => acc + pct(s.value), 0)
            return (
              <div
                key={seg.key}
                className={`absolute top-0 h-full ${seg.color} transition-all duration-500 ease-out`}
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                {width >= 8 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white/90">
                    {width}%
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-6">
          {segments.map((seg) => (
            <div key={seg.key} className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${seg.dot} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400 truncate">{seg.label}</span>
                  <span className={`text-xs font-medium ${seg.text}`}>{pct(seg.value)}%</span>
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-0.5">
                  {formatTime(seg.value)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between">
          <span className="text-xs text-slate-400">Total tracked</span>
          <span className="text-sm font-semibold text-slate-200">{formatTime(total)}</span>
        </div>
      </div>
    </div>
  )
}
