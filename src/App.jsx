import { useEffect, useMemo, useState } from 'react'
import LoginPage from './components/LoginPage.jsx'
import Header, { SyncStatus } from './components/Header.jsx'
import ActiveTimeMetrics from './components/ActiveTimeMetrics.jsx'
import ProductivityBreakdown from './components/ProductivityBreakdown.jsx'
import ScreenshotsGallery from './components/ScreenshotsGallery.jsx'
import SessionControlPanel, { OperationalMode } from './components/SessionControlPanel.jsx'
import IdleTimeoutModal from './components/IdleTimeoutModal.jsx'
import NotificationAlert, { AlertKind } from './components/NotificationAlert.jsx'

const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    const stored = window.localStorage.getItem('chronos-theme')
    if (stored === 'dark' || stored === 'light') return stored === 'dark'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      window.localStorage.setItem('chronos-theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])

  return [dark, setDark]
}

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [dark, setDark] = useDarkMode()

  const [operationalMode, setOperationalMode] = useState(OperationalMode.WORKING)
  const [trackingActive, setTrackingActive] = useState(true)
  const [paused, setPaused] = useState(false)
  const [syncStatus, setSyncStatus] = useState(SyncStatus.SYNCED)

  const [sessionOpen, setSessionOpen] = useState(false)
  const [idleOpen, setIdleOpen] = useState(false)
  const [storageAlert, setStorageAlert] = useState(true)

  const bg = useMemo(
    () =>
      'min-h-screen bg-surface-dark text-slate-100 antialiased bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.15),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.12),_transparent_50%)]',
    [],
  )

  useEffect(() => {
    if (!authed) return
    const t = setTimeout(() => setIdleOpen(true), 5000)
    return () => clearTimeout(t)
  }, [authed])

  if (!authed) {
    return (
      <div className={bg}>
        <LoginPage onLogin={() => setAuthed(true)} />
      </div>
    )
  }

  const handleLogout = () => setAuthed(false)
  const toggleDark = () => setDark((v) => !v)

  const applySession = ({ tracking, paused: p, mode }) => {
    setTrackingActive(tracking)
    setPaused(p)
    setOperationalMode(mode)
    if (mode === OperationalMode.OFF) setPaused(false)
  }

  return (
    <div className={`${bg} ${dark ? 'dark' : ''} min-h-screen`}>
      <Header
        operationalMode={operationalMode}
        trackingActive={trackingActive && !paused}
        syncStatus={syncStatus}
        darkMode={dark}
        onToggleDarkMode={toggleDark}
        onLogout={handleLogout}
        onOpenSession={() => setSessionOpen(true)}
        onOpenSettings={() => setSessionOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-5 sm:space-y-6">
        {storageAlert && (
          <NotificationAlert
            kind={AlertKind.STORAGE_FULL}
            storageUsedPct={92}
            onDismiss={() => setStorageAlert(false)}
            onAction={() => {
              setSyncStatus(SyncStatus.SYNCED)
              setTimeout(() => setStorageAlert(false), 600)
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <ActiveTimeMetrics
            activeMin={312}
            idleMin={48}
            totalMin={360}
            focusScore={87}
          />
          <ProductivityBreakdown
            values={{ productive: 178, neutral: 72, unproductive: 34, uncategorized: 76 }}
          />
        </div>

        <ScreenshotsGallery blurPx={20} />
      </main>

      <SessionControlPanel
        open={sessionOpen}
        onClose={() => setSessionOpen(false)}
        initialMode={operationalMode}
        initialTracking={trackingActive}
        initialPaused={paused}
        onApply={applySession}
      />

      <IdleTimeoutModal
        open={idleOpen}
        onClose={() => setIdleOpen(false)}
        initialIdleSeconds={180}
        countDownSeconds={60}
        onResume={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onMarkIdle={() => setSyncStatus(SyncStatus.OFFLINE)}
      />
    </div>
  )
}
