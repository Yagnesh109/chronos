import StatCard from '../common/StatCard.jsx'

const AdminOverview = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Overview</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">System-wide operational metrics and workforce status</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        label="Active Employees"
        value="128 / 142"
        trend="+4.2%"
        trendUp={true}
        color="emerald"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
      />
      <StatCard
        label="Active Devices"
        value="136"
        trend="+1.1%"
        trendUp={true}
        color="sky"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
      />
      <StatCard
        label="Avg. Focus Score"
        value="82.4%"
        trend="+3.7%"
        trendUp={true}
        color="chronos"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
      />
      <StatCard
        label="Sync Errors (24h)"
        value="3"
        trend="-2"
        trendUp={true}
        color="rose"
        icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="card lg:col-span-2">
        <div className="card-header">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Organization-wide Activity (7-day)</h3>
          <span className="badge bg-chronos-50 text-chronos-700 dark:bg-chronos-500/15 dark:text-chronos-300">Real-time</span>
        </div>
        <div className="card-body">
          <div className="flex items-end gap-2 h-40">
            {[42, 58, 65, 72, 68, 78, 82].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-chronos-500 to-sky-400 transition-all hover:from-chronos-600 hover:to-sky-500"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Operational Mode Distribution</h3>
        </div>
        <div className="card-body space-y-4">
          {[
            { label: 'Strict Compliance', count: 24, pct: 17, color: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
            { label: 'Privacy-First / Hybrid', count: 94, pct: 66, color: 'bg-chronos-500', text: 'text-chronos-600 dark:text-chronos-400' },
            { label: 'Contractor (Lightweight)', count: 24, pct: 17, color: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{m.label}</span>
                <span className={`text-xs font-semibold ${m.text}`}>{m.count} users</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">
                <div className={`h-full ${m.color} rounded-full transition-all`} style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Sync Health Dashboard</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">Per PRD Pillar 4 — indicator lights: Green / Amber / Red</span>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
              <div>
                <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Synced</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">132</div>
              </div>
            </div>
            <div className="text-xs text-emerald-700/70 dark:text-emerald-400/70 mt-2">devices up-to-date</div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <div>
                <div className="text-sm font-semibold text-amber-700 dark:text-amber-400">Offline Buffered</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">4</div>
              </div>
            </div>
            <div className="text-xs text-amber-700/70 dark:text-amber-400/70 mt-2">queueing locally, will sync on restore</div>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <div>
                <div className="text-sm font-semibold text-rose-700 dark:text-rose-400">Sync Failure</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">3</div>
              </div>
            </div>
            <div className="text-xs text-rose-700/70 dark:text-rose-400/70 mt-2">retry backoff in progress (exponential)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AdminOverview
