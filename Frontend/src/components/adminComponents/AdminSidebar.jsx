import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaGraduationCap, 
  FaPowerOff, 
  FaChartBar,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle
} from "react-icons/fa";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  // Shared classes for cleaner code and easy maintenance
  const linkBaseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-black-400 hover:bg-slate-800 hover:text-white group";
  const linkActiveClass = "bg-emerald-600 text-black shadow-md shadow-emerald-900/30 hover:bg-emerald-600";

  return (
    <div className="flex flex-col justify-between w-64 h-screen p-5 bg-white- text-black border-r border-black-200">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 py-4 mb-8">
          <FaGraduationCap className="text-3xl text-black-900" />
          <span className="text-xl font-bold tracking-wide text-purple-700">Student Portal</span>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `${linkBaseClass} ${isActive ? linkActiveClass : ''}`}
          >
            <FaChartBar className="text-lg transition-transform group-hover:scale-105" />
            <span className="font-medium text-sm">Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/allComplaints" 
            className={({ isActive }) => `${linkBaseClass} ${isActive ? linkActiveClass : ''}`}
          >
            <FaClipboardList className="text-lg transition-transform group-hover:scale-105" />
            <span className="font-medium text-sm">All Complaints</span>
          </NavLink>
          
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `${linkBaseClass} ${isActive ? linkActiveClass : ''}`}
          >
            <FaPlusCircle className="text-lg transition-transform group-hover:scale-105" />
            <span className="font-medium text-sm">Add Complaint</span>
          </NavLink>
           <NavLink 
            to="/adminProfile" 
            className={({ isActive }) => `${linkBaseClass} ${isActive ? linkActiveClass : ''}`}
          >
            <FaPlusCircle className="text-lg transition-transform group-hover:scale-105" />
            <span className="font-medium text-sm">My Profile</span>
          </NavLink>
          
         
        </nav>
      </div>
      
      {/* Logout Action */}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-950/20 transition-colors duration-200 mt-auto border border-transparent hover:border-rose-900/30"
      >
        <FaPowerOff className="text-lg" />
        <span className="font-medium text-sm">Logout</span>
      </button>
    </div>
  );
}

export default AdminSidebar;
