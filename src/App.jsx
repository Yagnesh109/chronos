import { useEffect, useMemo, useState } from 'react'
import LoginPage, { UserRole } from './components/auth/LoginPage.jsx'
import { SyncStatus } from './components/shared/Header.jsx'
import SessionControlPanel, { OperationalMode } from './components/employee/SessionControlPanel.jsx'
import IdleTimeoutModal from './components/employee/IdleTimeoutModal.jsx'
import Sidebar from './components/shared/Sidebar.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import ManagerDashboard from './components/manager/ManagerDashboard.jsx'
import EmployeeDashboard from './components/employee/EmployeeDashboard.jsx'

const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const stored = window.localStorage.getItem('chronos-theme')
    if (stored === 'dark' || stored === 'light') return stored === 'dark'
    return false
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
  const [role, setRole] = useState(UserRole.EMPLOYEE)
  const [dark, setDark] = useDarkMode()

  const [operationalMode, setOperationalMode] = useState(OperationalMode.HYBRID)
  const [trackingActive, setTrackingActive] = useState(true)
  const [paused, setPaused] = useState(false)
  const [syncStatus, setSyncStatus] = useState(SyncStatus.SYNCED)

  const [sessionOpen, setSessionOpen] = useState(false)
  const [idleOpen, setIdleOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  const UserProfile = {
    [UserRole.ADMIN]: { name: 'Sarah Johnson', email: 'sarah@company.com' },
    [UserRole.MANAGER]: { name: 'Michael Chen', email: 'michael@company.com' },
    [UserRole.EMPLOYEE]: { name: 'Emily Davis', email: 'emily@company.com' },
  }

  const isEmployee = role === UserRole.EMPLOYEE

  const shell = useMemo(
    () =>
      'min-h-screen bg-surface-light text-slate-800 dark:bg-surface-dark dark:text-slate-100 antialiased dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.12),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.08),_transparent_50%)]',
    [],
  )

  if (!authed) {
    return (
      <div className={shell}>
        <LoginPage
          onLogin={(selectedRole) => {
            setRole(selectedRole)
            setActiveSection('overview')
            setAuthed(true)
          }}
        />
      </div>
    )
  }

  const handleLogout = () => setAuthed(false)
  const toggleDark = () => setDark((v) => !v)

  const applySession = ({ mode }) => {
    setOperationalMode(mode)
    setTrackingActive(mode !== OperationalMode.OFF)
    setPaused(false)
  }

  return (
    <div className={shell}>
      {isEmployee ? (
        <>
          <EmployeeDashboard
            operationalMode={operationalMode}
            trackingActive={trackingActive}
            paused={paused}
            syncStatus={syncStatus}
            dark={dark}
            onToggleDark={toggleDark}
            onLogout={handleLogout}
            onOpenSession={() => setSessionOpen(true)}
            onPause={() => setPaused(true)}
            onResume={() => setPaused(false)}
            onStartStop={() => {
              if (trackingActive && !paused) {
                setTrackingActive(false)
                setOperationalMode(OperationalMode.OFF)
              } else {
                setOperationalMode(OperationalMode.CONTRACTOR)
                setTrackingActive(true)
                setPaused(false)
              }
            }}
            onSimulateIdle={() => setIdleOpen(true)}
          />

          <SessionControlPanel
            open={sessionOpen}
            onClose={() => setSessionOpen(false)}
            initialMode={operationalMode}
            onApply={applySession}
          />

          <IdleTimeoutModal
            open={idleOpen}
            onClose={() => setIdleOpen(false)}
            initialIdleSeconds={300}
            countDownSeconds={60}
            onResume={() => setPaused(false)}
            onPause={() => setPaused(true)}
            onMarkIdle={() => setSyncStatus(SyncStatus.OFFLINE)}
          />
        </>
      ) : (
        <div className="flex min-h-screen">
          <Sidebar
            role={role}
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            onOpenSettings={() => {
              if (role === UserRole.ADMIN) setActiveSection('org-settings')
            }}
            onToggleDarkMode={toggleDark}
            darkMode={dark}
            onLogout={handleLogout}
            userName={UserProfile[role].name}
            userEmail={UserProfile[role].email}
          />
          {role === UserRole.ADMIN ? (
            <AdminDashboard activeSection={activeSection} />
          ) : (
            <ManagerDashboard activeSection={activeSection} />
          )}
        </div>
      )}
    </div>
  )
}
