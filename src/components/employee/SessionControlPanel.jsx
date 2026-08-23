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
    label: 'Session closed',
    hint: 'Hooks unmounted · buffer flushed',
    color: 'slate',
  },
]

const colorMap = {
  chronos: {
    ring: 'ring-chronos-500/40',
    border: 'border-chronos-500',
    bg: 'bg-chronos-50 dark:bg-chronos-500/10',
    text: 'text-chronos-600 dark:text-chronos-400',
    dot: 'bg-chronos-500',
  },
  rose: {
    ring: 'ring-rose-500/40',
    border: 'border-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
  },
  emerald: {
    ring: 'ring-emerald-500/40',
    border: 'border-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  slate: {
    ring: 'ring-slate-400/40',
    border: 'border-slate-400',
    bg: 'bg-slate-50 dark:bg-slate-500/10',
    text: 'text-slate-500 dark:text-slate-400',
    dot: 'bg-slate-400',
  },
}

function Switch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-chronos-500/40 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${checked ? 'bg-chronos-600' : 'bg-slate-300 dark:bg-surface-muted'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export default function SessionControlPanel({
  open,
  onClose,
  initialMode,
  initialTracking,
  initialPaused,
  onApply,
}) {
  const [mode, setMode] = useState(initialMode)
  const [tracking, setTracking] = useState(initialTracking)
  const [paused, setPaused] = useState(initialPaused)
  const [idleSeconds, setIdleSeconds] = useState(300)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (open) {
      setMode(initialMode)
      setTracking(initialTracking)
      setPaused(initialPaused)
    }
  }, [open, initialMode, initialTracking, initialPaused])

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

  const isOff = mode === OperationalMode.OFF
  const isStrict = mode === OperationalMode.STRICT
  const pauseLocked = isOff || isStrict

  const handleApply = () => {
    onApply({
      tracking: isOff ? false : isStrict ? true : tracking,
      paused: pauseLocked ? false : paused,
      mode,
    })
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
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Session settings</h2>
          <button type="button" onClick={onClose} className="btn-ghost !p-2" aria-label="Close">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <label className="label">Operational mode (PRD §2.2)</label>
            <div className="grid grid-cols-1 gap-2">
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
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Activity tracking</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isStrict ? 'Always on in Strict Compliance' : isOff ? 'Session closed — hooks discarded' : 'Capture app name, masked title, timestamps'}
              </div>
            </div>
            <Switch checked={isOff ? false : isStrict ? true : tracking} onChange={setTracking} disabled={isOff || isStrict} />
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Pause recording</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {isStrict ? 'Not available — zero local UI toggle' : isOff ? 'Start a session first' : 'PAUSED_OPTIONAL — hooks stay up, events discarded'}
              </div>
            </div>
            <Switch checked={pauseLocked ? false : paused} onChange={setPaused} disabled={pauseLocked} />
          </div>

          <div>
            <label htmlFor="idle-threshold" className="label">
              Idle threshold (seconds)
            </label>
            <input
              id="idle-threshold"
              type="number"
              min={30}
              max={3600}
              step={10}
              value={idleSeconds}
              onChange={(e) => setIdleSeconds(Number(e.target.value))}
              className="input"
            />
            <div className="text-xs text-slate-500 mt-1.5">PRD default idle_threshold_seconds = 300 · PROMPT_WITH_TIMEOUT</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/30">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={handleApply} className="btn-primary">
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
