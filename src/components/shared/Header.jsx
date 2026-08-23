export const SyncStatus = Object.freeze({
  SYNCED: 'synced',
  SYNCING: 'syncing',
  OFFLINE: 'offline',
  ERROR: 'error',
})

export default function Header({
  operationalMode,
  trackingActive,
  syncStatus,
  darkMode,
  onToggleDarkMode,
  onLogout,
  onOpenSession,
  onOpenSettings,
  agentStatusLabel,
}) {
  const syncStyles = {
    [SyncStatus.SYNCED]: { dot: 'bg-emerald-500', label: 'text-emerald-600 dark:text-emerald-400', text: 'Synced' },
    [SyncStatus.SYNCING]: { dot: 'bg-amber-400 animate-pulse-slow', label: 'text-amber-600 dark:text-amber-400', text: 'Syncing' },
    [SyncStatus.OFFLINE]: { dot: 'bg-amber-500', label: 'text-amber-600 dark:text-amber-400', text: 'Offline Buffered' },
    [SyncStatus.ERROR]: { dot: 'bg-red-500', label: 'text-red-600 dark:text-red-400', text: 'Sync Failure' },
  }

  const sync = syncStyles[syncStatus] || syncStyles[SyncStatus.OFFLINE]
  const statusText = agentStatusLabel || (trackingActive ? 'Chronos: Active — Working Hours Mode' : 'Chronos: Paused')

  return (
    <header className="sticky top-0 z-40 border-b border-surface-light-border bg-white/95 backdrop-blur-sm dark:border-surface-border dark:bg-surface-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-chronos-500 to-chronos-700 flex items-center justify-center shadow-lg shadow-chronos-600/30">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2.5 2.5" />
                <path d="M9 2h6" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate">Chronos</h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none truncate" title={statusText}>
                {statusText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <span className={`badge ${trackingActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30' : 'bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600/40'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${trackingActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              {trackingActive ? 'Tracking' : operationalMode === 'off' ? 'Stopped' : 'Idle'}
            </span>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 dark:bg-surface-card/60 dark:border-surface-border">
              <span className={`w-2 h-2 rounded-full ${sync.dot} ${syncStatus === SyncStatus.SYNCING ? 'animate-ping-slow' : ''}`} />
              <span className={`text-xs font-medium ${sync.label}`}>{sync.text}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={onOpenSession}
              className="btn-ghost w-9 h-9 !p-0"
              title="Session settings"
              aria-label="Session settings"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onOpenSettings}
              className="btn-ghost w-9 h-9 !p-0"
              title="Settings"
              aria-label="Settings"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className="btn-ghost w-9 h-9 !p-0"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <span className="w-px h-5 bg-slate-200 dark:bg-surface-border mx-1" />

            <button
              type="button"
              onClick={onLogout}
              className="btn-ghost w-9 h-9 !p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
              title="Logout"
              aria-label="Logout"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
