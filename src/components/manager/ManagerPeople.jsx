const ManagerPeople = () => {
  const people = [
    { n: 'Emily Davis', r: 'EMPLOYEE', d: 'Design', h: 35.0, f: 88, p: 85, s: 'Active' },
    { n: 'Grace Liu', r: 'EMPLOYEE', d: 'Engineering', h: 37.2, f: 86, p: 84, s: 'Active' },
    { n: 'Priya Patel', r: 'MANAGER', d: 'Design', h: 34.2, f: 83, p: 81, s: 'Active' },
    { n: 'Hana Suzuki', r: 'EMPLOYEE', d: 'Engineering', h: 33.8, f: 80, p: 77, s: 'Active' },
    { n: 'David Park', r: 'EMPLOYEE', d: 'Ops', h: 30.4, f: 80, p: 77, s: 'Active' },
    { n: 'Laura Martinez', r: 'MANAGER', d: 'GTM', h: 32.0, f: 75, p: 72, s: 'Active' },
    { n: 'James Wilson', r: 'EMPLOYEE', d: 'Engineering', h: 27.6, f: 71, p: 66, s: 'Idle' },
    { n: 'Alex Thompson', r: 'EMPLOYEE', d: 'Marketing', h: 22.8, f: 61, p: 58, s: 'Offline' },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">People Performance</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Individual contributor focus and productivity rankings (this week)</p>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40">
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Person</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Dept / Role</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Hours</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Focus</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Productivity</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {people.map((u, i) => (
                <tr key={i} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-chronos-500 to-sky-500 text-white text-xs font-bold flex items-center justify-center">{u.n.split(' ').map(x=>x[0]).join('')}</div>
                      <div className="font-medium text-slate-900 dark:text-white">{u.n}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{u.d} · <span className="text-xs">{u.r}</span></td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white tabular-nums">{u.h}h</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden"><div className="h-full bg-chronos-500 rounded-full" style={{ width: `${u.f}%` }} /></div>
                      <span className="text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">{u.f}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${u.p}%` }} /></div>
                      <span className="text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">{u.p}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge border ${u.s === 'Active' ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400' : u.s === 'Idle' ? 'bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-400' : 'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.s === 'Active' ? 'bg-emerald-500 animate-pulse' : u.s === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                      {u.s}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerPeople
