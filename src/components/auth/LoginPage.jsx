import { useState } from 'react'

export const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
}

const roles = [
  {
    id: UserRole.ADMIN,
    title: 'Admin',
    subtitle: 'Users, devices, policies, audit',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: UserRole.MANAGER,
    title: 'Company Head',
    subtitle: 'Utilization, focus, software ROI',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 6-6" />
      </svg>
    ),
  },
  {
    id: UserRole.EMPLOYEE,
    title: 'Employee',
    subtitle: 'Self-service hours, split, screens',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function LoginPage({
  onLogin,
  onGoToSignup,
}) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)

    const email = form.get('email')
    const password = form.get('password')
    const role = form.get('role') || UserRole.EMPLOYEE

    try {
      const response = await fetch(
        'http://127.0.0.1:8080/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            'Invalid email or password'
        )
      }

      console.log('Login successful:', data)

      // Backend login successful.
      // Role is currently used for frontend dashboard navigation.
      if (onLogin) {
        onLogin(role)
      }
    } catch (error) {
      console.error('Login error:', error)

      setError(
        error.message ||
          'Unable to connect to server'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-surface-light dark:bg-surface-dark bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.12),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(14,165,233,0.08),_transparent_50%)]">

      <div className="w-full max-w-md">

        <div className="card p-8 sm:p-10 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-chronos-600/5 via-transparent to-transparent pointer-events-none" />

          <div className="absolute -top-24 -right-24 w-48 h-48 bg-chronos-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">

            {/* Header */}
            <div className="flex flex-col items-center mb-8">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-chronos-500 to-chronos-700 flex items-center justify-center shadow-lg shadow-chronos-600/30 mb-4">

                <svg
                  className="w-9 h-9 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>

              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Welcome to Chronos
              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-2 text-center text-sm sm:text-base">
                Privacy-first endpoint &amp; screen-time analytics
              </p>

            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="label"
                >
                  Work email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="password"
                  className="label"
                >
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />

              </div>

              {/* Role Selection */}
              <fieldset>

                <legend className="label">
                  Sign in as
                </legend>

                <div className="grid grid-cols-1 gap-2">

                  {roles.map((r, i) => (

                    <label
                      key={r.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/50 cursor-pointer has-[:checked]:border-chronos-500 has-[:checked]:bg-chronos-50 has-[:checked]:ring-2 has-[:checked]:ring-chronos-500/20 dark:has-[:checked]:bg-chronos-500/10"
                    >

                      <input
                        type="radio"
                        name="role"
                        value={r.id}
                        defaultChecked={i === 2}
                        className="accent-chronos-600"
                      />

                      <span className="w-9 h-9 rounded-lg bg-white dark:bg-surface-card border border-surface-light-border dark:border-surface-border flex items-center justify-center text-chronos-600 dark:text-chronos-400 shrink-0">
                        {r.icon}
                      </span>

                      <span className="min-w-0">

                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                          {r.title}
                        </span>

                        <span className="block text-xs text-slate-500 dark:text-slate-400">
                          {r.subtitle}
                        </span>

                      </span>

                    </label>

                  ))}

                </div>

              </fieldset>

              {/* Login Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading
                  ? 'Signing In...'
                  : 'Sign In'}
              </button>

            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={onGoToSignup}
                className="mt-2 text-sm font-semibold text-chronos-600 hover:text-chronos-700 dark:text-chronos-400"
              >
                Create an account
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              Secure authentication powered by Rust and PostgreSQL.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}