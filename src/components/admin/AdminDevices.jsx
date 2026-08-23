import StatCard from '../common/StatCard.jsx'

const AdminDevices = () => {
  const devices = [
    { id: 'D-001', user: 'Sarah Johnson', os: 'macOS 14', agent: 'v1.0.0', mode: 'Strict', seen: 'Now', health: 100, ram: 28 },
    { id: 'D-002', user: 'Michael Chen', os: 'Windows 11', agent: 'v1.0.0', mode: 'Hybrid', seen: 'Now', health: 98, ram: 26 },
    { id: 'D-003', user: 'James Wilson', os: 'Ubuntu 24.04', agent: 'v1.0.0', mode: 'Hybrid', seen: '2m ago', health: 78, ram: 32 },
    { id: 'D-004', user: 'Priya Patel', os: 'RHEL 9.4', agent: 'v1.0.0', mode: 'Hybrid', seen: 'Now', health: 95, ram: 24 },
    { id: 'D-005', user: 'Alex Thompson', os: 'Windows 11', agent: 'v0.9.8', mode: 'Contractor', seen: '2h ago', health: 52, ram: 18 },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Devices & Health</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Devices table (PRD §6.3 devices) — hardware_hash, os_type, agent_version, last_seen_at</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Total Devices" value="136" color="chronos" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>} />
        <StatCard label="On Latest Agent" value="124 (91%)" trend="+5" trendUp={true} color="emerald" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} />
        <StatCard label="Below RAM Target" value="3" color="rose" icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>} />
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40">
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Device ID</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">User</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">OS / Agent</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Mode</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Health</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">RAM (MB)</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30">
                  <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-400">{d.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{d.user}</td>
                  <td className="px-6 py-4"><div className="text-slate-800 dark:text-slate-200">{d.os}</div><div className="text-xs text-slate-500 dark:text-slate-400">{d.agent}</div></td>
                  <td className="px-6 py-4"><span className="badge bg-chronos-50 text-chronos-700 border border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-400">{d.mode}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${d.health >= 85 ? 'bg-emerald-500' : d.health >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${d.health}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">{d.health}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold ${d.ram <= 30 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>&lt;{d.ram} MB</span>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">target &lt;35 MB</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{d.seen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDevices
