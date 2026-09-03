import { useState } from 'react'
import Switch from '../common/Switch.jsx'

const AdminPolicies = () => {
  const [cfg, setCfg] = useState({
    stealth: false,
    screenshots: true,
    screenshotInterval: 600,
    blurRadius: 20,
    clientHash: true,
    idleDetection: true,
    idleThreshold: 300,
    enforceHours: true,
    startHour: '08:00',
    endHour: '18:00',
    maskPII: true,
    offlineLimit: 500,
    syncInterval: 60,
  })

  const [saved, setSaved] = useState(false)

  const update = (key, value) => {
    setCfg((current) => ({
      ...current,
      [key]: value,
    }))

    setSaved(false)
  }

  const handleSave = () => {
    console.log('Policy saved:', cfg)

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  const handleReset = () => {
    setCfg({
      stealth: false,
      screenshots: true,
      screenshotInterval: 600,
      blurRadius: 20,
      clientHash: true,
      idleDetection: true,
      idleThreshold: 300,
      enforceHours: true,
      startHour: '08:00',
      endHour: '18:00',
      maskPII: true,
      offlineLimit: 500,
      syncInterval: 60,
    })

    setSaved(false)
  }

  const departmentPolicies = [
    {
      department: 'Engineering',
      tracking: 'FULL_TRACKING',
      screenshotsPerHour: 6,
      badgeClass:
        'bg-emerald-50 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
      department: 'Design',
      tracking: 'FULL_TRACKING',
      screenshotsPerHour: 6,
      badgeClass:
        'bg-chronos-50 text-chronos-700 border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-400',
    },
    {
      department: 'HR / Legal',
      tracking: 'METRICS_ONLY',
      screenshotsPerHour: 0,
      badgeClass:
        'bg-amber-50 text-amber-700 border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400',
    },
    {
      department: 'Contractors',
      tracking: 'METRICS_ONLY',
      screenshotsPerHour: 2,
      badgeClass:
        'bg-sky-50 text-sky-700 border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400',
    },
  ]

  return (
    <div className="space-y-6">

      {/* Page Header */}

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Policy Configuration
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure organization-wide monitoring, privacy, working hours,
            synchronization, and department-level tracking rules.
          </p>
        </div>

        {saved && (
          <div className="badge bg-emerald-50 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Policy saved successfully
          </div>
        )}

      </div>


      {/* Main Configuration */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Screenshot & Privacy */}

        <div className="card">

          <div className="card-header">

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Screenshot & Privacy
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure screenshot collection and privacy protection.
              </p>
            </div>

            <span className="badge bg-rose-50 text-rose-700 border border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
              Privacy
            </span>

          </div>


          <div className="card-body space-y-4">

            <Switch
              checked={cfg.screenshots}
              onChange={(value) => update('screenshots', value)}
              label="Enable Screenshot Capture"
            />

            <Switch
              checked={cfg.clientHash}
              onChange={(value) => update('clientHash', value)}
              label="Enable Client-side Screenshot Hash"
            />

            <Switch
              checked={cfg.maskPII}
              onChange={(value) => update('maskPII', value)}
              label="Mask Sensitive Information"
            />

            <Switch
              checked={cfg.stealth}
              onChange={(value) => update('stealth', value)}
              label="Enable Stealth Mode"
            />


            <div className="pt-2">

              <label className="label">
                Screenshot Interval (seconds)
              </label>

              <input
                type="number"
                min="60"
                disabled={!cfg.screenshots}
                className="input disabled:opacity-50"
                value={cfg.screenshotInterval}
                onChange={(event) =>
                  update(
                    'screenshotInterval',
                    Number(event.target.value)
                  )
                }
              />

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Current interval: {Math.round(cfg.screenshotInterval / 60)} minutes
              </p>

            </div>


            <div>

              <label className="label">
                Screenshot Blur Radius (px)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                className="input"
                value={cfg.blurRadius}
                onChange={(event) =>
                  update(
                    'blurRadius',
                    Number(event.target.value)
                  )
                }
              />

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Apply blur before screenshots are stored or synchronized.
              </p>

            </div>

          </div>

        </div>


        {/* Idle, Working Hours & Sync */}

        <div className="card">

          <div className="card-header">

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Activity, Working Hours & Sync
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure idle detection, working schedules, and device synchronization.
              </p>
            </div>

            <span className="badge bg-chronos-50 text-chronos-700 border border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-400">
              Monitoring
            </span>

          </div>


          <div className="card-body space-y-4">

            <Switch
              checked={cfg.idleDetection}
              onChange={(value) => update('idleDetection', value)}
              label="Enable Idle Detection"
            />

            <Switch
              checked={cfg.enforceHours}
              onChange={(value) => update('enforceHours', value)}
              label="Enforce Working Hours"
            />


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>

                <label className="label">
                  Idle Threshold (seconds)
                </label>

                <input
                  type="number"
                  min="60"
                  disabled={!cfg.idleDetection}
                  className="input disabled:opacity-50"
                  value={cfg.idleThreshold}
                  onChange={(event) =>
                    update(
                      'idleThreshold',
                      Number(event.target.value)
                    )
                  }
                />

              </div>


              <div>

                <label className="label">
                  Sync Interval (seconds)
                </label>

                <input
                  type="number"
                  min="10"
                  className="input"
                  value={cfg.syncInterval}
                  onChange={(event) =>
                    update(
                      'syncInterval',
                      Number(event.target.value)
                    )
                  }
                />

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>

                <label className="label">
                  Working Day Start
                </label>

                <input
                  type="time"
                  disabled={!cfg.enforceHours}
                  className="input disabled:opacity-50"
                  value={cfg.startHour}
                  onChange={(event) =>
                    update('startHour', event.target.value)
                  }
                />

              </div>


              <div>

                <label className="label">
                  Working Day End
                </label>

                <input
                  type="time"
                  disabled={!cfg.enforceHours}
                  className="input disabled:opacity-50"
                  value={cfg.endHour}
                  onChange={(event) =>
                    update('endHour', event.target.value)
                  }
                />

              </div>

            </div>


            <div>

              <label className="label">
                Offline Storage Limit (MB)
              </label>

              <input
                type="number"
                min="100"
                className="input"
                value={cfg.offlineLimit}
                onChange={(event) =>
                  update(
                    'offlineLimit',
                    Number(event.target.value)
                  )
                }
              />

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Maximum local storage allowed before old synchronized data is removed.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Department Policies */}

      <div className="card">

        <div className="card-header">

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Department Policy Overrides
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Configure different monitoring levels based on department requirements.
            </p>
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            FULL_TRACKING · METRICS_ONLY · DISABLED
          </span>

        </div>


        <div className="card-body space-y-3">

          {departmentPolicies.map((policy) => (

            <div
              key={policy.department}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border"
            >

              <div>

                <div className="font-semibold text-slate-900 dark:text-white">
                  {policy.department}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Department-specific monitoring configuration
                </div>

              </div>


              <div className="flex flex-wrap items-center gap-3">

                <span
                  className={`badge border ${policy.badgeClass}`}
                >
                  {policy.tracking}
                </span>


                <span className="text-xs text-slate-600 dark:text-slate-400">

                  Screenshots/hr:{' '}

                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {policy.screenshotsPerHour}
                  </span>

                </span>


                <button className="btn-secondary !py-1.5 !px-3 text-xs">
                  Edit
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* Policy Summary */}

      <div className="card">

        <div className="card-header">

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Current Policy Summary
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Quick overview of the active organization configuration.
            </p>
          </div>

        </div>


        <div className="card-body">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border">

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Screenshot Capture
              </div>

              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {cfg.screenshots ? 'Enabled' : 'Disabled'}
              </div>

            </div>


            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border">

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Idle Detection
              </div>

              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {cfg.idleDetection
                  ? `${cfg.idleThreshold}s threshold`
                  : 'Disabled'}
              </div>

            </div>


            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border">

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Working Hours
              </div>

              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {cfg.enforceHours
                  ? `${cfg.startHour} – ${cfg.endHour}`
                  : 'Not enforced'}
              </div>

            </div>


            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border">

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Sync Frequency
              </div>

              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Every {cfg.syncInterval}s
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Actions */}

      <div className="flex flex-wrap justify-end gap-3">

        <button
          onClick={handleReset}
          className="btn-secondary"
        >
          Revert to Defaults
        </button>

        <button
          onClick={handleSave}
          className="btn-primary"
        >
          Save Policy
        </button>

      </div>

    </div>
  )
}

export default AdminPolicies