import { useEffect, useState } from 'react'

export const OperationalMode = {
  WORKING: 'working',
  MEETING: 'meeting',
  BREAK: 'break',
  OFF: 'off',
}

const modeOptions = [
  {
    value: OperationalMode.WORKING,
    label: 'Working',
    color: 'chronos',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    value: OperationalMode.MEETING,
    label: 'Meeting',
    color: 'sky',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: OperationalMode.BREAK,
    label: 'Break',
    color: 'emerald',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    value: OperationalMode.OFF,
    label: 'Off',
    color: 'slate',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
  },
]

const colorMap = {
  chronos: {
    ring: 'ring-chronos-500/50',
    border: 'border-chronos-500/60',
    bg: 'bg-chronos-500/10',
    text: 'text-chronos-400',
    dot: 'bg-chronos-500',
  },
  sky: {
    ring: 'ring-sky-500/50',
    border: 'border-sky-500/60',
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    dot: 'bg-sky-500',
  },
  emerald: {
    ring: 'ring-emerald-500/50',
    border: 'border-emerald-500/60',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500',
  },
  slate: {
    ring: 'ring-slate-500/50',
    border: 'border-slate-500/60',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    dot: 'bg-slate-500',
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
      } ${checked ? 'bg-chronos-600' : 'bg-surface-muted'}`}
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
  const [idleSeconds, setIdleSeconds] = useState(180)
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
    } else {
      setMounted(false)
    }
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

  const handleApply = () => {
    onApply({
      tracking,
      paused: isOff ? false : paused,
      mode,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[440px] max-w-full bg-surface-card border-l border-surface-border shadow-2xl shadow-black/50 flex flex-col transition-transform duration-300 ease-out ${
          mounted ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
          <h2 className="text-xl font-semibold text-white">Session Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost !p-2"
            aria-label="Close"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div>
            <label className="label">Operational Mode</label>
            <div className="grid grid-cols-2 gap-3">
              {modeOptions.map((opt) => {
                const selected = mode === opt.value
                const c = colorMap[opt.color]
                return (
                  <label
                    key={opt.value}
                    className={`relative cursor-pointer rounded-xl border p-3.5 transition-all duration-200 ${
                      selected
                        ? `${c.border} ${c.bg} ring-2 ${c.ring}`
                        : 'border-surface-border bg-surface-dark/50 hover:border-surface-muted hover:bg-surface-dark'
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
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 mt-0.5 ${
                          selected ? c.text : 'text-slate-500'
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-semibold ${
                            selected ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {opt.label}
                        </div>
                      </div>
                      <div
                        className={`mt-1 flex-shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                          selected
                            ? `${c.border} ${c.dot}`
                            : 'border-surface-muted'
                        }`}
                      >
                        {selected && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-semibold text-white">
                Enable activity tracking
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Monitor application usage and active time
              </div>
            </div>
            <Switch checked={tracking} onChange={setTracking} disabled={isOff} />
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <div className="text-sm font-semibold text-white">
                Pause recording
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {isOff
                  ? 'Not available in Off mode'
                  : 'Temporarily suspend screenshots and tracking'}
              </div>
            </div>
            <Switch
              checked={paused}
              onChange={setPaused}
              disabled={isOff}
            />
          </div>

          <div>
            <label htmlFor="idle-threshold" className="label">
              Idle timeout (seconds)
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
            <div className="text-xs text-slate-500 mt-1.5">
              Consider user idle after no input for this duration
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-border bg-surface-dark/30">
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
