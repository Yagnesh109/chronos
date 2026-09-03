import StatCard from '../common/StatCard.jsx'

const AdminOverview = () => {
  /*
    Dashboard summary is kept consistent with the current
    mock data used in AdminUsers.jsx and AdminDevices.jsx.

    Users:
    - Total: 6
    - Active: 4
    - Idle: 1
    - Offline: 1

    Devices:
    - Total: 5
    - Healthy (>= 85): 3
    - Needs attention (< 85): 2
  */

  const weeklyActivity = [
    { day: 'Mon', value: 68 },
    { day: 'Tue', value: 74 },
    { day: 'Wed', value: 81 },
    { day: 'Thu', value: 76 },
    { day: 'Fri', value: 88 },
    { day: 'Sat', value: 42 },
    { day: 'Sun', value: 28 },
  ]

  const operationalModes = [
    {
      label: 'Strict Compliance',
      count: 1,
      pct: 17,
      color: 'bg-rose-500',
      text: 'text-rose-600 dark:text-rose-400',
    },
    {
      label: 'Privacy-First / Hybrid',
      count: 4,
      pct: 66,
      color: 'bg-chronos-500',
      text: 'text-chronos-600 dark:text-chronos-400',
    },
    {
      label: 'Contractor',
      count: 1,
      pct: 17,
      color: 'bg-emerald-500',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
  ]

  const syncHealth = [
    {
      label: 'Synced',
      value: 3,
      description: 'devices currently synced and healthy',
      dotClass:
        'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]',
      cardClass:
        'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20',
      titleClass:
        'text-emerald-700 dark:text-emerald-400',
    },
    {
      label: 'Recently Active',
      value: 1,
      description: 'device active recently and awaiting next sync',
      dotClass: 'bg-amber-500',
      cardClass:
        'bg-amber-50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-500/20',
      titleClass:
        'text-amber-700 dark:text-amber-400',
    },
    {
      label: 'Needs Attention',
      value: 1,
      description: 'device has not been seen recently',
      dotClass: 'bg-rose-500',
      cardClass:
        'bg-rose-50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/20',
      titleClass:
        'text-rose-700 dark:text-rose-400',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Admin Overview
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Organization activity, employee status, device health, and tracking overview
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Active Employees"
          value="4 / 6"
          color="emerald"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        <StatCard
          label="Total Devices"
          value="5"
          color="sky"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          }
        />

        <StatCard
          label="Healthy Devices"
          value="3 / 5"
          color="chronos"
          icon={
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />

        <StatCard
          label="Devices Needing Attention"
          value="2"
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
      </div>

      {/* Activity + Operational Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly Activity */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Organization Activity
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Weekly activity overview
              </p>
            </div>

            <span className="badge bg-slate-100 text-slate-600 border border-slate-200 dark:bg-surface-dark dark:text-slate-300 dark:border-surface-border">
              Last 7 Days
            </span>
          </div>

          <div className="card-body">
            <div className="flex items-end gap-2 sm:gap-3 h-48">
              {weeklyActivity.map((item) => (
                <div
                  key={item.day}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                >
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {item.value}%
                  </span>

                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-chronos-500 to-sky-400 transition-all hover:opacity-80"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operational Mode */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Operational Modes
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Based on 6 users
              </p>
            </div>
          </div>

          <div className="card-body space-y-5">
            {operationalModes.map((mode) => (
              <div key={mode.label}>
                <div className="flex items-center justify-between mb-2 gap-3">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {mode.label}
                  </span>

                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${mode.text}`}
                  >
                    {mode.count} user{mode.count !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="h-2 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full ${mode.color} rounded-full transition-all`}
                    style={{
                      width: `${mode.pct}%`,
                    }}
                  />
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {mode.pct}% of users
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Employee Status
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Current status of registered employees
              </p>
            </div>
          </div>

          <div className="card-body">
            <div className="grid grid-cols-3 gap-4">
              {/* Active */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />

                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Active
                  </span>
                </div>

                <div className="text-3xl font-bold text-slate-900 dark:text-white mt-3">
                  4
                </div>
              </div>

              {/* Idle */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />

                  <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                    Idle
                  </span>
                </div>

                <div className="text-3xl font-bold text-slate-900 dark:text-white mt-3">
                  1
                </div>
              </div>

              {/* Offline */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />

                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Offline
                  </span>
                </div>

                <div className="text-3xl font-bold text-slate-900 dark:text-white mt-3">
                  1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Health */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Device Health
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Health summary across registered devices
              </p>
            </div>
          </div>

          <div className="card-body space-y-4">
            {/* Healthy */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Healthy
                </span>

                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  3 devices
                </span>
              </div>

              <div className="h-3 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">
                <div className="h-full w-[60%] bg-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Warning */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Warning
                </span>

                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  1 device
                </span>
              </div>

              <div className="h-3 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">
                <div className="h-full w-[20%] bg-amber-500 rounded-full" />
              </div>
            </div>

            {/* Critical */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Critical
                </span>

                <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  1 device
                </span>
              </div>

              <div className="h-3 bg-slate-100 dark:bg-surface-dark rounded-full overflow-hidden">
                <div className="h-full w-[20%] bg-rose-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Health */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Sync Health
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Current synchronization status across 5 registered devices
            </p>
          </div>
        </div>

        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {syncHealth.map((item) => (
              <div
                key={item.label}
                className={`p-4 rounded-xl border ${item.cardClass}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 ${item.dotClass}`}
                  />

                  <div>
                    <div
                      className={`text-sm font-semibold ${item.titleClass}`}
                    >
                      {item.label}
                    </div>

                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {item.value}
                    </div>
                  </div>
                </div>

                <div
                  className={`text-xs mt-3 ${item.titleClass} opacity-80`}
                >
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverview