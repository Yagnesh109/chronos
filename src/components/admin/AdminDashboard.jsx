import { useMemo } from 'react'
import PageShell from '../shared/PageShell.jsx'
import AdminOverview from './AdminOverview.jsx'
import AdminUsers from './AdminUsers.jsx'
import AdminDevices from './AdminDevices.jsx'
import AdminPolicies from './AdminPolicies.jsx'
import AdminCategories from './AdminCategories.jsx'
import AdminAudit from './AdminAudit.jsx'
import AdminOrgSettings from './AdminOrgSettings.jsx'

export default function AdminDashboard({ activeSection }) {
  const section = useMemo(() => {
    switch (activeSection) {
      case 'users': return <AdminUsers />
      case 'devices': return <AdminDevices />
      case 'policies': return <AdminPolicies />
      case 'categories': return <AdminCategories />
      case 'audit': return <AdminAudit />
      case 'org-settings': return <AdminOrgSettings />
      case 'overview':
      default: return <AdminOverview />
    }
  }, [activeSection])

  return (
    <PageShell>
      {section}
    </PageShell>
  )
}
