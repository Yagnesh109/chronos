const StatCard = ({ label, value, trend, trendUp, icon, color }) => {
  const colorMap = {
    chronos: 'text-chronos-600 bg-chronos-50 dark:bg-chronos-500/10 dark:text-chronos-400',
    emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400',
    amber: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
    rose: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400',
    sky: 'text-sky-600 bg-sky-50 dark:bg-sky-500/10 dark:text-sky-400',
    violet: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10 dark:text-violet-400',
  }
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.chronos}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-0.5 ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {trendUp ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
            </svg>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
      </div>
    </div>
  )
}

export default StatCard
