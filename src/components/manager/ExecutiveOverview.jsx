import StatCard from '../common/StatCard.jsx'

const ExecutiveOverview = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Executive Overview</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">PRD Pillar 3 — aggregate utilization, focus time metrics, software stack efficiency</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        label="Company-wide Active Hours"
        value="3,200h"
        trend="+6.4% WoW"
        trendUp={true}
        color="chronos"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
      />
      <StatCard
        label="Avg Productivity Score"
        value="73.4"
        trend="+2.3"
        trendUp={true}
        color="emerald"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
      />
      <StatCard
        label="Software License ROI"
        value="86.9%"
        trend="+4.1%"
        trendUp={true}
        color="sky"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
      />
      <StatCard
        label="Meeting Time Burden"
        value="18.7%"
        trend="-1.2%"
        trendUp={true}
        color="amber"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="card lg:col-span-2">
        <div className="card-header">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Company Focus Time Trend (30-day)</h3>
          <div className="flex items-center gap-2">
            <span className="badge bg-emerald-500/15 text-emerald-700 border-emerald-500/20 dark:text-emerald-400">Deep Work 4h+</span>
            <span className="badge bg-chronos-500/15 text-chronos-700 border-chronos-500/20 dark:text-chronos-400">Avg Focus</span>
          </div>
        </div>
        <div className="card-body">
          <div className="relative h-52">
            <div className="absolute inset-0 flex items-end gap-1.5 px-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const h1 = 45 + Math.round(Math.sin(i * 0.5) * 18 + Math.sin(i * 0.21) * 12)
                const h2 = 25 + Math.round(Math.cos(i * 0.4) * 12 + Math.sin(i * 0.09) * 10)
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 h-full">
                    <div className="w-full bg-gradient-to-t from-chronos-500 to-chronos-400 rounded-t opacity-80" style={{ height: `${h1}%` }} />
                    <div className="w-full bg-emerald-500/80 rounded-t" style={{ height: `${h2}%` }} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 px-2">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="text-base font-semibold text-slate-900 dark:text-white">Overall Productivity Split</h3></div>
        <div className="card-body">
          <div className="relative h-4 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-surface-dark/60">
            {(() => {
              const segs = [
                { label: 'Productive', pct: 54, color: 'bg-emerald-500' },
                { label: 'Neutral', pct: 22, color: 'bg-sky-500' },
                { label: 'Unproductive', pct: 13, color: 'bg-rose-500' },
                { label: 'Uncategorized', pct: 11, color: 'bg-slate-400' },
              ]
              let left = 0
              return segs.map((s, i) => {
                const node = <div key={i} className={`absolute top-0 h-full ${s.color}`} style={{ left: `${left}%`, width: `${s.pct}%` }} />
                left += s.pct
                return node
              })
            })()}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { label: 'Productive', pct: '54%', val: '1,728h', c: 'text-emerald-600 dark:text-emerald-400', d: 'bg-emerald-500' },
              { label: 'Neutral', pct: '22%', val: '704h', c: 'text-sky-600 dark:text-sky-400', d: 'bg-sky-500' },
              { label: 'Unproductive', pct: '13%', val: '416h', c: 'text-rose-600 dark:text-rose-400', d: 'bg-rose-500' },
              { label: 'Uncategorized', pct: '11%', val: '352h', c: 'text-slate-500 dark:text-slate-400', d: 'bg-slate-400' },
            ].map((x) => (
              <div key={x.label} className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${x.d} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-600 dark:text-slate-400">{x.label}</span>
                    <span className={`text-xs font-semibold ${x.c}`}>{x.pct}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">{x.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Department Performance Snapshot</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">This week</span>
      </div>
      <div className="card-body">
        <div className="space-y-4">
          {[
            { name: 'Engineering', team: '38 people', active: '1,386h', focus: 88, prod: 79, trend: +4.2 },
            { name: 'Product & Design', team: '14 people', active: '498h', focus: 82, prod: 74, trend: +1.8 },
            { name: 'Go-to-Market', team: '26 people', active: '904h', focus: 71, prod: 66, trend: +0.4 },
            { name: 'Operations & Admin', team: '12 people', active: '412h', focus: 76, prod: 70, trend: -1.1 },
          ].map((d) => (
            <div key={d.name} className="grid grid-cols-12 gap-4 items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-surface-dark/40 transition-colors">
              <div className="col-span-12 sm:col-span-3">
                <div className="font-semibold text-slate-900 dark:text-white">{d.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{d.team}</div>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">Active</div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{d.active}</div>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Focus</span>
                  <span className="text-xs font-semibold text-chronos-600 dark:text-chronos-400 tabular-nums">{d.focus}</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                  <div className="h-full bg-chronos-500 rounded-full" style={{ width: `${d.focus}%` }} />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Prod.</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{d.prod}</span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.prod}%` }} />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3 sm:text-right">
                <span className={`text-xs font-semibold inline-flex items-center gap-0.5 ${d.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    {d.trend >= 0 ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                  </svg>
                  {d.trend >= 0 ? '+' : ''}{d.trend}% vs last wk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default ExecutiveOverview
