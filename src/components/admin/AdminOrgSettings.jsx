const AdminOrgSettings = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Organization Settings</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">organizations table (PRD §6.1) — license key, company profile, billing</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="card">
        <div className="card-header"><h3 className="text-base font-semibold text-slate-900 dark:text-white">Organization Profile</h3></div>
        <div className="card-body space-y-4">
          <div><label className="label">Company Name</label><input className="input" defaultValue="Acme Industries, Inc." /></div>
          <div><label className="label">Organization ID (UUID)</label><input className="input font-mono text-xs" defaultValue="org_e29d401a-7b3c-4a92-8f1d-9e0c1f2a3b4c" readOnly /></div>
          <div><label className="label">License Key</label><input className="input font-mono text-xs" defaultValue="lic_••••••••••••••••4f9a" readOnly /><button className="btn-ghost text-xs mt-2 !-ml-2">Rotate License</button></div>
          <div><label className="label">Subscription Tier</label>
            <div className="p-3 rounded-xl bg-chronos-50 dark:bg-chronos-500/10 border border-chronos-500/20 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-chronos-700 dark:text-chronos-400">Enterprise Annual</div>
                <div className="text-xs text-chronos-700/70 dark:text-chronos-400/70">Unlimited users · 500MB offline · S3 storage</div>
              </div>
              <button className="btn-secondary text-xs">Manage Billing</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="text-base font-semibold text-slate-900 dark:text-white">Compliance & Security</h3></div>
        <div className="card-body space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
            <div>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Data Retention: 24 months</div>
              <div className="text-xs text-emerald-700/70 dark:text-emerald-400/70">GDPR / CCPA aligned</div>
            </div>
            <button className="btn-secondary text-xs">Configure</button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/40 border border-surface-light-border dark:border-surface-border">
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">IP Whitelisting</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">4 ranges configured</div>
            </div>
            <button className="btn-secondary text-xs">Edit</button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/40 border border-surface-light-border dark:border-surface-border">
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">mTLS for ingestion gateway</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Mutual TLS enforced · valid until 2027-01-31</div>
            </div>
            <button className="btn-secondary text-xs">Certificates</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AdminOrgSettings
