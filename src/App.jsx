import { useEffect, useMemo, useState } from 'react'

import LoginPage, {
  UserRole,
} from './components/auth/LoginPage.jsx'

import SignupPage from './components/auth/SignupPage.jsx'

import { SyncStatus } from './components/shared/Header.jsx'

import SessionControlPanel, {
  OperationalMode,
} from './components/employee/SessionControlPanel.jsx'

import IdleTimeoutModal from './components/employee/IdleTimeoutModal.jsx'

import TopNavbar from './components/shared/TopNavbar.jsx'

import AdminDashboard from './components/admin/AdminDashboard.jsx'

import ManagerDashboard from './components/manager/ManagerDashboard.jsx'

import EmployeeDashboard from './components/employee/EmployeeDashboard.jsx'


const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false

    const stored = window.localStorage.getItem('chronos-theme')

    if (stored === 'dark' || stored === 'light') {
      return stored === 'dark'
    }

    return false
  })

  useEffect(() => {
    const root = document.documentElement

    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      window.localStorage.setItem(
        'chronos-theme',
        dark ? 'dark' : 'light'
      )
    } catch {}
  }, [dark])

  return [dark, setDark]
}


export default function App() {
  const [authed, setAuthed] = useState(false)

  // Login or signup page
  const [authPage, setAuthPage] = useState('login')

  const [role, setRole] = useState(UserRole.EMPLOYEE)

  const [dark, setDark] = useDarkMode()

  const [operationalMode, setOperationalMode] =
    useState(OperationalMode.HYBRID)

  const [trackingActive, setTrackingActive] =
    useState(true)

  const [paused, setPaused] =
    useState(false)

  const [syncStatus, setSyncStatus] =
    useState(SyncStatus.SYNCED)

  const [sessionOpen, setSessionOpen] =
    useState(false)

  const [idleOpen, setIdleOpen] =
    useState(false)

  const [storageAlert, setStorageAlert] =
    useState(true)

  const [activeSection, setActiveSection] =
    useState('overview')


  const UserProfile = {
    [UserRole.ADMIN]: {
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
    },

    [UserRole.MANAGER]: {
      name: 'Michael Chen',
      email: 'michael@company.com',
    },

    [UserRole.EMPLOYEE]: {
      name: 'Emily Davis',
      email: 'emily@company.com',
    },
  }


  const isEmployee =
    role === UserRole.EMPLOYEE


  const shell = useMemo(
    () =>
      'min-h-screen bg-surface-light text-slate-800 dark:bg-surface-dark dark:text-slate-100 antialiased dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.12),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.08),_transparent_50%)]',
    []
  )


  // =========================
  // AUTH PAGES
  // =========================

  if (!authed) {
    return (
      <div className={shell}>
        {authPage === 'login' ? (
          <LoginPage
            onLogin={(selectedRole) => {
              setRole(selectedRole)
              setActiveSection('overview')
              setAuthed(true)
            }}
            onGoToSignup={() => {
              setAuthPage('signup')
            }}
          />
        ) : (
          <SignupPage
            onSignupSuccess={() => {
              setAuthPage('login')
            }}
            onGoToLogin={() => {
              setAuthPage('login')
            }}
          />
        )}
      </div>
    )
  }


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setAuthed(false)
    setAuthPage('login')
  }


  const toggleDark = () => {
    setDark((v) => !v)
  }


  // =========================
  // SESSION CONTROL
  // =========================

  const applySession = ({
    tracking,
    paused: p,
    mode,
  }) => {
    setTrackingActive(tracking)
    setPaused(p)
    setOperationalMode(mode)

    if (mode === OperationalMode.OFF) {
      setPaused(false)
      setTrackingActive(false)
    }

    if (mode === OperationalMode.STRICT) {
      setTrackingActive(true)
      setPaused(false)
    }
  }


  // =========================
  // DASHBOARD
  // =========================

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

            onOpenSession={() =>
              setSessionOpen(true)
            }

            storageAlert={storageAlert}

            onDismissStorage={() =>
              setStorageAlert(false)
            }

            onSyncNow={() => {
              setSyncStatus(SyncStatus.SYNCED)

              setTimeout(() => {
                setStorageAlert(false)
              }, 600)
            }}

            onPause={() =>
              setPaused(true)
            }

            onResume={() =>
              setPaused(false)
            }

            onStartStop={() => {
              if (
                trackingActive &&
                !paused
              ) {
                setTrackingActive(false)

                setOperationalMode(
                  OperationalMode.OFF
                )
              } else {
                setOperationalMode(
                  OperationalMode.CONTRACTOR
                )

                setTrackingActive(true)
                setPaused(false)
              }
            }}

            onSimulateIdle={() =>
              setIdleOpen(true)
            }
          />

          <SessionControlPanel
            open={sessionOpen}
            onClose={() =>
              setSessionOpen(false)
            }
            initialMode={operationalMode}
            initialTracking={trackingActive}
            initialPaused={paused}
            onApply={applySession}
          />

          <IdleTimeoutModal
            open={idleOpen}
            onClose={() =>
              setIdleOpen(false)
            }
            initialIdleSeconds={300}
            countDownSeconds={60}
            onResume={() =>
              setPaused(false)
            }
            onPause={() =>
              setPaused(true)
            }
            onMarkIdle={() =>
              setSyncStatus(
                SyncStatus.OFFLINE
              )
            }
          />
        </>
      ) : (
        <div className="min-h-screen flex flex-col">
          <TopNavbar
            role={role}
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            onOpenSettings={() => {
              if (role === UserRole.ADMIN) {
                setActiveSection('org-settings')
              }
            }}
            onToggleDarkMode={toggleDark}
            darkMode={dark}
            onLogout={handleLogout}
            userName={UserProfile[role].name}
            userEmail={UserProfile[role].email}
          />

          <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 py-6">
            {role === UserRole.ADMIN ? (
              <AdminDashboard activeSection={activeSection} />
            ) : (
              <ManagerDashboard activeSection={activeSection} />
            )}
          </main>
        </div>
      )}
    </div>
  )
}