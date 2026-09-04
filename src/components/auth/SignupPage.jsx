import { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'

export default function SignupPage({ onSignupSuccess, onGoToLogin }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    const form = new FormData(e.currentTarget)

    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')

    // Check password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const data = await invoke('signup', {
        name,
        email,
        password,
        role: 'employee',
      })

      if (!data.success) {
        throw new Error(data.message || 'Failed to create account')
      }

      console.log('Signup successful:', data)

      setSuccess('Account created successfully! You can now sign in.')

      // Optional: automatically move to login page
      setTimeout(() => {
        if (onSignupSuccess) {
          onSignupSuccess()
        } else if (onGoToLogin) {
          onGoToLogin()
        }
      }, 1000)

    } catch (err) {
      console.error('Signup error:', err)
      const msg = typeof err === 'string' ? err : (err.message || 'Unable to connect to Rust backend')
      setError(msg)
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
                Create your account
              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-2 text-center text-sm sm:text-base">
                Create a Chronos account to get started
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>

                <label
                  htmlFor="name"
                  className="label"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                />

              </div>

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
                  autoComplete="new-password"
                  required
                />

              </div>

              {/* Confirm Password */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="label"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />

              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading
                  ? 'Creating Account...'
                  : 'Create Account'}
              </button>

            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={onGoToLogin}
                className="mt-2 text-sm font-semibold text-chronos-600 hover:text-chronos-700 dark:text-chronos-400"
              >
                Sign In
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}