const AdminAudit = () => {
  const logs = [
    { t: '2 min ago', a: 'Policy Updated', u: 'Sarah J.', d: 'Screenshot interval 600s → 300s', s: 'chronos' },
    { t: '18 min ago', a: 'User Invited', u: 'Sarah J.', d: 'Invited robert@company.com as EMPLOYEE', s: 'emerald' },
    { t: '41 min ago', a: 'Role Changed', u: 'Sarah J.', d: 'Priya Patel EMPLOYEE → MANAGER', s: 'sky' },
    { t: '2h ago', a: 'Device Enrolled', u: 'System', d: 'New Windows device D-042 (Michael C.)', s: 'chronos' },
    { t: '3h ago', a: 'Classification Added', u: 'Sarah J.', d: 'notion.exe → PRODUCTIVE (w=0.90)', s: 'emerald' },
    { t: '5h ago', a: 'Detected: TIME_SKEW', u: 'System', d: 'Device D-005 clock skew 1h 12m — aligned via NTP', s: 'amber' },
    { t: 'Yesterday', a: 'Sync Dead Letter', u: 'System', d: 'R > 10 retries — 14 records quarantined', s: 'rose' },
  ]
  const sMap = { chronos: 'bg-chronos-100 text-chronos-700 dark:bg-chronos-500/15 dark:text-chronos-300', emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', sky: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300', amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300', rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Audit Logs</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Cryptographically signed ledger (PRD §Pillar 4) — config changes, policy edits, role updates, anomalies</p>
      </div>
      <div className="card">
        <div className="card-body space-y-0 divide-y divide-surface-light-border dark:divide-surface-border">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-4 py-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${sMap[l.s] || sMap.chronos}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{l.a}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">by</span>
                  <span className="text-sm text-chronos-600 dark:text-chronos-400 font-medium">{l.u}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{l.d}</p>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 shrink-0 tabular-nums">{l.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminAudit
