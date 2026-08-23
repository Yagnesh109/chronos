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
  const update = (k, v) => setCfg((c) => ({ ...c, [k]: v }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Policy Configuration</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mirrors the canonical JSON feature config (PRD §2.1 Global System Configuration)</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="card-header">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Screenshot & Privacy</h3>
            <span className="badge bg-rose-50 text-rose-700 border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">Pillar 2</span>
          </div>
          <div className="card-body space-y-4">
            <Switch checked={cfg.screenshots} onChange={(v) => update('screenshots', v)} label="Enable Screenshot Capture" />
            <Switch checked={cfg.clientHash} onChange={(v) => update('clientHash', v)} label="Client-side Screenshot Hash (HMAC-SHA256)" />
            <Switch checked={cfg.maskPII} onChange={(v) => update('maskPII', v)} label="Mask PII in Window Titles (email/CC/SSN regex)" />
            <Switch checked={cfg.stealth} onChange={(v) => update('stealth', v)} label="Stealth Mode (no local UI toggle)" />
            <div>
              <label className="label">Screenshot Interval (seconds)</label>
              <input type="number" className="input" value={cfg.screenshotInterval} onChange={(e) => update('screenshotInterval', Number(e.target.value))} />
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Default per PRD: 600s (10 min)</div>
            </div>
            <div>
              <label className="label">Client-side Blur Radius (px)</label>
              <input type="number" className="input" value={cfg.blurRadius} onChange={(e) => update('blurRadius', Number(e.target.value))} />
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gaussian blur in Rust memory; raw frames never persisted per PRD</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Idle, Working Hours & Sync</h3>
            <span className="badge bg-chronos-50 text-chronos-700 border-chronos-500/20 dark:bg-chronos-500/10 dark:text-chronos-400">Pillar 4</span>
          </div>
          <div className="card-body space-y-4">
            <Switch checked={cfg.idleDetection} onChange={(v) => update('idleDetection', v)} label="Enable Idle Detection" />
            <Switch checked={cfg.enforceHours} onChange={(v) => update('enforceHours', v)} label="Working Hours Enforcement" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Idle Threshold (s)</label>
                <input type="number" className="input" value={cfg.idleThreshold} onChange={(e) => update('idleThreshold', Number(e.target.value))} />
              </div>
              <div>
                <label className="label">Sync Interval (s)</label>
                <input type="number" className="input" value={cfg.syncInterval} onChange={(e) => update('syncInterval', Number(e.target.value))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Shift Start</label>
                <input type="time" className="input" value={cfg.startHour} onChange={(e) => update('startHour', e.target.value)} />
              </div>
              <div>
                <label className="label">Shift End</label>
                <input type="time" className="input" value={cfg.endHour} onChange={(e) => update('endHour', e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label">Offline Storage Limit (MB)</label>
              <input type="number" className="input" value={cfg.offlineLimit} onChange={(e) => update('offlineLimit', Number(e.target.value))} />
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">When reached: LRU drop + screenshots purged per PRD Scenario A</div>
            </div>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <div className="card-header">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Department Overrides (PRD §6.3 JSONB policy)</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">FULL_TRACKING | METRICS_ONLY | DISABLED</span>
          </div>
          <div className="card-body space-y-3">
            {[
              { d: 'Engineering', tl: 'FULL_TRACKING', ssf: 6, c: 'emerald' },
              { d: 'Design', tl: 'FULL_TRACKING', ssf: 6, c: 'chronos' },
              { d: 'HR / Legal', tl: 'METRICS_ONLY', ssf: 0, c: 'amber' },
              { d: 'Contractors', tl: 'METRICS_ONLY', ssf: 2, c: 'sky' },
            ].map((r) => (
              <div key={r.d} className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-surface-dark/50 border border-surface-light-border dark:border-surface-border">
                <div className="font-medium text-slate-900 dark:text-white">{r.d}</div>
                <div className="flex items-center gap-3">
                  <span className={`badge bg-${r.c}-50 text-${r.c}-700 border-${r.c}-500/20 dark:bg-${r.c}-500/10 dark:text-${r.c}-400`}>{r.tl}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Screenshots/hr: <b className="text-slate-800 dark:text-slate-200">{r.ssf}</b></span>
                  <button className="btn-secondary !py-1.5 !px-3 text-xs">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button className="btn-secondary">Revert to Defaults</button>
        <button className="btn-primary">Save Policy</button>
      </div>
    </div>
  )
}

export default AdminPolicies
