export default function LoginPage({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin && onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(14,165,233,0.1),_transparent_50%)]">
      <div className="w-full max-w-md">
        <div className="card p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-chronos-600/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-chronos-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-chronos-500 to-chronos-700 flex items-center justify-center shadow-lg shadow-chronos-600/30 mb-4">
                <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Welcome to Chronos</h1>
              <p className="text-slate-400 mt-2 text-center text-sm sm:text-base">Sign in to start tracking your productivity</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-base">
                Sign In
              </button>
            </form>

            <div className="mt-5 text-center">
              <a href="#" className="text-sm text-chronos-400 hover:text-chronos-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-surface-border">
              <p className="text-center text-sm text-slate-400">
                Don&apos;t have an account?{' '}
                <a href="#" className="text-chronos-400 hover:text-chronos-300 font-medium transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
