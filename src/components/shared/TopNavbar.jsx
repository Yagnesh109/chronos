import { useState } from 'react'
import { UserRole } from '../auth/LoginPage.jsx'

export const AdminNavSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'live-activity', label: 'Live Activity' },
  { id: 'activity-logs', label: 'Activity Logs' },
  { id: 'users', label: 'Users' },
  { id: 'devices', label: 'Devices' },
  { id: 'policies', label: 'Policies' },
  { id: 'categories', label: 'Categories' },
  { id: 'audit', label: 'Audit Logs' },
  { id: 'org-settings', label: 'Org Settings' },
]

export const ManagerNavSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'teams', label: 'Teams' },
  { id: 'people', label: 'People' },
  { id: 'software', label: 'Software' },
  { id: 'reports', label: 'Reports' },
]

export default function TopNavbar({
  role,
  activeSection,
  onSelectSection,
  onOpenSettings,
  onToggleDarkMode,
  darkMode,
  onLogout,
  userName = 'Sarah Johnson',
  userEmail = 'sarah@company.com',
}) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState('Acme Industries, Inc.')

  const sections = role === UserRole.ADMIN ? AdminNavSections : ManagerNavSections
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-50 border-b border-surface-light-border dark:border-surface-border bg-white/95 dark:bg-surface-card/95 backdrop-blur-md transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-chronos-500 to-sky-500 flex items-center justify-center shadow-md shadow-chronos-600/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="13" r="8" />
                  <path d="M12 9v4l2.5 2.5" />
                  <path d="M9 2h6" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Chronos
              </span>
            </div>

            {/* Middle: Horizontal Nav Items */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => onSelectSection(sec.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-chronos-500/20 dark:text-chronos-300 dark:border dark:border-chronos-500/30 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-surface-dark'
                    }`}
                  >
                    {sec.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right: Controls & Profile */}
          <div className="flex items-center gap-3">
            
            {/* Live Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Status
            </div>

            {/* Organization Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/50 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors"
              >
                <span>{selectedOrg}</span>
                <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {orgDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-surface-light-border dark:border-surface-border bg-white dark:bg-surface-card shadow-xl p-1 z-50 animate-fade-in text-xs">
                  {['Acme Industries, Inc.', 'Global Tech Corp', 'Stark Enterprises'].map((org) => (
                    <button
                      key={org}
                      onClick={() => {
                        setSelectedOrg(org)
                        setOrgDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                        selectedOrg === org
                          ? 'bg-chronos-50 text-chronos-700 dark:bg-chronos-500/10 dark:text-chronos-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark'
                      }`}
                    >
                      {org}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-chronos-500 to-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity"
                title={userName}
              >
                {initials}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-surface-light-border dark:border-surface-border bg-white dark:bg-surface-card shadow-xl p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-surface-light-border dark:border-surface-border mb-1">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{userName}</div>
                    <div className="text-[11px] text-slate-400 truncate">{userEmail}</div>
                    <div className="text-[10px] font-bold text-chronos-600 dark:text-chronos-400 uppercase mt-0.5">
                      {role === UserRole.ADMIN ? 'Platform Admin' : 'Company Head'}
                    </div>
                  </div>

                  {role === UserRole.ADMIN && (
                    <button
                      onClick={() => {
                        onOpenSettings && onOpenSettings()
                        setProfileOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-dark flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      Org Settings
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onLogout()
                      setProfileOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center gap-2 py-2 overflow-x-auto border-t border-surface-light-border dark:border-surface-border text-xs">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`px-3 py-1 rounded-md whitespace-nowrap font-medium ${
                activeSection === sec.id
                  ? 'bg-slate-900 text-white dark:bg-chronos-500/20 dark:text-chronos-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

      </div>
    </header>
  )
}
