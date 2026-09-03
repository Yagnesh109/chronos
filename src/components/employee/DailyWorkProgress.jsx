const DailyWorkProgress = ({
  activeMin = 312,
  totalTargetMin = 480,
  idleMin = 48,
  shiftStart = '09:00 AM',
  shiftEnd = '06:00 PM',
}) => {
  const progress = Math.min(
    Math.round((activeMin / totalTargetMin) * 100),
    100
  )

  const remainingMin = Math.max(totalTargetMin - activeMin, 0)

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) return `${mins}m`
    if (mins === 0) return `${hours}h`

    return `${hours}h ${mins}m`
  }

  const isCompleted = progress >= 100

  return (
    <div className="card overflow-hidden">
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-chronos-500/10 text-chronos-600 dark:text-chronos-400 flex items-center justify-center">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Today's Work Progress
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Shift: {shiftStart} – {shiftEnd}
            </p>
          </div>
        </div>

        <span
          className={`badge border ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
              : 'bg-chronos-50 text-chronos-700 border-chronos-200 dark:bg-chronos-500/10 dark:text-chronos-400 dark:border-chronos-500/30'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCompleted ? 'bg-emerald-500' : 'bg-chronos-500'
            }`}
          />

          {isCompleted ? 'Completed' : 'On Track'}
        </span>
      </div>

      <div className="card-body">
        <div className="flex items-end justify-between gap-4 mb-3">
          <div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatTime(activeMin)}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              active work completed
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {formatTime(activeMin)} / {formatTime(totalTargetMin)}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {progress}% completed
            </div>
          </div>
        </div>

        <div className="h-3 rounded-full bg-slate-100 dark:bg-surface-dark overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-emerald-500' : 'bg-chronos-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border p-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Active Time
            </div>

            <div className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {formatTime(activeMin)}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border p-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Idle Time
            </div>

            <div className="mt-1 text-lg font-bold text-amber-600 dark:text-amber-400">
              {formatTime(idleMin)}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border p-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Remaining
            </div>

            <div className="mt-1 text-lg font-bold text-chronos-600 dark:text-chronos-400">
              {isCompleted ? 'Done!' : formatTime(remainingMin)}
            </div>
          </div>
        </div>

        <div
          className={`mt-5 flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${
            isCompleted
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-chronos-50 text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-400'
          }`}
        >
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isCompleted ? (
              <>
                <path d="M20 6L9 17l-5-5" />
              </>
            ) : (
              <>
                <path d="M12 8v4l3 2" />
                <circle cx="12" cy="12" r="9" />
              </>
            )}
          </svg>

          <span>
            {isCompleted
              ? "Great job! You've completed today's work target."
              : `You're on track. ${formatTime(remainingMin)} remaining for today's target.`}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DailyWorkProgress