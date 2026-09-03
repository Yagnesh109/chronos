import { useMemo, useState } from 'react'

const initialUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'ADMIN',
    dept: 'IT',
    status: 'Active',
    lastSeen: 'Now',
    os: 'macOS',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@company.com',
    role: 'MANAGER',
    dept: 'Engineering',
    status: 'Active',
    lastSeen: 'Now',
    os: 'Windows',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@company.com',
    role: 'EMPLOYEE',
    dept: 'Design',
    status: 'Active',
    lastSeen: '2m ago',
    os: 'macOS',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james@company.com',
    role: 'EMPLOYEE',
    dept: 'Engineering',
    status: 'Idle',
    lastSeen: '18m ago',
    os: 'Ubuntu',
  },
  {
    id: 5,
    name: 'Alex Thompson',
    email: 'alex@company.com',
    role: 'EMPLOYEE',
    dept: 'Marketing',
    status: 'Offline',
    lastSeen: '2h ago',
    os: 'Windows',
  },
  {
    id: 6,
    name: 'Priya Patel',
    email: 'priya@company.com',
    role: 'MANAGER',
    dept: 'Design',
    status: 'Active',
    lastSeen: 'Now',
    os: 'RHEL',
  },
]

const statusStyles = {
  Active:
    'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400',
  Idle:
    'bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-400',
  Offline:
    'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-400',
}

const roleStyles = {
  ADMIN:
    'bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-400',
  MANAGER:
    'bg-chronos-500/15 text-chronos-700 border-chronos-500/30 dark:text-chronos-400',
  EMPLOYEE:
    'bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-400',
}

const emptyForm = {
  name: '',
  email: '',
  role: 'EMPLOYEE',
  dept: 'Engineering',
  status: 'Active',
  os: 'Windows',
}

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState(emptyForm)

  const [userToDelete, setUserToDelete] = useState(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.dept.toLowerCase().includes(search.toLowerCase())

      const roleMatch =
        roleFilter === 'ALL' || user.role === roleFilter

      const statusMatch =
        statusFilter === 'ALL' || user.status === statusFilter

      return searchMatch && roleMatch && statusMatch
    })
  }, [users, search, roleFilter, statusFilter])

  const openInviteModal = () => {
    setEditingUser(null)
    setFormData(emptyForm)
    setShowUserModal(true)
  }

  const openEditModal = (user) => {
    setEditingUser(user)

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      dept: user.dept,
      status: user.status,
      os: user.os,
    })

    setShowUserModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      return
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...formData,
              }
            : user
        )
      )
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        lastSeen: 'Not active yet',
      }

      setUsers((prev) => [...prev, newUser])
    }

    setShowUserModal(false)
    setEditingUser(null)
    setFormData(emptyForm)
  }

  const handleDelete = () => {
    if (!userToDelete) return

    setUsers((prev) =>
      prev.filter((user) => user.id !== userToDelete.id)
    )

    setUserToDelete(null)
  }

  const resetFilters = () => {
    setSearch('')
    setRoleFilter('ALL')
    setStatusFilter('ALL')
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            User Management
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage employees, managers, administrators, and their organization access.
          </p>
        </div>

        <button
          type="button"
          onClick={openInviteModal}
          className="btn-primary w-full sm:w-auto"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>

          Invite User
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="card">
          <div className="card-body">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Users
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {users.length}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Active Users
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {users.filter((user) => user.status === 'Active').length}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Managers
            </p>

            <p className="mt-2 text-3xl font-bold text-chronos-600 dark:text-chronos-400">
              {users.filter((user) => user.role === 'MANAGER').length}
            </p>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            <input
              className="input"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="input"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="EMPLOYEE">Employee</option>
            </select>

            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Idle">Idle</option>
              <option value="Offline">Offline</option>
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="btn-secondary"
            >
              Reset Filters
            </button>

          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="card overflow-hidden">

        <div className="flex items-center justify-between border-b border-surface-light-border px-5 py-4 dark:border-surface-border sm:px-6">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Organization Users
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-sm">

            <thead>
              <tr className="border-b border-surface-light-border bg-slate-50 dark:border-surface-border dark:bg-surface-dark/40">

                <th className="px-6 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                  User
                </th>

                <th className="px-6 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                  Role
                </th>

                <th className="px-6 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                  Department
                </th>

                <th className="px-6 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                  OS
                </th>

                <th className="px-6 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-6 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">
                  Last Seen
                </th>

                <th className="px-6 py-3 text-right font-semibold text-slate-600 dark:text-slate-300">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-surface-light-border transition-colors hover:bg-slate-50 dark:border-surface-border dark:hover:bg-surface-dark/30"
                >

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-chronos-500 to-sky-500 text-xs font-bold text-white">
                        {user.name
                          .split(' ')
                          .map((name) => name[0])
                          .join('')
                          .slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate font-semibold text-slate-900 dark:text-white">
                          {user.name}
                        </div>

                        <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {user.email}
                        </div>
                      </div>

                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`badge border ${roleStyles[user.role]}`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {user.dept}
                  </td>

                  <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                    {user.os}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`badge border ${statusStyles[user.status]}`}>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          user.status === 'Active'
                            ? 'animate-pulse bg-emerald-500'
                            : user.status === 'Idle'
                            ? 'bg-amber-500'
                            : 'bg-slate-500'
                        }`}
                      />

                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {user.lastSeen}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">

                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        className="btn-ghost !p-2"
                        title="Edit user"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUserToDelete(user)}
                        className="btn-ghost !p-2 text-rose-500 hover:bg-rose-500/10 hover:text-rose-500"
                        title="Delete user"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                        </svg>
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="px-6 py-16 text-center">

            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              No users found
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>

          </div>
        )}

      </div>

      {/* Invite / Edit Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="card w-full max-w-lg">

            <div className="card-header">

              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {editingUser ? 'Edit User' : 'Invite User'}
                </h3>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {editingUser
                    ? 'Update user information and access details.'
                    : 'Add a new user to your organization.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="btn-ghost h-9 w-9 !p-0"
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit} className="card-body space-y-4">

              <div>
                <label className="label">Full Name</label>

                <input
                  className="input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="label">Email Address</label>

                <input
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="label">Role</label>

                  <select
                    className="input"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="EMPLOYEE">Employee</option>
                  </select>
                </div>

                <div>
                  <label className="label">Department</label>

                  <select
                    className="input"
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                  >
                    <option value="IT">IT</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="label">Status</label>

                  <select
                    className="input"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Idle">Idle</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="label">Operating System</label>

                  <select
                    className="input"
                    name="os"
                    value={formData.os}
                    onChange={handleChange}
                  >
                    <option value="Windows">Windows</option>
                    <option value="macOS">macOS</option>
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="RHEL">RHEL</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary">
                  {editingUser ? 'Save Changes' : 'Send Invitation'}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="card w-full max-w-md">

            <div className="card-body">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                </svg>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                Delete User?
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to remove{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {userToDelete.name}
                </span>{' '}
                from this organization?
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setUserToDelete(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn-danger"
                >
                  Delete User
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AdminUsers