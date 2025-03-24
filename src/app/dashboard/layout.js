import Topbar from '@/components/Topbar';
import SidebarDash from '@/components/SidebarDash';
import '../../styles/dashboard_main.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <SidebarDash />
      <div className="main-content main-dashboard">
        <Topbar />
        <div className="content ">{children}</div>
      </div>
    </div>
  );
}