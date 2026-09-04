import { useState } from 'react'

const reportsConfig = [
  {
    id: 'exec-summary',
    title: 'Executive Productivity & Focus Summary',
    description: 'High-level department performance, meeting loads, focus metrics, and overall organization health.',
    frequency: 'Weekly (Every Monday)',
    category: 'Executive',
    badgeColor: 'chronos',
    lastGenerated: 'Today, 08:00 AM',
    data: [
      { Metric: 'Total Active Hours', Value: '3,200h' },
      { Metric: 'Average Focus Score', Value: '84%' },
      { Metric: 'Meeting Hours', Value: '480h' },
      { Metric: 'Organization Health Score', Value: '81/100' }
    ]
  },
  {
    id: 'software-roi',
    title: 'Software License ROI & Waste Audit',
    description: 'Seat utilization analysis across SaaS tools, unassigned licenses, and potential cost saving areas.',
    frequency: 'Monthly (1st of month)',
    category: 'Finance & IT',
    badgeColor: 'emerald',
    lastGenerated: 'Yesterday, 05:30 PM',
    data: [
      { Tool: 'VS Code / JetBrains', Licenses: 40, ActiveUsers: 38, Waste: '5%' },
      { Tool: 'Figma', Licenses: 20, ActiveUsers: 14, Waste: '30%' },
      { Tool: 'Slack', Licenses: 100, ActiveUsers: 90, Waste: '10%' }
    ]
  },
  {
    id: 'timesheet-recon',
    title: 'Timesheet & Active Hours Reconciliation',
    description: 'Per-employee and per-department active work hours logged for payroll and operational compliance.',
    frequency: 'Bi-weekly',
    category: 'Operations',
    badgeColor: 'sky',
    lastGenerated: '3 days ago',
    data: [
      { Department: 'Engineering', Headcount: 38, ActiveHours: '1,386h' },
      { Department: 'Product & Design', Headcount: 14, ActiveHours: '498h' },
      { Department: 'Go-to-Market', Headcount: 26, ActiveHours: '904h' }
    ]
  },
  {
    id: 'compliance-audit',
    title: 'Compliance & Data Retention Audit',
    description: 'Archive logs of data tracking policies, mTLS encryption verification, and security compliance status.',
    frequency: 'Monthly',
    category: 'Compliance',
    badgeColor: 'amber',
    lastGenerated: '5 days ago',
    data: [
      { Item: 'Data Retention Policy', Status: '24 Months' },
      { Item: 'mTLS Encryption', Status: 'Enforced' },
      { Item: 'IP Whitelist Ranges', Status: '4 Configured' }
    ]
  }
]

const ManagerReports = () => {
  const [selectedRange, setSelectedRange] = useState('THIS_WEEK')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [downloadingId, setDownloadingId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')

  const filteredReports = reportsConfig.filter(r =>
    activeCategory === 'ALL' || r.category.toUpperCase().includes(activeCategory.toUpperCase())
  )

  const handleDownloadReport = (report) => {
    setDownloadingId(report.id)

    setTimeout(() => {
      const headers = Object.keys(report.data[0])
      const csvRows = [
        headers.join(','),
        ...report.data.map(row => headers.map(h => `"${row[h]}"`).join(','))
      ]

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.id}_${selectedRange}_${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadingId(null)
      setToastMessage(`Downloaded "${report.title}" (${selectedRange})`)
      setTimeout(() => setToastMessage(''), 3500)
    }, 600)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Executive Reports & Exports</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Instant operational exports and automated executive digests for Company Head decision-making
          </p>
        </div>

        {/* Global Date Range Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Date Range:</span>
          <select
            value={selectedRange}
            onChange={e => setSelectedRange(e.target.value)}
            className="input text-xs !py-2 !px-3 font-medium"
          >
            <option value="THIS_WEEK">This Week</option>
            <option value="LAST_30_DAYS">Last 30 Days</option>
            <option value="THIS_QUARTER">This Quarter</option>
            <option value="YEAR_TO_DATE">Year to Date</option>
          </select>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-300 flex items-center justify-between animate-fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-xs underline hover:no-underline">Dismiss</button>
        </div>
      )}

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-light-border dark:border-surface-border pb-3">
        {['ALL', 'EXECUTIVE', 'FINANCE', 'OPERATIONS', 'COMPLIANCE'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-chronos-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-card'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReports.map((r) => (
          <div key={r.id} className="card p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  r.badgeColor === 'chronos' ? 'bg-chronos-50 text-chronos-600 dark:bg-chronos-500/10 dark:text-chronos-400' :
                  r.badgeColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                  r.badgeColor === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                  'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400'
                }`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>

                <span className="badge bg-slate-100 text-slate-700 border border-slate-200 dark:bg-surface-dark dark:text-slate-300 dark:border-surface-border text-[11px]">
                  {r.category}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base mt-4">{r.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{r.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-light-border dark:border-surface-border flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Last generated: <span className="font-medium text-slate-600 dark:text-slate-300">{r.lastGenerated}</span>
              </span>

              <button
                onClick={() => handleDownloadReport(r)}
                disabled={downloadingId === r.id}
                className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 disabled:opacity-60"
              >
                {downloadingId === r.id ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CSV
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManagerReports
