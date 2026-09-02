const ManagerReports = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Reports & Exports</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Scheduled reports, CSV/JSON exports, and stakeholder distribution</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[
        { t: 'Weekly Productivity Summary', d: 'Sent to leadership every Monday 08:00 UTC', c: 'chronos', next: 'in 5 days' },
        { t: 'Monthly Software License Audit', d: 'Finance + IT review of seat waste and ROI', c: 'emerald', next: 'in 6 days' },
        { t: 'Compliance Screenshot Retention', d: 'PII-redacted archive export to S3 vault', c: 'amber', next: 'in 2 days' },
        { t: 'Timesheet Reconciliation', d: 'Per-employee active hours exported to payroll', c: 'sky', next: 'tomorrow' },
      ].map((r) => (
        <div key={r.t} className="card p-5">
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${r.c === 'chronos' ? 'bg-chronos-50 text-chronos-600 dark:bg-chronos-500/10 dark:text-chronos-400' : r.c === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : r.c === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400'}`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white">{r.t}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r.d}</p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="badge bg-slate-100 text-slate-700 border border-surface-light-border dark:bg-surface-dark dark:text-slate-300 dark:border-surface-border">Next run: {r.next}</span>
                <button className="btn-secondary !py-1.5 !px-3 text-xs">Run Now</button>
                <button className="btn-primary !py-1.5 !px-3 text-xs">Configure</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default ManagerReports
