import { useMemo } from 'react'
import PageShell from '../shared/PageShell.jsx'
import ExecutiveOverview from './ExecutiveOverview.jsx'
import ManagerTeams from './ManagerTeams.jsx'
import ManagerPeople from './ManagerPeople.jsx'
import ManagerSoftware from './ManagerSoftware.jsx'
import ManagerReports from './ManagerReports.jsx'

export default function ManagerDashboard({ activeSection }) {
  const section = useMemo(() => {
    switch (activeSection) {
      case 'teams': return <ManagerTeams />
      case 'people': return <ManagerPeople />
      case 'software': return <ManagerSoftware />
      case 'reports': return <ManagerReports />
      case 'overview':
      default: return <ExecutiveOverview />
    }
  }, [activeSection])

  return <PageShell>{section}</PageShell>
}
