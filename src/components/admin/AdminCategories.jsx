const AdminCategories = () => {
  const rows = [
    { p: 'code.exe', c: 'PRODUCTIVE', w: 1.0 },
    { p: 'idea64.exe', c: 'PRODUCTIVE', w: 1.0 },
    { p: 'slack.exe', c: 'NEUTRAL', w: 0.5 },
    { p: 'chrome.exe', c: 'UNPRODUCTIVE', w: 0.2 },
    { p: 'figma.exe', c: 'PRODUCTIVE', w: 1.0 },
    { p: 'youtube.com', c: 'UNPRODUCTIVE', w: 0.0 },
    { p: 'terminal', c: 'PRODUCTIVE', w: 1.0 },
    { p: 'outlook.exe', c: 'NEUTRAL', w: 0.6 },
  ]
  const cStyles = {
    PRODUCTIVE: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400',
    UNPRODUCTIVE: 'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400',
    NEUTRAL: 'bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-400',
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Application Classification</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">app_categories table (PRD §6.4) — hierarchical catalog: Productive / Unproductive / Neutral / Uncategorized</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {['PRODUCTIVE', 'NEUTRAL', 'UNPRODUCTIVE', 'UNCATEGORIZED'].map((c, i) => (
          <div key={c} className="card p-4">
            <div className={`text-xs font-semibold mb-1 ${['text-emerald-600 dark:text-emerald-400','text-sky-600 dark:text-sky-400','text-rose-600 dark:text-rose-400','text-slate-500 dark:text-slate-400'][i]}`}>{c}</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{[142, 58, 23, 11][i]}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">rules defined</div>
          </div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <div className="card-header">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Classification Rules</h3>
          <button className="btn-primary text-xs !py-2">+ Add Rule</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40">
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Process Name</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Classification</th>
                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Custom Weight</th>
                <th className="text-right font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30">
                  <td className="px-6 py-3 font-mono text-xs text-slate-800 dark:text-slate-200">{r.p}</td>
                  <td className="px-6 py-3"><span className={`badge border ${cStyles[r.c]}`}>{r.c}</span></td>
                  <td className="px-6 py-3">
                    <div className="w-32">
                      <input type="number" step="0.1" min="0" max="1" defaultValue={r.w} className="input !py-1.5 text-xs" />
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right"><button className="btn-secondary !py-1.5 !px-3 text-xs">Save</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
