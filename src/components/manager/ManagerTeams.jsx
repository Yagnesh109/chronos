import { useState } from 'react'

const teamsData = [
  {
    id: 'eng',
    n: 'Engineering',
    head: 'Michael Chen',
    headEmail: 'michael.chen@company.com',
    count: 38,
    hours: '1,386h',
    meetings: '212h',
    focus: 88,
    score: 84,
    seatUtilization: 95,
    apps: ['VS Code', 'IntelliJ IDEA', 'Docker', 'Postman', 'GitHub'],
    col: 'chronos',
    members: [
      { name: 'Grace Liu', role: 'Senior Engineer', hours: 37.2, focus: 86, status: 'Active' },
      { name: 'Hana Suzuki', role: 'Frontend Lead', hours: 33.8, focus: 80, status: 'Active' },
      { name: 'James Wilson', role: 'DevOps Specialist', hours: 27.6, focus: 71, status: 'Idle' },
      { name: 'Alex Thompson', role: 'Backend Engineer', hours: 35.4, focus: 82, status: 'Active' },
      { name: 'David Park', role: 'QA Engineer', hours: 30.4, focus: 80, status: 'Active' },
    ]
  },
  {
    id: 'design',
    n: 'Product & Design',
    head: 'Priya Patel',
    headEmail: 'priya.patel@company.com',
    count: 14,
    hours: '498h',
    meetings: '76h',
    focus: 82,
    score: 78,
    seatUtilization: 88,
    apps: ['Figma', 'Miro', 'Notion', 'Google Workspace'],
    col: 'violet',
    members: [
      { name: 'Emily Davis', role: 'Lead UI/UX Designer', hours: 35.0, focus: 88, status: 'Active' },
      { name: 'Priya Patel', role: 'Design Director', hours: 34.2, focus: 83, status: 'Active' },
      { name: 'Sarah Jenkins', role: 'Product Manager', hours: 31.2, focus: 78, status: 'Idle' },
    ]
  },
  {
    id: 'gtm',
    n: 'Go-to-Market',
    head: 'Laura Martinez',
    headEmail: 'laura.martinez@company.com',
    count: 26,
    hours: '904h',
    meetings: '132h',
    focus: 71,
    score: 68,
    seatUtilization: 76,
    apps: ['Slack', 'HubSpot', 'Salesforce', 'Zoom'],
    col: 'emerald',
    members: [
      { name: 'Laura Martinez', role: 'VP Sales & Mktg', hours: 32.0, focus: 75, status: 'Active' },
      { name: 'Alex Thompson', role: 'Marketing Specialist', hours: 22.8, focus: 61, status: 'Offline' },
    ]
  },
  {
    id: 'ops',
    n: 'Operations & HR',
    head: 'David Park',
    headEmail: 'david.park@company.com',
    count: 12,
    hours: '412h',
    meetings: '60h',
    focus: 76,
    score: 73,
    seatUtilization: 90,
    apps: ['Microsoft Excel', 'Outlook', 'Jira', 'Zenefits'],
    col: 'sky',
    members: [
      { name: 'David Park', role: 'Ops Director', hours: 30.4, focus: 80, status: 'Active' },
    ]
  },
]

const ManagerTeams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Teams & Department Overview</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          High-level department performance, meeting loads, and software seat utilization
        </p>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {teamsData.map((t) => (
          <div key={t.id} className="card overflow-hidden flex flex-col justify-between">
            <div>
              <div className={`h-1.5 w-full bg-gradient-to-r ${
                t.col === 'chronos' ? 'from-chronos-500 to-sky-400' :
                t.col === 'violet' ? 'from-violet-500 to-fuchsia-400' :
                t.col === 'emerald' ? 'from-emerald-500 to-teal-400' :
                'from-sky-500 to-cyan-400'
              }`} />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.n}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Head: <span className="font-medium text-slate-700 dark:text-slate-300">{t.head}</span> · {t.count} members
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-surface-light-border dark:border-surface-border flex flex-col items-center justify-center">
                    <div className="text-lg font-bold text-slate-900 dark:text-white leading-none">{t.score}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Health</div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Active Hours</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{t.hours}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Meeting Load</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{t.meetings}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Focus Score</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{t.focus}%</div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Core Tools & Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.apps.map(a => (
                      <span key={a} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-chronos-50 text-chronos-700 border border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-300">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedTeam(t)}
                className="btn-secondary w-full text-sm font-medium hover:border-chronos-500 hover:text-chronos-600 transition-colors"
              >
                View Team Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Team Details Modal for Company Head */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-surface-card border border-surface-light-border dark:border-surface-border rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-surface-light-border dark:border-surface-border flex items-start justify-between bg-slate-50/50 dark:bg-surface-dark/30">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedTeam.n} Department</h3>
                  <span className="badge bg-chronos-50 text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-300 border border-chronos-500/20">
                    {selectedTeam.count} Members
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Department Lead: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeam.head}</span> ({selectedTeam.headEmail})
                </p>
              </div>

              <button
                onClick={() => setSelectedTeam(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-dark"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Executive Metrics Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40 text-center">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Total Work Hours</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedTeam.hours}</div>
                </div>
                <div className="p-4 rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40 text-center">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Focus vs Meeting</div>
                  <div className="text-lg font-bold text-chronos-600 dark:text-chronos-400 mt-1">{selectedTeam.focus}% Focus</div>
                </div>
                <div className="p-4 rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40 text-center">
                  <div className="text-xs text-slate-500 dark:text-slate-400">License Utilization</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{selectedTeam.seatUtilization}% Active</div>
                </div>
              </div>

              {/* Team Members List */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Key Team Members & Allocation</h4>
                <div className="border border-surface-light-border dark:border-surface-border rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-surface-dark/50 border-b border-surface-light-border dark:border-surface-border text-slate-500">
                        <th className="px-4 py-2.5">Member Name</th>
                        <th className="px-4 py-2.5">Role</th>
                        <th className="px-4 py-2.5">Weekly Hours</th>
                        <th className="px-4 py-2.5">Focus Score</th>
                        <th className="px-4 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTeam.members.map((m, idx) => (
                        <tr key={idx} className="border-b border-surface-light-border dark:border-surface-border last:border-0">
                          <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{m.name}</td>
                          <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{m.role}</td>
                          <td className="px-4 py-3 font-medium tabular-nums">{m.hours}h</td>
                          <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">{m.focus}%</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              m.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                              m.status === 'Idle' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                              'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400'
                            }`}>
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-surface-light-border dark:border-surface-border flex justify-end bg-slate-50/50 dark:bg-surface-dark/30">
              <button
                onClick={() => setSelectedTeam(null)}
                className="btn-primary text-xs !py-2 !px-5"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerTeams
