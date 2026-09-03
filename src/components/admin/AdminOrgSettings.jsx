import { useState } from 'react'
import Switch from '../common/Switch.jsx'

const AdminOrgSettings = () => {
  const [org, setOrg] = useState({
    companyName: 'Acme Industries, Inc.',
    industry: 'Technology',
    timezone: 'Asia/Kolkata',
    adminName: 'Sarah Johnson',
    adminEmail: 'admin@acme.com',
    dataRetention: '24',
    ipWhitelist: true,
    securityAlerts: true,
    organizationActive: true,
  })

  const update = (key, value) => {
    setOrg((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Organization Settings
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage company profile, subscription, security, compliance and organization-wide settings
        </p>
      </div>

      {/* Organization Profile + Admin Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Organization Profile */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Organization Profile
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Basic information about your organization
              </p>
            </div>

            <span className="badge bg-chronos-50 text-chronos-700 border border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-400">
              ACTIVE
            </span>
          </div>

          <div className="card-body space-y-4">

            <div>
              <label className="label">Company Name</label>

              <input
                className="input"
                value={org.companyName}
                onChange={(e) => update('companyName', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Industry</label>

              <select
                className="input"
                value={org.industry}
                onChange={(e) => update('industry', e.target.value)}
              >
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Marketing</option>
                <option>Manufacturing</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="label">Timezone</label>

              <select
                className="input"
                value={org.timezone}
                onChange={(e) => update('timezone', e.target.value)}
              >
                <option value="Asia/Kolkata">
                  Asia/Kolkata (IST)
                </option>

                <option value="America/New_York">
                  America/New_York (EST)
                </option>

                <option value="Europe/London">
                  Europe/London (GMT)
                </option>

                <option value="Asia/Singapore">
                  Asia/Singapore (SGT)
                </option>
              </select>
            </div>

            <div>
              <label className="label">
                Organization ID
              </label>

              <input
                className="input font-mono text-xs"
                value="org_e29d401a-7b3c-4a92-8f1d-9e0c1f2a3b4c"
                readOnly
              />
            </div>

          </div>
        </div>


        {/* Organization Administrator */}
        <div className="card">

          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Primary Administrator
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Main contact for organization-level administration
              </p>
            </div>
          </div>

          <div className="card-body space-y-4">

            <div>
              <label className="label">Administrator Name</label>

              <input
                className="input"
                value={org.adminName}
                onChange={(e) => update('adminName', e.target.value)}
              />
            </div>

            <div>
              <label className="label">Administrator Email</label>

              <input
                type="email"
                className="input"
                value={org.adminEmail}
                onChange={(e) => update('adminEmail', e.target.value)}
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/40 border border-surface-light-border dark:border-surface-border">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Organization Status
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Enable or suspend access for this organization
                  </div>
                </div>

                <Switch
                  checked={org.organizationActive}
                  onChange={(value) =>
                    update('organizationActive', value)
                  }
                  label=""
                />

              </div>

              <div className="mt-3">

                <span
                  className={`badge border ${
                    org.organizationActive
                      ? 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400'
                      : 'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      org.organizationActive
                        ? 'bg-emerald-500'
                        : 'bg-rose-500'
                    }`}
                  />

                  {org.organizationActive
                    ? 'Organization Active'
                    : 'Organization Suspended'}
                </span>

              </div>

            </div>

          </div>
        </div>

      </div>


      {/* Subscription + License */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Subscription */}
        <div className="card">

          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Subscription & License
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Current plan and organization licensing
              </p>
            </div>

            <span className="badge bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 dark:text-emerald-400">
              ACTIVE PLAN
            </span>
          </div>

          <div className="card-body space-y-4">

            <div className="p-4 rounded-xl bg-chronos-50 dark:bg-chronos-500/10 border border-chronos-500/20">

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>
                  <div className="text-base font-semibold text-chronos-700 dark:text-chronos-400">
                    Enterprise Annual
                  </div>

                  <div className="text-xs text-chronos-700/70 dark:text-chronos-400/70 mt-1">
                    Full workforce analytics and organization controls
                  </div>
                </div>

                <button className="btn-secondary text-xs">
                  Manage Plan
                </button>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">

                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    User Limit
                  </div>

                  <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    Unlimited
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Storage
                  </div>

                  <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                    500 GB
                  </div>
                </div>

              </div>

            </div>

            <div>
              <label className="label">License Key</label>

              <div className="flex gap-2">

                <input
                  className="input font-mono text-xs"
                  value="lic_••••••••••••••••4f9a"
                  readOnly
                />

                <button className="btn-secondary whitespace-nowrap">
                  Rotate
                </button>

              </div>
            </div>

          </div>
        </div>


        {/* Data & Compliance */}
        <div className="card">

          <div className="card-header">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Data & Compliance
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Organization-wide data retention settings
              </p>
            </div>
          </div>

          <div className="card-body space-y-4">

            <div>
              <label className="label">
                Data Retention Period
              </label>

              <select
                className="input"
                value={org.dataRetention}
                onChange={(e) =>
                  update('dataRetention', e.target.value)
                }
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">

                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>

                </div>

                <div>
                  <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    Compliance Controls Enabled
                  </div>

                  <div className="text-xs text-emerald-700/70 dark:text-emerald-400/70 mt-1">
                    Data retention and privacy controls are configured at the organization level.
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>


      {/* Security */}
      <div className="card">

        <div className="card-header">

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Security Controls
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Configure access protection and security notifications
            </p>
          </div>

        </div>

        <div className="card-body space-y-4">

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/40 border border-surface-light-border dark:border-surface-border">

            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                IP Access Control
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Restrict administrative access to approved network ranges
              </div>
            </div>

            <Switch
              checked={org.ipWhitelist}
              onChange={(value) => update('ipWhitelist', value)}
              label=""
            />

          </div>


          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/40 border border-surface-light-border dark:border-surface-border">

            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Security Alerts
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Notify administrators about suspicious activity and security events
              </div>
            </div>

            <Switch
              checked={org.securityAlerts}
              onChange={(value) =>
                update('securityAlerts', value)
              }
              label=""
            />

          </div>


          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-surface-dark/40 border border-surface-light-border dark:border-surface-border">

            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Ingestion Gateway Security
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Mutual TLS enabled · Certificate valid until 2027-01-31
              </div>
            </div>

            <button className="btn-secondary text-xs">
              Manage Certificates
            </button>

          </div>

        </div>

      </div>


      {/* Danger Zone */}
      <div className="card border border-rose-500/30">

        <div className="card-header">

          <div>
            <h3 className="text-base font-semibold text-rose-600 dark:text-rose-400">
              Danger Zone
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Irreversible organization-level actions
            </p>
          </div>

        </div>

        <div className="card-body">

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20">

            <div>
              <div className="text-sm font-semibold text-rose-700 dark:text-rose-400">
                Delete Organization
              </div>

              <div className="text-xs text-rose-700/70 dark:text-rose-400/70 mt-1">
                Permanently delete the organization and associated system data.
              </div>
            </div>

            <button className="btn-danger">
              Delete Organization
            </button>

          </div>

        </div>

      </div>


      {/* Save */}
      <div className="flex justify-end gap-3">

        <button className="btn-secondary">
          Cancel
        </button>

        <button className="btn-primary">
          Save Organization Settings
        </button>

      </div>

    </div>
  )
}

export default AdminOrgSettings