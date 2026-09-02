import { useEffect, useState } from 'react'

export const OperationalMode = {
  HYBRID: 'hybrid',
  STRICT: 'strict',
  CONTRACTOR: 'contractor',
  OFF: 'off',
}

const modeOptions = [
  {
    value: OperationalMode.HYBRID,
    label: 'Privacy-First / Hybrid',
    hint: 'Pause allowed · blur enforced · opt-in after hours',
    color: 'chronos',
  },
  {
    value: OperationalMode.STRICT,
    label: 'Strict Compliance',
    hint: 'No pause · continuous tracking · 30s sync',
    color: 'rose',
  },
  {
    value: OperationalMode.CONTRACTOR,
    label: 'Contractor',
    hint: 'Explicit start/stop · no tracking when closed',
    color: 'emerald',
  },
  {
    value: OperationalMode.OFF,
    label: 'Close session',
    hint: 'Stop all tracking now · buffer is flushed and kept',
    color: 'slate',
  },
]

const colorMap = {
  chronos: {
    ring: 'ring-chronos-500/40',
    border: 'border-chronos-500',
    bg: 'bg-chronos-50 dark:bg-chronos-500/10',
    dot: 'bg-chronos-500',
  },
  rose: {
    ring: 'ring-rose-500/40',
    border: 'border-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    dot: 'bg-rose-500',
  },
  emerald: {
    ring: 'ring-emerald-500/40',
    border: 'border-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    dot: 'bg-emerald-500',
  },
  slate: {
    ring: 'ring-slate-400/40',
    border: 'border-slate-400',
    bg: 'bg-slate-50 dark:bg-slate-500/10',
    dot: 'bg-slate-400',
  },
}

const policyItems = [
  'Idle detection after 5 minutes without input',
  'Screenshots every 10 minutes — blurred on your device',
  'Working hours enforced 08:00 – 18:00 (Mon–Fri)',
  'Recorded data syncs every 60 seconds',
]

export default function SessionControlPanel({
  open,
  onClose,
  initialMode,
  onApply,
}) {
  const [mode, setMode] = useState(initialMode)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (open) setMode(initialMode)
  }, [open, initialMode])

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(t)
    }
    setMounted(false)
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleApply = () => {
    onApply && onApply({ mode })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[440px] max-w-full bg-white dark:bg-surface-card border-l border-surface-light-border dark:border-surface-border shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          mounted ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-light-border dark:border-surface-border">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Session settings</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Choose how tracking runs on this device</p>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost !p-2" aria-label="Close">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <label className="label">Operational mode</label>
            <div className="grid grid-cols-1 gap-2 mt-1">
              {modeOptions.map((opt) => {
                const selected = mode === opt.value
                const c = colorMap[opt.color]
                return (
                  <label
                    key={opt.value}
                    className={`relative cursor-pointer rounded-xl border p-3.5 transition-all duration-200 ${
                      selected
                        ? `${c.border} ${c.bg} ring-2 ${c.ring}`
                        : 'border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/50 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={opt.value}
                      checked={selected}
                      onChange={() => setMode(opt.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className={`text-sm font-semibold ${selected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.hint}</div>
                      </div>
                      <div
                        className={`mt-1 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          selected ? `${c.border} ${c.dot}` : 'border-slate-300 dark:border-surface-muted'
                        }`}
                      >
                        {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Day-to-day actions (pause / start / stop) stay on the dashboard — this panel only decides <span className="font-medium">which rules</span> apply.
            </p>
          </div>

          <div className="rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Org policy</span>
              <span className="badge bg-slate-100 text-slate-600 border border-slate-200 dark:bg-surface-dark dark:text-slate-300 dark:border-surface-border">Read-only</span>
            </div>
            <ul className="space-y-2.5">
              {policyItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-chronos-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="text-xs text-slate-600 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/30">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={handleApply} className="btn-primary">
            Apply mode
          </button>
        </div>
      </div>
    </div>
  )
}
