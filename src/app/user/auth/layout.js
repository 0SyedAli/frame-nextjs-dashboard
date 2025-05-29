import Sidebar from '@/components/SideBar';
import '@/styles/dashboard.css';
import 'react-loading-skeleton/dist/skeleton.css'
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}