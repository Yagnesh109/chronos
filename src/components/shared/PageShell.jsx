export default function PageShell({ children }) {
  return (
    <div className="flex-1 min-w-0 min-h-screen overflow-y-auto bg-surface-light dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
        {children}
      </div>
    </div>
  )
}
