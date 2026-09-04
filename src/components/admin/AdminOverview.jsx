import StatCard from '../common/StatCard.jsx'

const AdminOverview = () => {
  // =========================================================
  // PLATFORM OWNER / ADMIN DATA
  // =========================================================
  // These values represent Chronos platform-level data.
  // They are not tied to one company's internal employees.
  // Replace these demo values with API data later.
  // =========================================================

  const platformStats = {
    totalCompanies: 128,
    activeCompanies: 116,
    licensedSeats: 4820,
    activeSeats: 4176,
    monthlyRevenue: '₹8.4L',
    newCompanies: 12,
    expiringSoon: 7,
    platformHealth: 'Operational',
  }

  const subscriptionPlans = [
    {
      name: 'Enterprise',
      companies: 24,
      seats: 2180,
      percentage: 19,
      color: 'bg-violet-500',
      text: 'text-violet-600 dark:text-violet-400',
    },
    {
      name: 'Business',
      companies: 58,
      seats: 1860,
      percentage: 45,
      color: 'bg-chronos-500',
      text: 'text-chronos-600 dark:text-chronos-400',
    },
    {
      name: 'Professional',
      companies: 37,
      seats: 690,
      percentage: 29,
      color: 'bg-sky-500',
      text: 'text-sky-600 dark:text-sky-400',
    },
    {
      name: 'Trial',
      companies: 9,
      seats: 90,
      percentage: 7,
      color: 'bg-amber-500',
      text: 'text-amber-600 dark:text-amber-400',
    },
  ]

  const companyAccounts = [
    {
      company: 'Acme Technologies',
      plan: 'Enterprise',
      seats: 500,
      activeSeats: 462,
      status: 'Active',
      renewal: '24 days',
    },
    {
      company: 'NexaTech Solutions',
      plan: 'Business',
      seats: 250,
      activeSeats: 218,
      status: 'Active',
      renewal: '61 days',
    },
    {
      company: 'Alpha Labs',
      plan: 'Professional',
      seats: 120,
      activeSeats: 94,
      status: 'Active',
      renewal: '43 days',
    },
    {
      company: 'Vertex Systems',
      plan: 'Enterprise',
      seats: 420,
      activeSeats: 401,
      status: 'Active',
      renewal: '18 days',
    },
    {
      company: 'BrightWorks',
      plan: 'Business',
      seats: 180,
      activeSeats: 143,
      status: 'Active',
      renewal: '76 days',
    },
    {
      company: 'Nova Industries',
      plan: 'Trial',
      seats: 25,
      activeSeats: 18,
      status: 'Trial',
      renewal: '9 days',
    },
  ]

  const platformActivity = [
    {
      title: 'New company onboarded',
      company: 'Nova Industries',
      detail: '25 seats activated',
      time: '12 min ago',
      type: 'company',
      dot: 'bg-emerald-500',
    },
    {
      title: 'Subscription upgraded',
      company: 'Acme Technologies',
      detail: 'Business → Enterprise',
      time: '38 min ago',
      type: 'subscription',
      dot: 'bg-violet-500',
    },
    {
      title: 'License seats added',
      company: 'NexaTech Solutions',
      detail: '+50 employee seats',
      time: '1 hr ago',
      type: 'license',
      dot: 'bg-sky-500',
    },
    {
      title: 'Subscription renewal',
      company: 'Vertex Systems',
      detail: 'Annual plan renewed',
      time: '2 hrs ago',
      type: 'renewal',
      dot: 'bg-chronos-500',
    },
    {
      title: 'Trial account created',
      company: 'BrightCore',
      detail: '14-day trial started',
      time: '3 hrs ago',
      type: 'trial',
      dot: 'bg-amber-500',
    },
  ]

  const seatUtilization =
    Math.round(
      (platformStats.activeSeats /
        platformStats.licensedSeats) *
        100
    )

  const activeCompanyRate =
    Math.round(
      (platformStats.activeCompanies /
        platformStats.totalCompanies) *
        100
    )

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADING
      ====================================================== */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Platform Overview
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Chronos platform performance, customer accounts,
              licenses, subscriptions, and system health
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Platform Operational
            </span>
          </div>

        </div>
      </div>


      {/* =====================================================
          PLATFORM STATISTICS
      ====================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          label="Total Companies"
          value={platformStats.totalCompanies}
          color="chronos"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 21h18" />
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
              <path d="M9 7h2" />
              <path d="M13 7h2" />
              <path d="M9 11h2" />
              <path d="M13 11h2" />
              <path d="M9 15h2" />
              <path d="M13 15h2" />
            </svg>
          }
        />

        <StatCard
          label="Active Companies"
          value={`${platformStats.activeCompanies} / ${platformStats.totalCompanies}`}
          color="emerald"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />

        <StatCard
          label="Licensed Seats"
          value={platformStats.licensedSeats.toLocaleString()}
          color="sky"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
            </svg>
          }
        />

        <StatCard
          label="Active Seats"
          value={platformStats.activeSeats.toLocaleString()}
          color="emerald"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 7L10 17l-5-5" />
            </svg>
          }
        />

      </div>


      {/* =====================================================
          BUSINESS / REVENUE STATISTICS
      ====================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          label="Monthly Revenue"
          value={platformStats.monthlyRevenue}
          color="emerald"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10" />
              <path d="M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1.3 2 3 2 3 .9 3 2-1.3 2-3 2-3-.9-3-2" />
            </svg>
          }
        />

        <StatCard
          label="New Companies"
          value={`+${platformStats.newCompanies}`}
          color="chronos"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          }
        />

        <StatCard
          label="Expiring Soon"
          value={platformStats.expiringSoon}
          color="rose"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
        />

        <StatCard
          label="Platform Health"
          value={platformStats.platformHealth}
          color="emerald"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />

      </div>


      {/* =====================================================
          PLATFORM ADOPTION + SUBSCRIPTIONS
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Seat Utilization */}
        <div className="card">

          <div className="card-header">

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Platform Adoption
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customer and license utilization across Chronos
              </p>
            </div>

            <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
              {seatUtilization}% utilized
            </span>

          </div>


          <div className="card-body space-y-6">

            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Licensed seat utilization
                </span>

                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {platformStats.activeSeats.toLocaleString()} /{' '}
                  {platformStats.licensedSeats.toLocaleString()}
                </span>

              </div>

              <div className="h-3 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-chronos-500 to-sky-400 rounded-full transition-all"
                  style={{
                    width: `${seatUtilization}%`,
                  }}
                />

              </div>

            </div>


            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Active customer rate
                </span>

                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {activeCompanyRate}%
                </span>

              </div>

              <div className="h-3 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">

                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{
                    width: `${activeCompanyRate}%`,
                  }}
                />

              </div>

            </div>


            <div className="grid grid-cols-2 gap-4">

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-surface-border">

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Active Companies
                </div>

                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {platformStats.activeCompanies}
                </div>

              </div>


              <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark border border-slate-200 dark:border-surface-border">

                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Unused Seats
                </div>

                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {(
                    platformStats.licensedSeats -
                    platformStats.activeSeats
                  ).toLocaleString()}
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Subscription Distribution */}
        <div className="card">

          <div className="card-header">

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Subscription Distribution
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customer accounts by current plan
              </p>
            </div>

          </div>


          <div className="card-body space-y-5">

            {subscriptionPlans.map((plan) => (

              <div key={plan.name}>

                <div className="flex items-center justify-between mb-2 gap-3">

                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {plan.name}
                  </span>

                  <div className="text-right">

                    <span
                      className={`text-sm font-semibold ${plan.text}`}
                    >
                      {plan.companies} companies
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                      {plan.seats.toLocaleString()} seats
                    </span>

                  </div>

                </div>


                <div className="h-2.5 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">

                  <div
                    className={`h-full ${plan.color} rounded-full transition-all`}
                    style={{
                      width: `${plan.percentage}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          COMPANY ACCOUNTS
      ====================================================== */}
      <div className="card">

        <div className="card-header">

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Customer Companies
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Companies currently using the Chronos platform
            </p>
          </div>

          <button
            type="button"
            className="btn-secondary text-xs"
          >
            View All Companies
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px]">

            <thead>

              <tr className="border-b border-slate-200 dark:border-surface-border">

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Company
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Plan
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Seats
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Active Seats
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Renewal
                </th>

              </tr>

            </thead>


            <tbody>

              {companyAccounts.map((company) => (

                <tr
                  key={company.company}
                  className="border-b border-slate-100 dark:border-surface-border/60 last:border-0 hover:bg-slate-50 dark:hover:bg-surface-dark/60 transition-colors"
                >

                  <td className="px-5 py-4">

                    <div className="font-medium text-sm text-slate-900 dark:text-white">
                      {company.company}
                    </div>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {company.plan}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {company.seats.toLocaleString()}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {company.activeSeats.toLocaleString()}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={
                        company.status === 'Trial'
                          ? 'badge bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                          : 'badge bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                      }
                    >
                      {company.status}
                    </span>

                  </td>


                  <td className="px-5 py-4">

                    <span
                      className={
                        company.renewal.includes('days') &&
                        parseInt(company.renewal) <= 30
                          ? 'text-sm font-medium text-rose-600 dark:text-rose-400'
                          : 'text-sm text-slate-600 dark:text-slate-300'
                      }
                    >
                      {company.renewal}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div className="px-5 py-3 border-t border-slate-200 dark:border-surface-border flex items-center justify-between">

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing 6 of {platformStats.totalCompanies} companies
          </span>

          <span className="text-xs text-slate-400 dark:text-slate-500">
            Platform customer accounts
          </span>

        </div>

      </div>


      {/* =====================================================
          PLATFORM ACTIVITY
      ====================================================== */}
      <div className="card">

        <div className="card-header">

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Recent Platform Activity
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Recent customer, subscription, and license events
            </p>
          </div>

          <span className="badge bg-slate-100 text-slate-600 border border-slate-200 dark:bg-surface-dark dark:text-slate-300 dark:border-surface-border">
            Live
          </span>

        </div>


        <div className="card-body">

          <div className="space-y-1">

            {platformActivity.map((activity) => (

              <div
                key={`${activity.company}-${activity.time}`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-surface-dark/60 transition-colors"
              >

                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${activity.dot}`}
                />


                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.title}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      • {activity.company}
                    </span>

                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activity.detail}
                  </div>

                </div>


                <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  {activity.time}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminOverview