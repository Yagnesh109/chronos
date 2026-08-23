const ManagerTeams = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Teams & Departments</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Breakdown per department with drill-down capability</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[
        { n: 'Engineering', head: 'Michael Chen', count: 38, hours: '1,386h', score: 88, apps: ['code.exe','idea64.exe','docker','postman'], col: 'chronos' },
        { n: 'Product & Design', head: 'Priya Patel', count: 14, hours: '498h', score: 82, apps: ['figma.exe','miro','notion','chrome'], col: 'violet' },
        { n: 'Go-to-Market', head: 'Laura Martinez', count: 26, hours: '904h', score: 71, apps: ['slack','hubspot','chrome','zoom'], col: 'emerald' },
        { n: 'Operations', head: 'David Park', count: 12, hours: '412h', score: 76, apps: ['excel','outlook','chrome','jira'], col: 'sky' },
      ].map((t) => (
        <div key={t.n} className="card overflow-hidden">
          <div className={`h-1.5 w-full bg-gradient-to-r ${t.col === 'chronos' ? 'from-chronos-500 to-sky-400' : t.col === 'violet' ? 'from-violet-500 to-fuchsia-400' : t.col === 'emerald' ? 'from-emerald-500 to-teal-400' : 'from-sky-500 to-cyan-400'}`} />
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.n}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Head: <span className="font-medium">{t.head}</span> · {t.count} people</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-surface-light-border dark:border-surface-border flex flex-col items-center justify-center">
                <div className="text-lg font-bold text-slate-900 dark:text-white leading-none">{t.score}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Score</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50">
                <div className="text-xs text-slate-500 dark:text-slate-400">Active</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{t.hours}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50">
                <div className="text-xs text-slate-500 dark:text-slate-400">Meetings</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">212h</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50">
                <div className="text-xs text-slate-500 dark:text-slate-400">Focus</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">68%</div>
              </div>
            </div>
            <div className="mt-5">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Top Apps</div>
              <div className="flex flex-wrap gap-1.5">
                {t.apps.map(a => <span key={a} className="px-2 py-1 rounded-lg text-[11px] font-medium bg-chronos-50 text-chronos-700 border border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-300">{a}</span>)}
              </div>
            </div>
            <button className="btn-secondary w-full mt-5 text-sm">View Team Details</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default ManagerTeams
