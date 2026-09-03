import { useMemo, useState } from 'react'

const activityLogs = [
  {
    id: 1,
    employee: 'Ayush Kumar',
    department: 'Engineering',
    action: 'Started working',
    details: 'VS Code opened',
    type: 'activity',
    time: 'Just now',
  },
  {
    id: 2,
    employee: 'Rahul Sharma',
    department: 'Design',
    action: 'Application changed',
    details: 'Switched from Chrome to Figma',
    type: 'application',
    time: '2 min ago',
  },
  {
    id: 3,
    employee: 'Priya Verma',
    department: 'Marketing',
    action: 'Idle detected',
    details: 'No activity for 15 minutes',
    type: 'warning',
    time: '8 min ago',
  },
  {
    id: 4,
    employee: 'Rohan Singh',
    department: 'Engineering',
    action: 'Screenshot captured',
    details: 'Scheduled monitoring screenshot',
    type: 'screenshot',
    time: '14 min ago',
  },
  {
    id: 5,
    employee: 'Sneha Patel',
    department: 'Operations',
    action: 'Went offline',
    details: 'Device connection lost',
    type: 'offline',
    time: '28 min ago',
  },
  {
    id: 6,
    employee: 'Amit Verma',
    department: 'Engineering',
    action: 'Logged in',
    details: 'Desktop agent session started',
    type: 'login',
    time: '42 min ago',
  },
  {
    id: 7,
    employee: 'Neha Gupta',
    department: 'Marketing',
    action: 'Sync completed',
    details: 'Activity data uploaded successfully',
    type: 'sync',
    time: '1 hour ago',
  },
]

const typeConfig = {
  activity: {
    label: 'Activity',
    dot: 'bg-emerald-500',
    badge:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },

  application: {
    label: 'Application',
    dot: 'bg-sky-500',
    badge:
      'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  },

  warning: {
    label: 'Warning',
    dot: 'bg-amber-500',
    badge:
      'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  },

  screenshot: {
    label: 'Screenshot',
    dot: 'bg-violet-500',
    badge:
      'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  },

  offline: {
    label: 'Offline',
    dot: 'bg-rose-500',
    badge:
      'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  },

  login: {
    label: 'Login',
    dot: 'bg-chronos-500',
    badge:
      'bg-chronos-50 text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-300',
  },

  sync: {
    label: 'Sync',
    dot: 'bg-teal-500',
    badge:
      'bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400',
  },
}

const AdminActivityLogs = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All Departments')
  const [type, setType] = useState('All Events')
  const [sortBy, setSortBy] = useState('Latest First')

  // Convert time string into minutes
  const getTimeInMinutes = (time) => {
    if (time === 'Just now') return 0

    if (time.includes('min')) {
      return Number.parseInt(time)
    }

    if (time.includes('hour')) {
      return Number.parseInt(time) * 60
    }

    return 0
  }

  const filteredLogs = useMemo(() => {
    let result = activityLogs.filter((log) => {
      // Search Filter
      const matchesSearch =
        log.employee.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase())

      // Department Filter
      const matchesDepartment =
        department === 'All Departments' ||
        log.department === department

      // Event Type Filter
      const matchesType =
        type === 'All Events' ||
        typeConfig[log.type].label === type

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesType
      )
    })

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Employee A-Z':
          return a.employee.localeCompare(b.employee)

        case 'Employee Z-A':
          return b.employee.localeCompare(a.employee)

        case 'Department A-Z':
          return a.department.localeCompare(b.department)

        case 'Event Type A-Z':
          return typeConfig[a.type].label.localeCompare(
            typeConfig[b.type].label
          )

        case 'Oldest First':
          return (
            getTimeInMinutes(b.time) -
            getTimeInMinutes(a.time)
          )

        case 'Latest First':
        default:
          return (
            getTimeInMinutes(a.time) -
            getTimeInMinutes(b.time)
          )
      }
    })

    return result
  }, [search, department, type, sortBy])

  const resetFilters = () => {
    setSearch('')
    setDepartment('All Departments')
    setType('All Events')
    setSortBy('Latest First')
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Activity Logs
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review historical employee activity and important system events.
          </p>
        </div>

        <span className="badge w-fit bg-slate-100 text-slate-600 dark:bg-surface-border dark:text-slate-300">
          {filteredLogs.length} Events
        </span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Today's Events
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              1,284
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Active Sessions
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              118
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Warnings
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
              8
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Sync Issues
            </p>

            <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
              3
            </p>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee or event..."
              className="input"
            />

            {/* Department Filter */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input"
            >
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Operations</option>
            </select>

            {/* Event Type Filter */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input"
            >
              <option>All Events</option>
              <option>Activity</option>
              <option>Application</option>
              <option>Warning</option>
              <option>Screenshot</option>
              <option>Offline</option>
              <option>Login</option>
              <option>Sync</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
            >
              <option>Latest First</option>
              <option>Oldest First</option>
              <option>Employee A-Z</option>
              <option>Employee Z-A</option>
              <option>Department A-Z</option>
              <option>Event Type A-Z</option>
            </select>

            {/* Reset */}
            <button
              type="button"
              onClick={resetFilters}
              className="btn-secondary"
            >
              Reset Filters
            </button>

          </div>
        </div>
      </div>

      {/* Activity Table */}
      <div className="card overflow-hidden">

        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Event History
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Latest workforce and system events
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="border-b border-surface-light-border bg-slate-50 dark:border-surface-border dark:bg-surface-dark">
              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Event
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Details
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Time
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  const config = typeConfig[log.type]

                  return (
                    <tr
                      key={log.id}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-surface-border dark:hover:bg-surface-dark"
                    >

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-chronos-50 text-sm font-semibold text-chronos-700 dark:bg-chronos-500/15 dark:text-chronos-300">
                            {log.employee.charAt(0)}
                          </div>

                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {log.employee}
                          </span>

                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {log.department}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {log.action}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`badge ${config.badge}`}>
                          <span
                            className={`h-2 w-2 rounded-full ${config.dot}`}
                          />
                          {config.label}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {log.details}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {log.time}
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
                    No activity logs found.
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

export default AdminActivityLogs