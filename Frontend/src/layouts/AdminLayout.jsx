import AdminSidebar from "../components/adminComponents/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;