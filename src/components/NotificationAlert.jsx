export const AlertKind = {
  STORAGE_FULL: 'storage_full',
  SYNC_FAILED: 'sync_failed',
  IDLE_WARNING: 'idle_warning',
  UPDATE_AVAILABLE: 'update_available',
}

const variantConfig = {
  [AlertKind.STORAGE_FULL]: {
    accent: 'amber',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    ring: 'ring-amber-500/10',
    icon: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
    title: 'text-amber-300',
    progress: 'bg-amber-500',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  },
  [AlertKind.SYNC_FAILED]: {
    accent: 'red',
    border: 'border-red-500/30',
    bg: 'bg-red-500/5',
    ring: 'ring-red-500/10',
    icon: 'text-red-500',
    iconBg: 'bg-red-500/10',
    title: 'text-red-300',
    progress: 'bg-red-500',
    badge: 'bg-red-500/20 text-red-300 border border-red-500/30',
  },
  [AlertKind.IDLE_WARNING]: {
    accent: 'blue',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    ring: 'ring-blue-500/10',
    icon: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
    title: 'text-blue-300',
    progress: 'bg-blue-500',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  },
  [AlertKind.UPDATE_AVAILABLE]: {
    accent: 'green',
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    ring: 'ring-green-500/10',
    icon: 'text-green-500',
    iconBg: 'bg-green-500/10',
    title: 'text-green-300',
    progress: 'bg-green-500',
    badge: 'bg-green-500/20 text-green-300 border border-green-500/30',
  },
}

const iconFor = (kind) => {
  switch (kind) {
    case AlertKind.STORAGE_FULL:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14a9 3 0 0018 0V5" />
          <path d="M3 12a9 3 0 0018 0" />
        </svg>
      )
    case AlertKind.SYNC_FAILED:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      )
    case AlertKind.IDLE_WARNING:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case AlertKind.UPDATE_AVAILABLE:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      )
    default:
      return null
  }
}

const titleFor = (kind) => {
  switch (kind) {
    case AlertKind.STORAGE_FULL:
      return 'Storage almost full'
    case AlertKind.SYNC_FAILED:
      return 'Sync failed'
    case AlertKind.IDLE_WARNING:
      return 'Idle timer running'
    case AlertKind.UPDATE_AVAILABLE:
      return 'Update available'
    default:
      return ''
  }
}

const actionLabelFor = (kind) => {
  switch (kind) {
    case AlertKind.STORAGE_FULL:
      return 'Upgrade Plan'
    case AlertKind.SYNC_FAILED:
      return 'Retry'
    case AlertKind.IDLE_WARNING:
      return 'Dismiss'
    case AlertKind.UPDATE_AVAILABLE:
      return 'Install Now'
    default:
      return 'OK'
  }
}

const badgeLabelFor = (kind) => {
  switch (kind) {
    case AlertKind.STORAGE_FULL:
      return 'Warning'
    case AlertKind.SYNC_FAILED:
      return 'Error'
    case AlertKind.IDLE_WARNING:
      return 'Info'
    case AlertKind.UPDATE_AVAILABLE:
      return 'New'
    default:
      return ''
  }
}

const showProgress = (kind, storageUsedPct) => {
  if (kind === AlertKind.STORAGE_FULL && typeof storageUsedPct === 'number') return true
  if (kind === AlertKind.UPDATE_AVAILABLE) return true
  return false
}

const progressValue = (kind, storageUsedPct) => {
  if (kind === AlertKind.STORAGE_FULL) return Math.min(100, Math.max(0, storageUsedPct ?? 0))
  if (kind === AlertKind.UPDATE_AVAILABLE) return 100
  return 0
}

export default function NotificationAlert({
  kind,
  storageUsedPct,
  onDismiss,
  onAction,
}) {
  const cfg = variantConfig[kind] || variantConfig[AlertKind.IDLE_WARNING]
  const title = titleFor(kind)
  const actionLabel = actionLabelFor(kind)
  const badgeLabel = badgeLabelFor(kind)
  const hasProgress = showProgress(kind, storageUsedPct)
  const progVal = progressValue(kind, storageUsedPct)

  let body = ''
  switch (kind) {
    case AlertKind.STORAGE_FULL: {
      const pct = typeof storageUsedPct === 'number' ? storageUsedPct : 0
      body = `${pct}% of your storage is used. Upgrade or clear old data.`
      break
    }
    case AlertKind.SYNC_FAILED:
      body = 'Could not sync data. Check your connection.'
      break
    case AlertKind.IDLE_WARNING:
      body = 'Your session may be paused soon.'
      break
    case AlertKind.UPDATE_AVAILABLE:
      body = 'A new version of Chronos is ready to install.'
      break
    default:
      body = ''
  }

  const handleAction = () => {
    if (kind === AlertKind.IDLE_WARNING) {
      onDismiss && onDismiss()
      return
    }
    onAction && onAction()
  }

  return (
    <div
      role="alert"
      className={`card relative overflow-hidden border ${cfg.border} ${cfg.bg} ring-1 ${cfg.ring} animate-[slideDown_300ms_ease-out]`}
    >
      <div className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4">
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${cfg.iconBg}`}>
          <span className={cfg.icon}>
            {iconFor(kind)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className={`text-sm sm:text-base font-semibold ${cfg.title}`}>
              {title}
            </h3>
            <span className={`badge ${cfg.badge}`}>
              {badgeLabel}
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-3">
            {body}
          </p>

          {hasProgress && (
            <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden mb-3">
              <div
                className={`h-full ${cfg.progress} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${progVal}%` }}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {onAction && kind !== AlertKind.IDLE_WARNING && (
              <button
                className="btn-primary text-xs sm:text-sm"
                onClick={handleAction}
              >
                {actionLabel}
              </button>
            )}
            {kind === AlertKind.IDLE_WARNING && (
              <button
                className="btn-ghost text-xs sm:text-sm"
                onClick={handleAction}
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss"
            className={`shrink-0 btn-ghost -mr-2 -mt-1 w-8 h-8 p-0 rounded-lg ${cfg.icon}`}
            onClick={onDismiss}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
