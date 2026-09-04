import { useMemo, useState } from 'react'

const businessMetrics = [
  {
    label: 'Total Seats Sold',
    value: '1,284',
    change: '+12.8%',
    description: 'Licensed seats across all customers',
    tone: 'chronos',
  },
  {
    label: 'New Companies',
    value: '18',
    change: '+5',
    description: 'Added this month',
    tone: 'emerald',
  },
  {
    label: 'New Seats',
    value: '246',
    change: '+18.4%',
    description: 'Seats added this month',
    tone: 'sky',
  },
  {
    label: 'Renewals',
    value: '32',
    change: '+8.1%',
    description: 'Subscriptions renewed',
    tone: 'violet',
  },
]

const growthData = [
  { month: 'Apr', companies: 18, seats: 620 },
  { month: 'May', companies: 22, seats: 714 },
  { month: 'Jun', companies: 27, seats: 826 },
  { month: 'Jul', companies: 31, seats: 948 },
  { month: 'Aug', companies: 36, seats: 1120 },
  { month: 'Sep', companies: 42, seats: 1284 },
]

const subscriptionPlans = [
  {
    name: 'Starter',
    companies: 14,
    seats: 186,
    percentage: 33,
  },
  {
    name: 'Professional',
    companies: 19,
    seats: 548,
    percentage: 45,
  },
  {
    name: 'Enterprise',
    companies: 9,
    seats: 550,
    percentage: 22,
  },
]

const customerAdoption = [
  {
    company: 'Acme Technologies',
    seats: 180,
    activeSeats: 164,
    utilization: 91,
    status: 'Healthy',
  },
  {
    company: 'Nexora Solutions',
    seats: 240,
    activeSeats: 211,
    utilization: 88,
    status: 'Healthy',
  },
  {
    company: 'Vertex Systems',
    seats: 120,
    activeSeats: 82,
    utilization: 68,
    status: 'Growing',
  },
  {
    company: 'Bluewave Digital',
    seats: 96,
    activeSeats: 54,
    utilization: 56,
    status: 'Needs Attention',
  },
  {
    company: 'Orbit Labs',
    seats: 320,
    activeSeats: 298,
    utilization: 93,
    status: 'Healthy',
  },
  {
    company: 'Cloudnest Pvt Ltd',
    seats: 150,
    activeSeats: 104,
    utilization: 69,
    status: 'Growing',
  },
  {
    company: 'Brightpath Inc.',
    seats: 78,
    activeSeats: 61,
    utilization: 78,
    status: 'Healthy',
  },
  {
    company: 'InnovateX',
    seats: 100,
    activeSeats: 70,
    utilization: 70,
    status: 'Growing',
  },
]

const commercialActivity = [
  {
    type: 'Upgrade',
    company: 'Orbit Labs',
    detail: 'Professional → Enterprise',
    date: 'Today',
    value: '+120 seats',
  },
  {
    type: 'New Company',
    company: 'Brightpath Inc.',
    detail: 'Professional plan',
    date: 'Today',
    value: '+78 seats',
  },
  {
    type: 'Renewal',
    company: 'Acme Technologies',
    detail: 'Annual subscription renewed',
    date: 'Yesterday',
    value: '+180 seats',
  },
  {
    type: 'Seats Added',
    company: 'Nexora Solutions',
    detail: 'Additional licenses purchased',
    date: 'Yesterday',
    value: '+60 seats',
  },
  {
    type: 'New Company',
    company: 'InnovateX',
    detail: 'Starter plan',
    date: '2 days ago',
    value: '+100 seats',
  },
]

const getMetricClasses = (tone) => {
  const styles = {
    chronos: {
      value: 'text-chronos-600 dark:text-chronos-400',
      change: 'text-chronos-600 dark:text-chronos-400',
    },
    emerald: {
      value: 'text-emerald-600 dark:text-emerald-400',
      change: 'text-emerald-600 dark:text-emerald-400',
    },
    sky: {
      value: 'text-sky-600 dark:text-sky-400',
      change: 'text-sky-600 dark:text-sky-400',
    },
    violet: {
      value: 'text-violet-600 dark:text-violet-400',
      change: 'text-violet-600 dark:text-violet-400',
    },
  }

  return styles[tone] || styles.chronos
}

const AdminProductivity = () => {
  const [period, setPeriod] = useState('This Month')
  const [customerPage, setCustomerPage] = useState(1)

  const customersPerPage = 5

  const totalPages = Math.ceil(
    customerAdoption.length / customersPerPage,
  )

  const paginatedCustomers = useMemo(() => {
    const start = (customerPage - 1) * customersPerPage

    return customerAdoption.slice(
      start,
      start + customersPerPage,
    )
  }, [customerPage])

  const startCustomer =
    customerAdoption.length === 0
      ? 0
      : (customerPage - 1) * customersPerPage + 1

  const endCustomer = Math.min(
    customerPage * customersPerPage,
    customerAdoption.length,
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Platform Productivity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track customer adoption, seat utilization, and platform growth.
          </p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input w-full sm:w-44"
        >
          <option>This Month</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Business Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {businessMetrics.map((metric) => {
          const classes = getMetricClasses(metric.tone)

          return (
            <div key={metric.label} className="card">
              <div className="card-body">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {metric.label}
                </p>

                <p
                  className={`mt-2 text-3xl font-bold ${classes.value}`}
                >
                  {metric.value}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold ${classes.change}`}
                  >
                    ↑ {metric.change}
                  </span>

                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    vs previous period
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {metric.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Platform Adoption */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Seat Utilization */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Seat Utilization
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                How actively customers use their licensed seats.
              </p>
            </div>

            <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              78.6%
            </span>
          </div>

          <div className="card-body">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Active Seats
              </span>

              <span className="text-sm font-bold text-slate-900 dark:text-white">
                1,010 / 1,284
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
              <div
                className="h-full rounded-full bg-gradient-to-r from-chronos-600 to-sky-400"
                style={{ width: '78.6%' }}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-surface-dark">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Active
                </p>

                <p className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  1,010
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 dark:bg-surface-dark">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Available
                </p>

                <p className="mt-1 text-lg font-bold text-slate-700 dark:text-slate-200">
                  274
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Adoption */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Platform Adoption
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Customer engagement with Chronos.
              </p>
            </div>
          </div>

          <div className="card-body space-y-5">

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Active Companies
                </span>

                <span className="text-sm font-bold text-chronos-600 dark:text-chronos-400">
                  36 / 42
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                <div
                  className="h-full rounded-full bg-chronos-500"
                  style={{ width: '85.7%' }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Active Seats
                </span>

                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  78.6%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: '78.6%' }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Weekly Engagement
                </span>

                <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                  71.4%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: '71.4%' }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Commercial Summary */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Commercial Summary
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Customer account movement this period.
              </p>
            </div>
          </div>

          <div className="card-body space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                New Companies
              </span>

              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                +18
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Upgrades
              </span>

              <span className="font-bold text-chronos-600 dark:text-chronos-400">
                +11
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Renewals
              </span>

              <span className="font-bold text-sky-600 dark:text-sky-400">
                32
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Cancellations
              </span>

              <span className="font-bold text-rose-600 dark:text-rose-400">
                3
              </span>
            </div>

            <div className="border-t border-slate-100 pt-4 dark:border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Net Growth
                </span>

                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  +26 companies
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Growth Trend */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Platform Growth
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Customer companies and licensed seats over the selected period.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-chronos-500" />
              Companies
            </span>

            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              Seats
            </span>
          </div>
        </div>

        <div className="card-body">
          <div className="flex h-64 items-end gap-3 sm:gap-6">
            {growthData.map((item) => {
              const companyHeight =
                (item.companies / 42) * 100

              const seatHeight =
                (item.seats / 1284) * 100

              return (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div className="flex h-48 w-full items-end justify-center gap-1.5">

                    <div
                      className="w-1/3 rounded-t-lg bg-chronos-500 transition-all duration-300"
                      style={{
                        height: `${companyHeight}%`,
                      }}
                      title={`${item.companies} companies`}
                    />

                    <div
                      className="w-1/3 rounded-t-lg bg-sky-400 transition-all duration-300"
                      style={{
                        height: `${seatHeight}%`,
                      }}
                      title={`${item.seats} seats`}
                    />

                  </div>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Subscription Plans + Commercial Activity */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Subscription Plans */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Subscription Distribution
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Customer distribution across Chronos plans.
              </p>
            </div>
          </div>

          <div className="card-body space-y-6">
            {subscriptionPlans.map((plan) => (
              <div key={plan.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {plan.name}
                    </span>

                    <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                      {plan.companies} companies
                    </span>
                  </div>

                  <span className="text-sm font-bold text-chronos-600 dark:text-chronos-400">
                    {plan.seats} seats
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                  <div
                    className="h-full rounded-full bg-chronos-500"
                    style={{
                      width: `${plan.percentage}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-right text-xs text-slate-400">
                  {plan.percentage}% of customer base
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Activity */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Recent Commercial Activity
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Important customer and subscription events.
              </p>
            </div>
          </div>

          <div className="card-body">
            <div className="space-y-4">
              {commercialActivity.map((activity, index) => (
                <div
                  key={`${activity.company}-${index}`}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chronos-50 text-xs font-bold text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-300">
                    {activity.type.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {activity.company}
                      </p>

                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {activity.date}
                      </span>
                    </div>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {activity.type} · {activity.detail}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {activity.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Customer Adoption Table */}
      <div className="card overflow-hidden">

        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Customer Adoption
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Seat utilization across customer companies.
            </p>
          </div>

          <span className="badge bg-chronos-50 text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-300">
            {customerAdoption.length} Companies
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">

            <thead className="border-b border-surface-light-border bg-slate-50 dark:border-surface-border dark:bg-surface-dark">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Licensed Seats
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Active Seats
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Utilization
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr
                  key={customer.company}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-surface-border dark:hover:bg-surface-dark"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {customer.company}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {customer.seats}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {customer.activeSeats}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-surface-dark">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${customer.utilization}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {customer.utilization}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`badge ${
                        customer.status === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                          : customer.status === 'Growing'
                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-surface-border">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {startCustomer}-{endCustomer}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {customerAdoption.length}
            </span>{' '}
            companies
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                setCustomerPage((page) => Math.max(1, page - 1))
              }
              disabled={customerPage === 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-surface-border dark:text-slate-300 dark:hover:bg-surface-dark"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCustomerPage(page)}
                className={`h-8 min-w-8 rounded-lg px-2 text-xs font-semibold transition ${
                  customerPage === page
                    ? 'bg-chronos-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-dark'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setCustomerPage((page) =>
                  Math.min(totalPages, page + 1),
                )
              }
              disabled={customerPage === totalPages}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-surface-border dark:text-slate-300 dark:hover:bg-surface-dark"
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminProductivity