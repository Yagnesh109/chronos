import { useState, useMemo } from 'react'
import StatCard from '../common/StatCard.jsx'

const initialApps = [
  { id: 1, name: 'VS Code', cat: 'Productive', seats: 42, used: 38, h: '836h', cost: '$0', waste: 0, col: 'emerald' },
  { id: 2, name: 'Figma', cat: 'Productive', seats: 22, used: 17, h: '132h', cost: '$330/mo', waste: 23, col: 'emerald' },
  { id: 3, name: 'Slack', cat: 'Neutral', seats: 142, used: 138, h: '1,012h', cost: '$1,065/mo', waste: 3, col: 'sky' },
  { id: 4, name: 'Zoom', cat: 'Neutral', seats: 142, used: 101, h: '242h', cost: '$1,994/mo', waste: 29, col: 'sky' },
  { id: 5, name: 'Notion', cat: 'Productive', seats: 78, used: 41, h: '103h', cost: '$624/mo', waste: 47, col: 'amber' },
  { id: 6, name: 'Adobe Creative Cloud', cat: 'Productive', seats: 14, used: 9, h: '45h', cost: '$714/mo', waste: 36, col: 'amber' },
  { id: 7, name: 'GitHub Enterprise', cat: 'Productive', seats: 42, used: 40, h: '440h', cost: '$966/mo', waste: 5, col: 'emerald' },
  { id: 8, name: 'YouTube.com', cat: 'Unproductive', seats: '-', used: 58, h: '122h', cost: '-', waste: '-', col: 'rose' },
]

const ManagerSoftware = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [reclaimedApps, setReclaimedApps] = useState([])
  const [toastNotice, setToastNotice] = useState('')

  const filteredApps = useMemo(() => {
    return initialApps.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCat = categoryFilter === 'ALL' || a.cat.toUpperCase() === categoryFilter.toUpperCase()
      return matchesSearch && matchesCat
    })
  }, [searchTerm, categoryFilter])

  const handleReclaimSeat = (app) => {
    setReclaimedApps((prev) => [...prev, app.id])
    setToastNotice(`Initiated seat optimization request for ${app.name} (${app.seats - app.used} unused seats)`)
    setTimeout(() => setToastNotice(''), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Software Stack Efficiency</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          License utilization, seat waste optimization, and top time-consuming applications
        </p>
      </div>

      {/* Toast Notification */}
      {toastNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300 flex items-center justify-between animate-fade-in">
          <span>{toastNotice}</span>
          <button onClick={() => setToastNotice('')} className="text-xs underline hover:no-underline">Dismiss</button>
        </div>
      )}

      {/* KPI Cards from Executive Dashboard Spec */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          label="Annual SaaS Spend"
          value="$68,316"
          trend="+3.1%"
          trendUp={false}
          color="rose"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <StatCard
          label="Potential Savings (unused seats)"
          value="$14,976/yr"
          color="emerald"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          }
        />
        <StatCard
          label="Avg. License Utilization"
          value="86.9%"
          trend="+5.2%"
          trendUp={true}
          color="sky"
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
      </div>

      {/* Search & Filters */}
      <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search software or application..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-9 text-sm"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['ALL', 'PRODUCTIVE', 'NEUTRAL', 'UNPRODUCTIVE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                categoryFilter === cat
                  ? 'bg-chronos-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Software Efficiency Table */}
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
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Waste Risk</th>
                <th className="text-right font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Optimization</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((a) => {
                const isReclaimed = reclaimedApps.includes(a.id)
                const isHighWaste = typeof a.waste === 'number' && a.waste > 20

                return (
                  <tr key={a.id} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{a.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`badge border ${
                          a.cat === 'Productive'
                            ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400'
                            : a.cat === 'Neutral'
                            ? 'bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-400'
                            : 'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400'
                        }`}
                      >
                        {a.cat}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 tabular-nums">
                      {a.seats} / <b className="text-slate-900 dark:text-white">{a.used}</b>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white tabular-nums">{a.h}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 tabular-nums">{a.cost}</td>
                    <td className="px-6 py-4">
                      {typeof a.waste === 'number' ? (
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                a.waste <= 5 ? 'bg-emerald-500' : a.waste <= 25 ? 'bg-amber-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${a.waste}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-semibold tabular-nums ${
                              a.waste <= 5
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : a.waste <= 25
                                ? 'text-amber-700 dark:text-amber-400'
                                : 'text-rose-700 dark:text-rose-400'
                            }`}
                          >
                            {a.waste}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 dark:text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isHighWaste ? (
                        <button
                          onClick={() => handleReclaimSeat(a)}
                          disabled={isReclaimed}
                          className="btn-secondary !py-1 !px-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border-rose-200 dark:text-rose-400 dark:border-rose-500/30 dark:hover:bg-rose-500/10 disabled:opacity-50"
                        >
                          {isReclaimed ? 'Optimizing...' : 'Reclaim Seats'}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Optimal</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerSoftware
