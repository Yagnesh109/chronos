import { useMemo, useState } from 'react'

const initialRows = [
  { id: 1, name: 'code.exe', type: 'Application', category: 'PRODUCTIVE', weight: 1.0 },
  { id: 2, name: 'idea64.exe', type: 'Application', category: 'PRODUCTIVE', weight: 1.0 },
  { id: 3, name: 'slack.exe', type: 'Application', category: 'NEUTRAL', weight: 0.5 },
  { id: 4, name: 'chrome.exe', type: 'Application', category: 'UNPRODUCTIVE', weight: 0.2 },
  { id: 5, name: 'figma.exe', type: 'Application', category: 'PRODUCTIVE', weight: 1.0 },
  { id: 6, name: 'youtube.com', type: 'Website', category: 'UNPRODUCTIVE', weight: 0.0 },
  { id: 7, name: 'terminal', type: 'Application', category: 'PRODUCTIVE', weight: 1.0 },
  { id: 8, name: 'outlook.exe', type: 'Application', category: 'NEUTRAL', weight: 0.6 },
  { id: 9, name: 'docs.google.com', type: 'Website', category: 'PRODUCTIVE', weight: 0.9 },
  { id: 10, name: 'linkedin.com', type: 'Website', category: 'NEUTRAL', weight: 0.5 },
  { id: 11, name: 'instagram.com', type: 'Website', category: 'UNPRODUCTIVE', weight: 0.0 },
  { id: 12, name: 'unknown-app.exe', type: 'Application', category: 'UNCATEGORIZED', weight: 0.0 },
]

const categoryStyles = {
  PRODUCTIVE:
    'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400',

  NEUTRAL:
    'bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-400',

  UNPRODUCTIVE:
    'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400',

  UNCATEGORIZED:
    'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-400',
}

const categoryOptions = [
  'PRODUCTIVE',
  'NEUTRAL',
  'UNPRODUCTIVE',
  'UNCATEGORIZED',
]

const AdminCategories = () => {
  const [rows, setRows] = useState(initialRows)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [showAddForm, setShowAddForm] = useState(false)
  const [savedId, setSavedId] = useState(null)

  const [newRule, setNewRule] = useState({
    name: '',
    type: 'Application',
    category: 'PRODUCTIVE',
    weight: 1,
  })

  const stats = useMemo(() => {
    return {
      PRODUCTIVE: rows.filter((row) => row.category === 'PRODUCTIVE').length,
      NEUTRAL: rows.filter((row) => row.category === 'NEUTRAL').length,
      UNPRODUCTIVE: rows.filter((row) => row.category === 'UNPRODUCTIVE').length,
      UNCATEGORIZED: rows.filter((row) => row.category === 'UNCATEGORIZED').length,
    }
  }, [rows])

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.type.toLowerCase().includes(search.toLowerCase())

      const matchesFilter =
        activeFilter === 'ALL' || row.category === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [rows, search, activeFilter])

  const updateRow = (id, key, value) => {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [key]: key === 'weight'
                ? Math.min(1, Math.max(0, Number(value)))
                : value,
            }
          : row
      )
    )

    setSavedId(null)
  }

  const saveRule = (id) => {
    setSavedId(id)

    setTimeout(() => {
      setSavedId(null)
    }, 2000)
  }

  const deleteRule = (id) => {
    setRows((currentRows) =>
      currentRows.filter((row) => row.id !== id)
    )
  }

  const addRule = () => {
    if (!newRule.name.trim()) return

    const rule = {
      id: Date.now(),
      name: newRule.name.trim(),
      type: newRule.type,
      category: newRule.category,
      weight: Math.min(1, Math.max(0, Number(newRule.weight))),
    }

    setRows((currentRows) => [rule, ...currentRows])

    setNewRule({
      name: '',
      type: 'Application',
      category: 'PRODUCTIVE',
      weight: 1,
    })

    setShowAddForm(false)
  }

  const resetFilters = () => {
    setSearch('')
    setActiveFilter('ALL')
  }

  const statCards = [
    {
      label: 'PRODUCTIVE',
      value: stats.PRODUCTIVE,
      textClass: 'text-emerald-600 dark:text-emerald-400',
      borderClass: 'border-emerald-500/20',
    },
    {
      label: 'NEUTRAL',
      value: stats.NEUTRAL,
      textClass: 'text-sky-600 dark:text-sky-400',
      borderClass: 'border-sky-500/20',
    },
    {
      label: 'UNPRODUCTIVE',
      value: stats.UNPRODUCTIVE,
      textClass: 'text-rose-600 dark:text-rose-400',
      borderClass: 'border-rose-500/20',
    },
    {
      label: 'UNCATEGORIZED',
      value: stats.UNCATEGORIZED,
      textClass: 'text-slate-500 dark:text-slate-400',
      borderClass: 'border-slate-500/20',
    },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-start justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Application Classification
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage productivity classifications for applications and websites
            used across the organization.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm((current) => !current)}
          className="btn-primary"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>

          Add Rule
        </button>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {statCards.map((card) => (
          <button
            key={card.label}
            onClick={() =>
              setActiveFilter(
                activeFilter === card.label
                  ? 'ALL'
                  : card.label
              )
            }
            className={`card p-4 text-left transition-all hover:-translate-y-0.5 ${
              activeFilter === card.label
                ? `ring-2 ring-chronos-500 ${card.borderClass}`
                : ''
            }`}
          >
            <div
              className={`text-xs font-semibold mb-1 ${card.textClass}`}
            >
              {card.label}
            </div>

            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {card.value}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              rules defined
            </div>
          </button>
        ))}

      </div>


      {/* Add Rule Form */}

      {showAddForm && (
        <div className="card">

          <div className="card-header">

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Add Classification Rule
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Add an application or website and define its productivity weight.
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(false)}
              className="btn-ghost !p-2"
              aria-label="Close"
            >
              ✕
            </button>

          </div>


          <div className="card-body">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              <div className="md:col-span-2">

                <label className="label">
                  Application / Website Name
                </label>

                <input
                  className="input"
                  placeholder="Example: github.com or vscode.exe"
                  value={newRule.name}
                  onChange={(event) =>
                    setNewRule((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />

              </div>


              <div>

                <label className="label">
                  Rule Type
                </label>

                <select
                  className="input"
                  value={newRule.type}
                  onChange={(event) =>
                    setNewRule((current) => ({
                      ...current,
                      type: event.target.value,
                    }))
                  }
                >
                  <option>Application</option>
                  <option>Website</option>
                </select>

              </div>


              <div>

                <label className="label">
                  Classification
                </label>

                <select
                  className="input"
                  value={newRule.category}
                  onChange={(event) =>
                    setNewRule((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  {categoryOptions.map((category) => (
                    <option key={category}>
                      {category}
                    </option>
                  ))}
                </select>

              </div>


              <div>

                <label className="label">
                  Productivity Weight
                </label>

                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  className="input"
                  value={newRule.weight}
                  onChange={(event) =>
                    setNewRule((current) => ({
                      ...current,
                      weight: event.target.value,
                    }))
                  }
                />

              </div>


              <div className="md:col-span-3 flex items-end">

                <p className="text-xs text-slate-500 dark:text-slate-400 pb-3">
                  Weight ranges from 0.0 to 1.0 and contributes to productivity scoring.
                </p>

              </div>

            </div>


            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={addRule}
                className="btn-primary"
              >
                Add Classification Rule
              </button>

            </div>

          </div>

        </div>
      )}


      {/* Classification Rules */}

      <div className="card overflow-hidden">

        <div className="card-header flex-wrap gap-4">

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Classification Rules
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {filteredRows.length} of {rows.length} rules displayed
            </p>
          </div>


          <div className="flex flex-wrap items-center gap-2">

            <input
              className="input !py-2 !w-56"
              placeholder="Search apps or websites..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="input !py-2 !w-auto"
              value={activeFilter}
              onChange={(event) =>
                setActiveFilter(event.target.value)
              }
            >
              <option value="ALL">All Categories</option>

              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}

            </select>

            {(search || activeFilter !== 'ALL') && (
              <button
                onClick={resetFilters}
                className="btn-secondary !py-2"
              >
                Reset
              </button>
            )}

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-surface-light-border dark:border-surface-border bg-slate-50 dark:bg-surface-dark/40">

                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">
                  Application / Website
                </th>

                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">
                  Type
                </th>

                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">
                  Classification
                </th>

                <th className="text-left font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">
                  Productivity Weight
                </th>

                <th className="text-right font-semibold text-slate-600 dark:text-slate-300 px-6 py-3">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredRows.map((row) => (

                <tr
                  key={row.id}
                  className="border-b border-surface-light-border dark:border-surface-border hover:bg-slate-50 dark:hover:bg-surface-dark/30 transition-colors"
                >

                  <td className="px-6 py-4">

                    <div className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                      {row.name}
                    </div>

                  </td>


                  <td className="px-6 py-4">

                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {row.type}
                    </span>

                  </td>


                  <td className="px-6 py-4">

                    <select
                      className={`badge border cursor-pointer outline-none ${categoryStyles[row.category]}`}
                      value={row.category}
                      onChange={(event) =>
                        updateRow(
                          row.id,
                          'category',
                          event.target.value
                        )
                      }
                    >
                      {categoryOptions.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="bg-white text-slate-800"
                        >
                          {category}
                        </option>
                      ))}
                    </select>

                  </td>


                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 w-36">

                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={row.weight}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            'weight',
                            event.target.value
                          )
                        }
                        className="input !py-1.5 text-xs"
                      />

                    </div>

                  </td>


                  <td className="px-6 py-4 text-right">

                    <div className="inline-flex items-center gap-1">

                      <button
                        onClick={() => saveRule(row.id)}
                        className="btn-secondary !py-1.5 !px-3 text-xs"
                      >
                        {savedId === row.id
                          ? 'Saved ✓'
                          : 'Save'}
                      </button>


                      <button
                        onClick={() => deleteRule(row.id)}
                        className="btn-ghost !p-2 text-rose-500 hover:text-rose-500 hover:bg-rose-500/10"
                        aria-label={`Delete ${row.name}`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>


          {filteredRows.length === 0 && (

            <div className="py-14 text-center">

              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No classification rules found
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try changing your search or category filter.
              </div>

              <button
                onClick={resetFilters}
                className="btn-secondary mt-4"
              >
                Reset Filters
              </button>

            </div>

          )}

        </div>

      </div>


      {/* Classification Information */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="card p-5">

          <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            Productive
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Applications and websites that directly contribute to work and
            organizational productivity.
          </p>

        </div>


        <div className="card p-5">

          <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">
            Neutral
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Tools that may be useful depending on the employee's role,
            department, or current task.
          </p>

        </div>


        <div className="card p-5">

          <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
            Unproductive
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Applications and websites that generally do not contribute to
            organizational work objectives.
          </p>

        </div>

      </div>

    </div>
  )
}

export default AdminCategories