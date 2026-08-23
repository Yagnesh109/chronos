import StatCard from '../common/StatCard.jsx'

const ManagerSoftware = () => {
  const apps = [
    { name: 'VS Code', cat: 'Productive', seats: 42, used: 38, h: '892h', cost: '$0', waste: 0, col: 'emerald' },
    { name: 'Figma', cat: 'Productive', seats: 22, used: 17, h: '418h', cost: '$3,300/mo', waste: 22, col: 'emerald' },
    { name: 'Slack', cat: 'Neutral', seats: 142, used: 138, h: '1,012h', cost: '$1,065/mo', waste: 3, col: 'sky' },
    { name: 'Zoom', cat: 'Neutral', seats: 142, used: 101, h: '621h', cost: '$1,994/mo', waste: 29, col: 'sky' },
    { name: 'Notion', cat: 'Productive', seats: 78, used: 41, h: '208h', cost: '$624/mo', waste: 47, col: 'amber' },
    { name: 'Adobe Creative Cloud', cat: 'Productive', seats: 14, used: 9, h: '156h', cost: '$714/mo', waste: 36, col: 'amber' },
    { name: 'GitHub Enterprise', cat: 'Productive', seats: 42, used: 40, h: '512h', cost: '$966/mo', waste: 5, col: 'emerald' },
    { name: 'YouTube.com', cat: 'Unproductive', seats: '-', used: 58, h: '324h', cost: '-', waste: '-', col: 'rose' },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Software Stack Efficiency</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">License utilization, seat waste, and top time-consuming apps per PRD Executive Dashboard expectations</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Annual SaaS Spend" value="$118,400" trend="+3.1%" trendUp={false} color="rose" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
        <StatCard label="Potential Savings (unused seats)" value="$27,900/yr" color="emerald" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>} />
        <StatCard label="Avg. License Utilization" value="72.4%" trend="+5.2%" trendUp={true} color="sky" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} />
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40">
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Application</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Category</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Seats / Used</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Usage (wk)</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Cost</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Waste</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a, i) => (
                <tr key={i} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{a.name}</td>
                  <td className="px-6 py-4">
                    <span className={`badge border ${a.cat === 'Productive' ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400' : a.cat === 'Neutral' ? 'bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-400' : 'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400'}`}>{a.cat}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300 tabular-nums">{a.seats} / <b className="text-slate-900 dark:text-white">{a.used}</b></td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white tabular-nums">{a.h}</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300 tabular-nums">{a.cost}</td>
                  <td className="px-6 py-4">
                    {typeof a.waste === 'number' ? (
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${a.waste <= 5 ? 'bg-emerald-500' : a.waste <= 25 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${a.waste}%` }} />
                        </div>
                        <span className={`text-xs font-semibold tabular-nums ${a.waste <= 5 ? 'text-emerald-700 dark:text-emerald-400' : a.waste <= 25 ? 'text-amber-700 dark:text-amber-400' : 'text-rose-700 dark:text-rose-400'}`}>{a.waste}%</span>
                      </div>
                    ) : <span className="text-xs text-slate-500 dark:text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerSoftware
