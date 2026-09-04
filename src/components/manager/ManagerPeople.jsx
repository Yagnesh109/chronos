import { useState, useMemo } from 'react'

const initialPeople = [
  { id: 1, n: 'Emily Davis', r: 'EMPLOYEE', d: 'Design', email: 'emily.davis@company.com', h: 35.0, f: 88, p: 85, s: 'Active' },
  { id: 2, n: 'Grace Liu', r: 'EMPLOYEE', d: 'Engineering', email: 'grace.liu@company.com', h: 37.2, f: 86, p: 84, s: 'Active' },
  { id: 3, n: 'Priya Patel', r: 'MANAGER', d: 'Design', email: 'priya.patel@company.com', h: 34.2, f: 83, p: 81, s: 'Active' },
  { id: 4, n: 'Hana Suzuki', r: 'EMPLOYEE', d: 'Engineering', email: 'hana.suzuki@company.com', h: 33.8, f: 80, p: 77, s: 'Active' },
  { id: 5, n: 'David Park', r: 'EMPLOYEE', d: 'Ops', email: 'david.park@company.com', h: 30.4, f: 80, p: 77, s: 'Active' },
  { id: 6, n: 'Laura Martinez', r: 'MANAGER', d: 'GTM', email: 'laura.martinez@company.com', h: 32.0, f: 75, p: 72, s: 'Active' },
  { id: 7, n: 'James Wilson', r: 'EMPLOYEE', d: 'Engineering', email: 'james.wilson@company.com', h: 27.6, f: 71, p: 66, s: 'Idle' },
  { id: 8, n: 'Alex Thompson', r: 'EMPLOYEE', d: 'Marketing', email: 'alex.thompson@company.com', h: 22.8, f: 61, p: 58, s: 'Offline' },
  { id: 9, n: 'Michael Chen', r: 'MANAGER', d: 'Engineering', email: 'michael.chen@company.com', h: 39.5, f: 91, p: 89, s: 'Active' },
  { id: 10, n: 'Sarah Jenkins', r: 'EMPLOYEE', d: 'Product', email: 'sarah.jenkins@company.com', h: 31.2, f: 78, p: 74, s: 'Idle' }
]

const ITEMS_PER_PAGE = 5

const ManagerPeople = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [exportNotice, setExportNotice] = useState('')

  // Filtered dataset based on search, status, and role
  const filteredPeople = useMemo(() => {
    return initialPeople.filter(person => {
      const matchesSearch =
        person.n.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.d.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === 'ALL' || person.s.toUpperCase() === statusFilter.toUpperCase()

      const matchesRole =
        roleFilter === 'ALL' || person.r.toUpperCase() === roleFilter.toUpperCase()

      return matchesSearch && matchesStatus && matchesRole
    })
  }, [searchTerm, statusFilter, roleFilter])

  // Reset to page 1 whenever filters change
  const totalPages = Math.ceil(filteredPeople.length / ITEMS_PER_PAGE) || 1
  const validCurrentPage = Math.min(currentPage, totalPages)

  const paginatedPeople = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE
    return filteredPeople.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredPeople, validCurrentPage])

  // CSV Export handler
  const handleExportCSV = () => {
    if (filteredPeople.length === 0) return

    const headers = ['Name', 'Email', 'Role', 'Department', 'Active Hours', 'Focus Score', 'Productivity Score', 'Status']
    const csvRows = [
      headers.join(','),
      ...filteredPeople.map(p =>
        `"${p.n}","${p.email}","${p.r}","${p.d}",${p.h},${p.f},${p.p},"${p.s}"`
      )
    ]

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `People_Performance_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setExportNotice(`Successfully exported ${filteredPeople.length} record(s) to CSV`)
    setTimeout(() => setExportNotice(''), 3500)
  }

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">People Performance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Individual contributor activity, focus, and productivity rankings
          </p>
        </div>

        {/* Export Data Button */}
        <button
          onClick={handleExportCSV}
          className="btn-primary flex items-center gap-2 text-sm !py-2.5 !px-4 shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV ({filteredPeople.length})
        </button>
      </div>

      {/* Export Notification Toast */}
      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300 flex items-center justify-between">
          <span>{exportNotice}</span>
          <button onClick={() => setExportNotice('')} className="text-xs underline hover:no-underline">Dismiss</button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="card p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Search Person or Dept</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, dept, email..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="input pl-9 text-sm"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* Filter by Status */}
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="input text-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="IDLE">Idle</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>

        {/* Filter by Role */}
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Filter by Role</label>
          <select
            value={roleFilter}
            onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="input text-sm"
          >
            <option value="ALL">All Roles</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
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
              {paginatedPeople.length > 0 ? (
                paginatedPeople.map(u => (
                  <tr key={u.id} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-chronos-500 to-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {u.n.split(' ').map(x => x[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{u.n}</div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {u.d} · <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-dark text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-surface-border">{u.r}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white tabular-nums">{u.h}h</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                          <div className="h-full bg-chronos-500 rounded-full" style={{ width: `${u.f}%` }} />
                        </div>
                        <span className="text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">{u.f}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-surface-dark rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${u.p}%` }} />
                        </div>
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No people match the selected search or filter options.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {filteredPeople.length > 5 && (
          <div className="px-6 py-4 border-t border-surface-light-border dark:border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50 dark:bg-surface-dark/20">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-white">{(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredPeople.length)}</span> of{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{filteredPeople.length}</span> records
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={validCurrentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="btn-secondary text-xs !py-1.5 !px-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 px-2">
                Page {validCurrentPage} of {totalPages}
              </span>

              <button
                disabled={validCurrentPage >= totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="btn-secondary text-xs !py-1.5 !px-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManagerPeople
