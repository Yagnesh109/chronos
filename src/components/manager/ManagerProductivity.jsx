const ManagerProductivity = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Productivity Trends</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">90-day rolling trends across all departments</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="card">
        <div className="card-header"><h3 className="text-base font-semibold text-slate-900 dark:text-white">Weekly Active Hours by Dept</h3></div>
        <div className="card-body space-y-4">
          {[
            { d: 'Engineering', vals: [30, 32, 31, 34, 33, 35, 36], c: 'from-chronos-500 to-sky-400' },
            { d: 'Design', vals: [31, 32, 33, 32, 34, 34, 35], c: 'from-violet-500 to-fuchsia-400' },
            { d: 'GTM', vals: [29, 30, 30, 32, 31, 33, 33], c: 'from-emerald-500 to-teal-400' },
            { d: 'Operations', vals: [28, 29, 30, 30, 31, 32, 32], c: 'from-amber-500 to-orange-400' },
          ].map((r) => (
            <div key={r.d}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{r.d}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">{r.vals[6]}h avg</span>
              </div>
              <div className="flex items-end gap-0.5 h-10">
                {r.vals.map((v, i) => (
                  <div key={i} className={`flex-1 rounded-t bg-gradient-to-t ${r.c} opacity-80`} style={{ height: `${v}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="text-base font-semibold text-slate-900 dark:text-white">Top Focus Block Patterns</h3></div>
        <div className="card-body">
          <div className="grid grid-cols-12 gap-1 h-40">
            {Array.from({ length: 12 * 7 }).map((_, i) => {
              const day = Math.floor(i / 12)
              const hour = i % 12
              const morningPeak = Math.max(0, 1 - Math.abs(hour - 2.5) / 3)
              const arvoPeak = Math.max(0, 1 - Math.abs(hour - 8) / 2.5)
              const lunchDip = hour === 5 ? 0.5 : 1
              const fridayFade = day === 4 ? 0.55 : 1
              const intensity = day < 5 ? (0.55 + morningPeak * 0.5 + arvoPeak * 0.35) * lunchDip * fridayFade : 0.05
              const level = intensity > 0.95 ? 4 : intensity > 0.7 ? 3 : intensity > 0.45 ? 2 : intensity > 0.2 ? 1 : 0
              const cls = ['bg-slate-100 dark:bg-surface-dark','bg-emerald-200 dark:bg-emerald-500/20','bg-emerald-300 dark:bg-emerald-500/40','bg-emerald-500 dark:bg-emerald-500/70','bg-emerald-600 dark:bg-emerald-500']
              return <div key={i} className={`rounded-sm ${cls[level]} transition-opacity hover:ring-2 hover:ring-chronos-400`} title={`Slot ${i}`} />
            })}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span>Less</span>
              {['bg-slate-100 dark:bg-surface-dark','bg-emerald-200 dark:bg-emerald-500/20','bg-emerald-300 dark:bg-emerald-500/40','bg-emerald-500 dark:bg-emerald-500/70','bg-emerald-600 dark:bg-emerald-500'].map((c,i)=>(<span key={i} className={`w-3 h-3 rounded-sm ${c}`}/>))}
              <span>More</span>
            </div>
            <span>Mon – Sun · 08:00 – 20:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ManagerProductivity
