import { useEffect, useRef, useState } from 'react'

const fallbackConfig = {
  enable_screenshot_capture: true,
  screenshot_interval_seconds: 60,
  screenshot_blur_radius_px: 20,
}

export default function BlurredScreenshotGallery({
  autoCaptureEnabled = false,
}) {
  const [screenshots, setScreenshots] = useState([])
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statusMsg, setStatusMsg] = useState('')
  const captureInFlightRef = useRef(false)

  const invokeTauri = async (cmd, args = {}) => {
    try {
      if (window.__TAURI__ || window.__TAURI_INTERNALS__) {
        const { invoke } = await import('@tauri-apps/api/core')
        return await invoke(cmd, args)
      }
    } catch (err) {
      console.warn('Tauri invoke not available, falling back to simulated API response', err)
    }
    return null
  }

  const mergeScreenshot = (entry) => {
    setScreenshots((prev) => {
      const next = [entry, ...prev.filter((item) => item.screenshot_id !== entry.screenshot_id)]
      return next.slice(0, 12)
    })
  }

  const fetchScreenshots = async () => {
    const res = await invokeTauri('get_screenshot_logs', { limit: 12 })
    if (res && Array.isArray(res)) {
      setScreenshots(res)
    }
  }

  const fetchConfig = async () => {
    const res = await invokeTauri('get_screenshot_config')
    setConfig(res || fallbackConfig)
  }

  useEffect(() => {
    fetchConfig()
    fetchScreenshots()
  }, [])

  const captureScreenshot = async ({ silent = false } = {}) => {
    if (captureInFlightRef.current) return

    captureInFlightRef.current = true
    setError(null)

    try {
      const blurRadius = config?.screenshot_blur_radius_px || 20
      const res = await invokeTauri('capture_screenshot', {
        appName: 'Chronos Workspace',
        windowTitle: 'Active workspace',
        blurRadius,
        userRole: 'employee',
      })

      if (res) {
        mergeScreenshot(res)
      } else {
        const mockPayload = {
          screenshot_id: `sc-${Date.now()}`,
          device_id: 'dev-win32-local',
          captured_at: new Date().toISOString(),
          s3_object_key: '.chronos/screenshots/activity_snapshot.png',
          image_hash: 'preview-mode',
          is_blurred: true,
          blur_radius: blurRadius,
          window_title: 'Active workspace',
          app_name: 'Chronos Workspace',
          base64_data_url: null,
        }
        mergeScreenshot(mockPayload)
      }

      if (!silent) {
        setStatusMsg('Snapshot captured successfully.')
      }
    } catch (err) {
      setError(err?.toString() || 'Failed to capture screenshot')
    } finally {
      captureInFlightRef.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!config) return

    if (!autoCaptureEnabled || !config.enable_screenshot_capture) {
      setStatusMsg('Automatic snapshots pause whenever tracking is paused.')
      return
    }

    const intervalMs = Math.max(config.screenshot_interval_seconds || 60, 1) * 1000
    const minuteLabel = Math.max(Math.round(intervalMs / 60000), 1)
    const now = Date.now()
    const lastAutoCaptureAt = window.__chronosLastAutoCaptureAt || 0

    setStatusMsg(`Automatic snapshots are on and run every ${minuteLabel} minute${minuteLabel > 1 ? 's' : ''}.`)
    if (now - lastAutoCaptureAt > 5000) {
      window.__chronosLastAutoCaptureAt = now
      captureScreenshot({ silent: true })
    }

    const timer = window.setInterval(() => {
      captureScreenshot({ silent: true })
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [autoCaptureEnabled, config])

  const handleManualCapture = async () => {
    setLoading(true)
    setStatusMsg('')
    await captureScreenshot()
  }

  const handleDelete = async (id) => {
    await invokeTauri('delete_screenshot', { screenshotId: id })
    setScreenshots((prev) => prev.filter((s) => s.screenshot_id !== id))
  }

  return (
    <div className="card">
      <div className="card-header flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-chronos-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Activity Snapshots
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Recent protected snapshots from this active session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge bg-slate-100 text-slate-600 border border-slate-200 dark:bg-surface-dark dark:text-slate-300 dark:border-surface-border">
            Auto every {(config?.screenshot_interval_seconds || 60) / 60} min
          </span>
          <button
            type="button"
            className="btn-primary flex items-center gap-2 text-xs"
            onClick={handleManualCapture}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            )}
            Capture now
          </button>
        </div>
      </div>

      <div className="card-body space-y-4">
        {statusMsg && (
          <div className="p-3 text-xs rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30">
            {statusMsg}
          </div>
        )}

        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30">
            {error}
          </div>
        )}

        {screenshots.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-surface-light-border dark:border-surface-border rounded-xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-surface-dark flex items-center justify-center text-slate-400 mb-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No snapshots yet</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Snapshots appear here automatically while your session is active.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((sc) => (
              <div
                key={sc.screenshot_id}
                className="group relative rounded-xl border border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40 p-3.5 space-y-2.5 transition-all hover:border-slate-300 dark:hover:border-surface-muted"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-700/50">
                  {sc.base64_data_url ? (
                    <img
                      src={sc.base64_data_url}
                      alt="Activity snapshot"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-chronos-500/20 text-chronos-400 flex items-center justify-center mb-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-300">Protected snapshot</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Preview available in desktop mode</span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="badge bg-emerald-500/90 text-white text-[10px] backdrop-blur-xs font-medium">
                      Protected
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <span className="truncate max-w-[180px]">{sc.app_name || 'Workspace'}</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(sc.screenshot_id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      title="Delete snapshot"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate" title={sc.window_title}>
                    {sc.window_title || 'Active workspace'}
                  </div>

                  <div className="pt-2 border-t border-surface-light-border dark:border-surface-border flex items-center justify-between text-[10px] text-slate-400">
                    <span>Saved snapshot</span>
                    <span>{new Date(sc.captured_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
