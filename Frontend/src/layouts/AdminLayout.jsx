import AdminSidebar from "../components/adminComponents/AdminSidebar";
import AdminDashboard from "../components/adminComponents/AdminDashboard";
function AdminLayout() {
  return (
    <div className="w-full h-screen grid grid-cols-2 ">
      <div>
        <AdminSidebar />
      </div>
      <AdminDashboard/>
    </div>
  );
}
export default AdminLayout;
