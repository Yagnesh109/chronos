const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const LOGGED_HOURS = { Mon: 7.4, Tue: 8.1, Wed: 5.2 }
const TODAY = 'Wed'
const WEEK_TARGET_HOURS = 40
const MAX_BAR_HOURS = 9

const fmtHours = (h) => `${Math.floor(h)}h ${Math.round((h % 1) * 60)}m`

export default function WeekActivityCard() {
  const total = DAYS.reduce((sum, d) => sum + (LOGGED_HOURS[d] ?? 0), 0)
  const pct = Math.min(100, Math.round((total / WEEK_TARGET_HOURS) * 100))

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">My week</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Aug 24 – Aug 30 · target {WEEK_TARGET_HOURS}h</p>
        </div>
        <span className="badge bg-slate-100 text-slate-600 border border-slate-200 dark:bg-surface-border dark:text-slate-300 dark:border-transparent">Timesheet</span>
      </div>
      <div className="card-body space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Week-to-date</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
              {fmtHours(total)} <span className="text-slate-400 dark:text-slate-500 font-normal">/ {WEEK_TARGET_HOURS}h</span>
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-chronos-500 to-sky-400 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 sm:gap-3">
          {DAYS.map((day) => {
            const hours = LOGGED_HOURS[day]
            const isToday = day === TODAY
            const isFuture = hours == null && !isToday
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className={`text-[10px] font-semibold tabular-nums ${hours == null ? 'text-transparent' : isToday ? 'text-chronos-600 dark:text-chronos-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  {hours == null ? '0h' : fmtHours(hours)}
                </span>
                <div className="w-full h-24 rounded-lg bg-slate-50 dark:bg-surface-dark/60 border border-slate-200/70 dark:border-surface-border relative overflow-hidden">
                  {isFuture ? (
                    <div className="absolute inset-x-2 top-2 bottom-2 rounded border border-dashed border-slate-200 dark:border-surface-border" />
                  ) : (
                    <div
                      className={`absolute bottom-0 inset-x-0 rounded-t-lg transition-all duration-700 ${
                        isToday
                          ? 'bg-gradient-to-t from-chronos-500 to-sky-400 animate-pulse-slow'
                          : 'bg-emerald-400/80 dark:bg-emerald-500/70'
                      }`}
                      style={{ height: `${Math.max(6, Math.round((hours / MAX_BAR_HOURS) * 100))}%` }}
                    />
                  )}
                </div>
                <span className={`text-[11px] font-medium ${isToday ? 'text-chronos-600 dark:text-chronos-400' : 'text-slate-500 dark:text-slate-400'}`}>
                  {day}
                  {isToday && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-chronos-500 inline-block align-middle" />}
                </span>
              </div>
            )
          })}
        </div>

        <div className="pt-3 border-t border-surface-light-border dark:border-surface-border flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Daily target 8h · idle time excluded</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Exported to payroll every Friday 17:00</span>
        </div>
      </div>
    </div>
  )
}
