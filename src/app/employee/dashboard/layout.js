"use client"
import SidebarUserDash from '@/components/SidebarUserDash';
import '@/styles/dashboard_main.css';
import 'react-loading-skeleton/dist/skeleton.css'
export default function DashboardLayout({ children }) {

  return (
    <div className="dashboard-container">
      <SidebarUserDash />
      <div className="main-content main-dashboard pt-0">
        {/* <TopbarUser /> */}
        <div className="content p-0 h-100 align-items-start">{children}</div>
      </div>
    </div>
  );
}
