import StudentSidebar from "../components/studentComponents/StudentSidebar";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <StudentSidebar />
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentLayout;