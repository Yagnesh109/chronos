import Header, { SyncStatus } from '../shared/Header.jsx'

import ActiveTimeMetrics from './ActiveTimeMetrics.jsx'

import ProductivityBreakdown from './ProductivityBreakdown.jsx'

import DailyWorkProgress from './DailyWorkProgress.jsx'

import WeekActivityCard from './WeekActivityCard.jsx'

import PrivacyStatusCard from './PrivacyStatusCard.jsx'

import { OperationalMode } from './SessionControlPanel.jsx'


const fsmChip = (
  paused,
  tracking,
  mode,
  syncStatus
) => {
  if (mode === OperationalMode.OFF) {
    return {
      label: 'SESSION_CLOSED',
      cls: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600',
    }
  }

  if (syncStatus === SyncStatus.OFFLINE) {
    return {
      label: 'OFFLINE_BUFFER',
      cls: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30',
    }
  }

  if (syncStatus === SyncStatus.ERROR) {
    return {
      label: 'FAILED_RETRY',
      cls: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30',
    }
  }

  if (paused) {
    return {
      label: 'PAUSED_OPTIONAL',
      cls: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/30',
    }
  }

  if (!tracking) {
    return {
      label: 'SESSION_CLOSED',
      cls: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/40 dark:text-slate-300 dark:border-slate-600',
    }
  }

  return {
    label: 'ACTIVE_TRACKING',
    cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30',
  }
}


const modeLabel = {
  [OperationalMode.HYBRID]: 'Working Hours Mode',
  [OperationalMode.STRICT]: 'Managed Endpoint',
  [OperationalMode.CONTRACTOR]: 'Contractor Session',
  [OperationalMode.OFF]: 'Idle / Closed',
}


export default function EmployeeDashboard({
  operationalMode,
  trackingActive,
  paused,
  syncStatus,
  dark,
  onToggleDark,
  onLogout,
  onOpenSession,
  onPause,
  onResume,
  onStartStop,
  onSimulateIdle,
}) {
  const tracking =
    trackingActive &&
    !paused &&
    operationalMode !== OperationalMode.OFF

  const fsm = fsmChip(
    paused,
    trackingActive,
    operationalMode,
    syncStatus
  )

  const canPause =
    operationalMode === OperationalMode.HYBRID

  const isContractor =
    operationalMode === OperationalMode.CONTRACTOR

  const agentStatusLabel = tracking
    ? `Chronos: Active — ${
        modeLabel[operationalMode] ||
        'Working Hours Mode'
      }`
    : `Chronos: ${
        paused ? 'Paused' : 'Inactive'
      }`


  return (
    <>
      <Header
        operationalMode={operationalMode}
        trackingActive={tracking}
        syncStatus={syncStatus}
        darkMode={dark}
        onToggleDarkMode={onToggleDark}
        onLogout={onLogout}
        agentStatusLabel={agentStatusLabel}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">

        {/* Agent Lifecycle */}
        <div className="card p-4 sm:p-5">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Agent Lifecycle
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-2">

                <span
                  className={`badge border ${fsm.cls}`}
                >
                  {fsm.label}
                </span>

                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {modeLabel[operationalMode]}
                </span>

              </div>
            </div>


            <div className="flex flex-wrap items-center gap-2">

              {isContractor && (
                <button
                  type="button"
                  className={
                    tracking
                      ? 'btn-danger'
                      : 'btn-primary'
                  }
                  onClick={onStartStop}
                >
                  {tracking
                    ? 'Stop Session'
                    : 'Start Session'}
                </button>
              )}


              {canPause && (
                <button
                  type="button"
                  className={
                    paused
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }
                  onClick={
                    paused
                      ? onResume
                      : onPause
                  }
                >
                  {paused
                    ? 'Resume Tracking'
                    : 'Pause Tracking'}
                </button>
              )}


              {operationalMode ===
                OperationalMode.STRICT && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Local pause disabled by policy
                </span>
              )}


              <button
                type="button"
                className="btn-secondary"
                onClick={onOpenSession}
              >
                Session settings
              </button>


              <button
                type="button"
                className="btn-ghost text-xs"
                onClick={onSimulateIdle}
              >
                Simulate Idle
              </button>

            </div>

          </div>

        </div>


        {/* Week Activity */}
        <WeekActivityCard />


        {/* Current Window */}
        <div className="card">

          <div className="card-header">

            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Current Window
            </h3>

            <span className="badge bg-slate-100 text-slate-600 border border-slate-200 dark:bg-surface-border dark:text-slate-300 dark:border-transparent">
              PII Masked
            </span>

          </div>


          <div className="card-body flex flex-wrap items-center justify-between gap-3">

            <div>

              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                code.exe
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Chronos — [REDACTED_PII] · lib/main.rs
              </div>

            </div>


            <div className="text-right text-xs text-slate-500 dark:text-slate-400">

              <div>
                1-second granularity
              </div>

              <div className="mt-0.5">
                Title hashed · regex scrubbed
              </div>

            </div>

          </div>

        </div>


        {/* Daily Work Progress */}
        <DailyWorkProgress
          workedMinutes={312}
          targetMinutes={480}
          productiveMinutes={178}
          focusScore={87}
        />


        {/* Activity Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

          <ActiveTimeMetrics
            activeMin={312}
            idleMin={48}
            totalMin={360}
            focusScore={87}
          />

          <ProductivityBreakdown
            values={{
              productive: 178,
              neutral: 72,
              unproductive: 34,
              uncategorized: 76,
            }}
          />

        </div>


        {/* Privacy Status */}
        <PrivacyStatusCard />

      </main>
    </>
  )
}