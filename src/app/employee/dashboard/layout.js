"use client"
import SidebarEmpDash from '@/components/SidebarEmpDash';
import '@/styles/dashboard_main.css';
import 'react-loading-skeleton/dist/skeleton.css'
export default function DashboardLayout({ children }) {

  return (
    <div className="dashboard-container">
      <SidebarEmpDash />
      <div className="main-content main-dashboard ">
        {/* <TopbarUser /> */}
        <div className="content h-100 align-items-start">{children}</div>
      </div>
    </div>
  );
}
