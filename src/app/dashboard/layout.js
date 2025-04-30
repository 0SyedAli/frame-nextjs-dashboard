"use client"
import Topbar from '@/components/Topbar';
import SidebarDash from '@/components/SidebarDash';
import { usePathname } from 'next/navigation';
import '../../styles/dashboard_main.css';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // Normalize the path by removing any trailing dynamic segments (e.g., IDs)
  const normalizedPath = pathname.replace(/\/\w+$/, '');

  // Map normalized route paths to page titles
  const pageTitles = {
    '/dashboard': '',
    '/dashboard/account-setting': 'Account Setting',
    '/dashboard/add-subservice': 'Add Sub Services',
    '/dashboard/services/edit': 'Edit Sub Services',
    '/dashboard/appointments': 'Appointments',
    '/dashboard/clients-profile': 'Clients Profile',
    '/dashboard/edit-service': 'Edit Service',
    '/dashboard/employees': 'Employees',
    '/dashboard/marketing': 'Marketing',
    '/dashboard/messages': 'Messages',
    '/dashboard/refer-friend': 'Refer a Friend',
    '/dashboard/service-detail': 'Service Detail',
    '/dashboard/services': 'Services',
  };

  // Derive the current page title based on the normalized path
  const currentTitle = pageTitles[normalizedPath] || 'Dashboard';

  return (
    <div className="dashboard-container">
      <SidebarDash />
      <div className="main-content main-dashboard">
        <Topbar pageName={currentTitle} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
