import { useState } from 'react'

const timestamps = ['14:32', '14:17', '14:02', '13:48', '13:31', '13:15', '12:59', '12:42']

const gradients = [
  'from-chronos-600 via-chronos-500 to-sky-500',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-fuchsia-500 via-purple-500 to-chronos-500',
  'from-amber-500 via-orange-500 to-rose-500',
  'from-sky-500 via-blue-500 to-chronos-600',
  'from-rose-500 via-pink-500 to-fuchsia-500',
  'from-cyan-500 via-emerald-500 to-green-500',
  'from-violet-500 via-chronos-500 to-indigo-500',
]

export default function ScreenshotsGallery({ blurPx = 20 }) {
  const [blurred, setBlurred] = useState(true)

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Blurred screen previews</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Client-side Gaussian blur r={blurPx}px · HMAC checksum · never stored raw</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">{blurred ? 'Blur on' : 'Preview (demo)'}</span>
          <button
            onClick={() => setBlurred((v) => !v)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-chronos-500/40 ${blurred ? 'bg-chronos-600' : 'bg-slate-300 dark:bg-surface-muted'}`}
            aria-pressed={blurred}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                blurred ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {timestamps.map((ts, i) => (
            <div
              key={i}
              className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-surface-border bg-slate-100 dark:bg-surface-dark cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-chronos-400"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-70`}
                style={{ filter: blurred ? `blur(${blurPx}px)` : 'none', transform: 'scale(1.1)' }}
              >
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 225" preserveAspectRatio="none">
                  <rect x="20" y="20" width="360" height="30" rx="6" fill="rgba(255,255,255,0.3)" />
                  <rect x="20" y="65" width="200" height="12" rx="4" fill="rgba(255,255,255,0.25)" />
                  <rect x="20" y="85" width="280" height="12" rx="4" fill="rgba(255,255,255,0.2)" />
                  <rect x="20" y="115" width="110" height="80" rx="8" fill="rgba(255,255,255,0.18)" />
                  <rect x="145" y="115" width="110" height="80" rx="8" fill="rgba(255,255,255,0.15)" />
                  <rect x="270" y="115" width="110" height="80" rx="8" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white/90">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {ts}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
