import { useEffect, useState, useRef } from 'react'

export default function IdleTimeoutModal({
  open,
  onClose,
  initialIdleSeconds = 180,
  countDownSeconds = 60,
  onResume,
  onPause,
  onMarkIdle,
}) {
  const [remaining, setRemaining] = useState(countDownSeconds)
  const animRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setRemaining(countDownSeconds)
  }, [open, countDownSeconds])

  useEffect(() => {
    if (!open) return
    if (remaining <= 0) return
    animRef.current = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0))
    }, 1000)
    return () => clearInterval(animRef.current)
  }, [open, remaining > 0])

  const radius = 72
  const circumference = 2 * Math.PI * radius
  const progress = remaining / countDownSeconds
  const dashOffset = circumference * (1 - progress)

  const minutes = Math.floor(initialIdleSeconds / 60)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />
      <div
        className="card relative w-full max-w-md p-6 sm:p-8 animate-[scaleIn_250ms_cubic-bezier(0.16,1,0.3,1)]"
        style={{
          animationFillMode: 'both',
          animationDelay: '50ms',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-500/10 mb-4">
            <svg
              className="w-10 h-10 text-amber-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            You appear to be idle
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Activity has not been detected for over {minutes} minutes.
          </p>

          <div className="relative w-44 h-44 mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#1f2937"
                strokeWidth="10"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="url(#countdownGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
              <defs>
                <linearGradient id="countdownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-white tabular-nums">
                {remaining}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                seconds
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-6">
            Your session will be marked as idle in{' '}
            <span className="font-semibold text-amber-400">{remaining}</span> seconds.
          </p>

          <div className="w-full grid grid-cols-3 gap-2 sm:gap-3">
            <button
              className="btn-secondary px-2 sm:px-3 py-2 text-xs sm:text-sm"
              onClick={() => {
                onMarkIdle && onMarkIdle()
                onClose && onClose()
              }}
            >
              Mark as Idle
            </button>
            <button
              className="btn-secondary px-2 sm:px-3 py-2 text-xs sm:text-sm"
              onClick={() => {
                onPause && onPause()
                onClose && onClose()
              }}
            >
              Pause Tracking
            </button>
            <button
              className="btn-primary px-2 sm:px-3 py-2 text-xs sm:text-sm"
              onClick={() => {
                onResume && onResume()
                onClose && onClose()
              }}
            >
              <span className="hidden sm:inline">I'm Here, Resume</span>
              <span className="sm:hidden">Resume</span>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
