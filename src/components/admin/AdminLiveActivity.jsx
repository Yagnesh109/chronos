import { useMemo, useState } from 'react'

const employees = [
  {
    name: 'Ayush Kumar',
    department: 'Engineering',
    status: 'Active',
    app: 'VS Code',
    activeTime: '5h 24m',
    lastSeen: 'Now',
  },
  {
    name: 'Rahul Sharma',
    department: 'Design',
    status: 'Active',
    app: 'Figma',
    activeTime: '4h 48m',
    lastSeen: 'Now',
  },
  {
    name: 'Priya Verma',
    department: 'Marketing',
    status: 'Idle',
    app: 'Chrome',
    activeTime: '3h 52m',
    lastSeen: '8 min ago',
  },
  {
    name: 'Rohan Singh',
    department: 'Engineering',
    status: 'Active',
    app: 'VS Code',
    activeTime: '6h 12m',
    lastSeen: 'Now',
  },
  {
    name: 'Sneha Patel',
    department: 'Operations',
    status: 'Offline',
    app: '—',
    activeTime: '2h 16m',
    lastSeen: '1h ago',
  },
]

const statusStyles = {
  Active: {
    dot: 'bg-emerald-500',
    badge:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  Idle: {
    dot: 'bg-amber-500',
    badge:
      'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  },
  Offline: {
    dot: 'bg-rose-500',
    badge:
      'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  },
}

const AdminLiveActivity = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All Departments')
  const [status, setStatus] = useState('All Status')
  const [sortBy, setSortBy] = useState('Name A-Z')

  // Time ko minutes mein convert karne ke liye
  const convertTimeToMinutes = (time) => {
    const hourMatch = time.match(/(\d+)h/)
    const minuteMatch = time.match(/(\d+)m/)

    const hours = hourMatch ? Number(hourMatch[1]) : 0
    const minutes = minuteMatch ? Number(minuteMatch[1]) : 0

    return hours * 60 + minutes
  }

  const filteredEmployees = useMemo(() => {
    let result = [...employees]

    // Search filter
    if (search.trim()) {
      const searchValue = search.toLowerCase()

      result = result.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchValue) ||
          employee.department.toLowerCase().includes(searchValue) ||
          employee.app.toLowerCase().includes(searchValue)
      )
    }

    // Department filter
    if (department !== 'All Departments') {
      result = result.filter(
        (employee) => employee.department === department
      )
    }

    // Status filter
    if (status !== 'All Status') {
      result = result.filter(
        (employee) => employee.status === status
      )
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Name A-Z':
          return a.name.localeCompare(b.name)

        case 'Name Z-A':
          return b.name.localeCompare(a.name)

        case 'Active Time High-Low':
          return (
            convertTimeToMinutes(b.activeTime) -
            convertTimeToMinutes(a.activeTime)
          )

        case 'Active Time Low-High':
          return (
            convertTimeToMinutes(a.activeTime) -
            convertTimeToMinutes(b.activeTime)
          )

        case 'Department A-Z':
          return a.department.localeCompare(b.department)

        default:
          return 0
      }
    })

    return result
  }, [search, department, status, sortBy])

  const handleResetFilters = () => {
    setSearch('')
    setDepartment('All Departments')
    setStatus('All Status')
    setSortBy('Name A-Z')
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Live Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor your workforce activity and current application usage in real time.
          </p>
        </div>

        <div className="badge w-fit bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live Monitoring
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Active
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  118
                </p>
              </div>

              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Idle
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  12
                </p>
              </div>

              <span className="h-3 w-3 rounded-full bg-amber-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Offline
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  12
                </p>
              </div>

              <span className="h-3 w-3 rounded-full bg-rose-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {/* Search */}
            <input
              type="text"
              placeholder="Search employee..."
              className="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Department */}
            <select
              className="input"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Operations</option>
            </select>

            {/* Status */}
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Idle</option>
              <option>Offline</option>
            </select>

            {/* Sort By */}
            <select
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Name A-Z</option>
              <option>Name Z-A</option>
              <option>Active Time High-Low</option>
              <option>Active Time Low-High</option>
              <option>Department A-Z</option>
            </select>

            {/* Reset */}
            <button
              className="btn-secondary"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>

          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Employee Activity
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Real-time workforce monitoring
            </p>
          </div>

          <span className="badge bg-slate-100 text-slate-600 dark:bg-surface-border dark:text-slate-300">
            {filteredEmployees.length} Employees
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-surface-light-border bg-slate-50 dark:border-surface-border dark:bg-surface-dark">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Current App
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Active Time
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Last Seen
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => {
                  const style = statusStyles[employee.status]

                  return (
                    <tr
                      key={employee.name}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-surface-border dark:hover:bg-surface-dark"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-chronos-50 text-sm font-semibold text-chronos-700 dark:bg-chronos-500/15 dark:text-chronos-300">
                            {employee.name.charAt(0)}
                          </div>

                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {employee.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {employee.department}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`badge ${style.badge}`}>
                          <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                          {employee.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {employee.app}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {employee.activeTime}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {employee.lastSeen}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    No employees found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminLiveActivity