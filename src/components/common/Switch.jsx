const Switch = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between py-1">
    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-chronos-600' : 'bg-slate-300 dark:bg-surface-muted'}`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  </div>
)

export default Switch
