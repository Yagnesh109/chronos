const productivityData = [
  {
    department: 'Engineering',
    score: 88,
    employees: 48,
  },
  {
    department: 'Design',
    score: 84,
    employees: 22,
  },
  {
    department: 'Marketing',
    score: 76,
    employees: 31,
  },
  {
    department: 'Operations',
    score: 81,
    employees: 41,
  },
]

const topEmployees = [
  {
    name: 'Rohan Singh',
    department: 'Engineering',
    score: 94,
    activeTime: '7h 42m',
  },
  {
    name: 'Ayush Kumar',
    department: 'Engineering',
    score: 91,
    activeTime: '7h 18m',
  },
  {
    name: 'Rahul Sharma',
    department: 'Design',
    score: 89,
    activeTime: '6h 54m',
  },
  {
    name: 'Sneha Patel',
    department: 'Operations',
    score: 87,
    activeTime: '6h 38m',
  },
  {
    name: 'Priya Verma',
    department: 'Marketing',
    score: 85,
    activeTime: '6h 22m',
  },
]

const weeklyData = [
  { day: 'Mon', value: 72 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 82 },
  { day: 'Thu', value: 76 },
  { day: 'Fri', value: 88 },
  { day: 'Sat', value: 64 },
  { day: 'Sun', value: 52 },
]

const AdminProductivity = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Productivity Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Analyze workforce productivity, active time, and department performance.
          </p>
        </div>

        <select className="input w-full sm:w-44">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Custom Range</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Average Productivity
            </p>

            <p className="mt-2 text-3xl font-bold text-chronos-600 dark:text-chronos-400">
              82.4%
            </p>

            <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
              ↑ 3.7% from previous period
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Productive Time
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              864h
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Across all employees
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Unproductive Time
            </p>

            <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">
              142h
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Requires optimization
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Avg. Active Time
            </p>

            <p className="mt-2 text-3xl font-bold text-sky-600 dark:text-sky-400">
              6h 48m
            </p>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Per employee / day
            </p>
          </div>
        </div>

      </div>

      {/* Productivity Trend */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Productivity Trend
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Organization productivity score over the last 7 days
            </p>
          </div>

          <span className="badge bg-chronos-50 text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-300">
            Average 82.4%
          </span>
        </div>

        <div className="card-body">
          <div className="flex h-64 items-end gap-3 sm:gap-5">
            {weeklyData.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {item.value}%
                </span>

                <div className="flex h-48 w-full items-end rounded-t-xl bg-slate-100 dark:bg-surface-dark">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-chronos-600 to-sky-400 transition-all duration-300 hover:from-chronos-500 hover:to-sky-300"
                    style={{ height: `${item.value}%` }}
                  />
                </div>

                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Distribution + Department Performance */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Time Distribution */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Time Distribution
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Breakdown of recorded work time
              </p>
            </div>
          </div>

          <div className="card-body space-y-6">

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Productive
                </span>

                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  72%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                <div className="h-full w-[72%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Neutral
                </span>

                <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                  16%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                <div className="h-full w-[16%] rounded-full bg-sky-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Unproductive
                </span>

                <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  12%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                <div className="h-full w-[12%] rounded-full bg-rose-500" />
              </div>
            </div>

          </div>
        </div>

        {/* Department Performance */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Department Performance
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Productivity score by department
              </p>
            </div>
          </div>

          <div className="card-body space-y-5">

            {productivityData.map((department) => (
              <div key={department.department}>

                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {department.department}
                    </span>

                    <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                      {department.employees} employees
                    </span>
                  </div>

                  <span className="text-sm font-bold text-chronos-600 dark:text-chronos-400">
                    {department.score}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                  <div
                    className="h-full rounded-full bg-chronos-500"
                    style={{ width: `${department.score}%` }}
                  />
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

      {/* Top Employees */}
      <div className="card overflow-hidden">

        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Top Productive Employees
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Highest productivity scores for the selected period
            </p>
          </div>

          <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            Top Performers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead className="border-b border-surface-light-border bg-slate-50 dark:border-surface-border dark:bg-surface-dark">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Productivity Score
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Active Time
                </th>
              </tr>
            </thead>

            <tbody>
              {topEmployees.map((employee, index) => (
                <tr
                  key={employee.name}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-surface-border dark:hover:bg-surface-dark"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-chronos-50 text-sm font-bold text-chronos-700 dark:bg-chronos-500/15 dark:text-chronos-300">
                        {index + 1}
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
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${employee.score}%` }}
                        />
                      </div>

                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {employee.score}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {employee.activeTime}
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

export default AdminProductivity