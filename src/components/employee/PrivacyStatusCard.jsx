const summaryItems = [
  'Offline data stays encrypted on this device',
  'Session history follows your organization retention policy',
  'Privacy controls are enforced automatically',
]

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

export default function PrivacyStatusCard() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {summaryItems.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
