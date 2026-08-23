const AdminUsers = () => {
  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'ADMIN', dept: 'IT', status: 'Active', lastSeen: 'Now', os: 'macOS' },
    { id: 2, name: 'Michael Chen', email: 'michael@company.com', role: 'MANAGER', dept: 'Engineering', status: 'Active', lastSeen: 'Now', os: 'Windows' },
    { id: 3, name: 'Emily Davis', email: 'emily@company.com', role: 'EMPLOYEE', dept: 'Design', status: 'Active', lastSeen: '2m ago', os: 'macOS' },
    { id: 4, name: 'James Wilson', email: 'james@company.com', role: 'EMPLOYEE', dept: 'Engineering', status: 'Idle', lastSeen: '18m ago', os: 'Ubuntu' },
    { id: 5, name: 'Alex Thompson', email: 'alex@company.com', role: 'EMPLOYEE', dept: 'Marketing', status: 'Offline', lastSeen: '2h ago', os: 'Windows' },
    { id: 6, name: 'Priya Patel', email: 'priya@company.com', role: 'MANAGER', dept: 'Design', status: 'Active', lastSeen: 'Now', os: 'RHEL' },
  ]
  const statusStyles = {
    Active: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400',
    Idle: 'bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-400',
    Offline: 'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-400',
  }
  const roleStyles = {
    ADMIN: 'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400',
    MANAGER: 'bg-chronos-500/15 text-chronos-700 border-chronos-500/30 dark:text-chronos-400',
    EMPLOYEE: 'bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-400',
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">User Management</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Users table tied to organizations via organization_id (PRD §6.2 users)</p>
        </div>
        <div className="flex items-center gap-2">
          <input className="input !py-2 !w-56" placeholder="Search users…" />
          <button className="btn-primary">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Invite User
          </button>
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40">
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">User</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Role</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Dept.</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">OS</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Status</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Last Seen</th>
                <th className="text-right font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-chronos-500 to-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-white truncate">{u.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className={`badge border ${roleStyles[u.role]}`}>{u.role}</span></td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{u.dept}</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{u.os}</td>
                  <td className="px-6 py-4">
                    <span className={`badge border ${statusStyles[u.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500 animate-pulse' : u.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{u.lastSeen}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="btn-ghost !p-2"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                      <button className="btn-ghost !p-2 text-rose-500 hover:text-rose-500 hover:bg-rose-500/10"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg></button>
                    </div>
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

export default AdminUsers
