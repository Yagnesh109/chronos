export default function ActiveTimeMetrics({ activeMin, idleMin, totalMin, focusScore }) {
  const formatTime = (min) => {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}h ${m}m`
  }

  const size = 180
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clampedScore = Math.max(0, Math.min(100, focusScore))
  const offset = circumference - (clampedScore / 100) * circumference

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-base font-semibold text-slate-100">Active Time</h3>
        <span className="badge bg-surface-border text-slate-300">Today</span>
      </div>
      <div className="card-body">
        <div className="flex flex-col items-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#1f2937"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#focusGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-50 tracking-tight">{clampedScore}</span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">Focus Score</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full mt-8">
            <div className="flex flex-col items-center p-3 rounded-xl bg-surface-dark/60 border border-surface-border">
              <svg className="w-5 h-5 text-emerald-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className="text-xs text-slate-400 mb-0.5">Active</span>
              <span className="text-sm font-semibold text-emerald-400">{formatTime(activeMin)}</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-surface-dark/60 border border-surface-border">
              <svg className="w-5 h-5 text-amber-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-xs text-slate-400 mb-0.5">Idle</span>
              <span className="text-sm font-semibold text-amber-400">{formatTime(idleMin)}</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-surface-dark/60 border border-surface-border">
              <svg className="w-5 h-5 text-chronos-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="text-xs text-slate-400 mb-0.5">Total</span>
              <span className="text-sm font-semibold text-chronos-400">{formatTime(totalMin)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
