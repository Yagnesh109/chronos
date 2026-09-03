const recorded = [
  {
    t: 'Active app & masked window title',
    d: 'e.g. code.exe — “Chronos — [REDACTED_PII] · lib/main.rs”',
  },
  {
    t: 'Blurred screenshots',
    d: 'Blurred on your machine (r=20px) before anything leaves it',
  },
  {
    t: 'Active vs idle time',
    d: 'Marked idle after 5 minutes without input',
  },
]

const neverRecorded = [
  {
    t: 'Keystrokes or typed content',
    d: 'No keylogging — nothing you type is ever captured',
  },
  {
    t: 'Readable screen contents',
    d: 'Raw frames never stored; only blurred previews exist',
  },
  {
    t: 'Personal identifiers in titles',
    d: 'Emails, card numbers & SSNs stripped by regex before sync',
  },
]

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const BlockIcon = () => (
  <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
  </svg>
)

export default function PrivacyStatusCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Your data & privacy</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Exactly what tracking does — and doesn't — collect</p>
        </div>
        <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30">Protected</span>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Collected</div>
            <ul className="space-y-3">
              {recorded.map((r) => (
                <li key={r.t} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.t}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{r.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-3">Never collected</div>
            <ul className="space-y-3">
              {neverRecorded.map((r) => (
                <li key={r.t} className="flex items-start gap-2.5">
                  <BlockIcon />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.t}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{r.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-surface-light-border dark:border-surface-border flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <svg className="w-3.5 h-3.5 text-chronos-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Offline buffer AES-256-GCM encrypted
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <svg className="w-3.5 h-3.5 text-chronos-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Retention capped at 24 months
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <svg className="w-3.5 h-3.5 text-chronos-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            GDPR / CCPA compliant
          </span>
        </div>
      </div>
    </div>
  )
}
