import { NavLink, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaPowerOff,
  FaChartBar,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";

const navItems = [
  { to: "studentDashboard", label: "Dashboard", icon: FaChartBar },
  { to: "allComplaints", label: "Complaints", icon: FaClipboardList },
  { to: "addComplaint", label: "Add", icon: FaPlusCircle },
  { to: "studentProfile", label: "Profile", icon: FaUserCircle },
];

function StudentSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  const desktopLinkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-500 hover:bg-slate-800 hover:text-white group";
  const desktopActiveClass =
    "bg-emerald-600 text-white shadow-md shadow-emerald-900/30 hover:bg-emerald-600";

  const mobileLinkClass =
    "flex flex-col items-center justify-center gap-1 flex-1 py-2 text-slate-500";
  const mobileActiveClass = "text-emerald-600";

  return (
    <>
      {/* Desktop sidebar — only visible md and up */}
      <div className="hidden md:flex flex-col justify-between w-64 h-screen p-5 bg-white text-black border-r border-slate-200">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-8">
            <FaGraduationCap className="text-3xl text-black" />
            <span className="text-xl font-bold tracking-wide text-purple-700">
              Student Portal
            </span>
          </div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${desktopLinkClass} ${isActive ? desktopActiveClass : ""}`
                }
              >
                <Icon className="text-lg transition-transform group-hover:scale-105" />
                <span className="font-medium text-sm">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-950/20 transition-colors duration-200 mt-auto border border-transparent hover:border-rose-900/30"
        >
          <FaPowerOff className="text-lg" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>

      {/* Mobile bottom nav — only visible below md */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch bg-white border-t border-slate-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${mobileLinkClass} ${isActive ? mobileActiveClass : ""}`
            }
          >
            <Icon className="text-xl" />
            <span className="text-[11px] font-medium">{label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className=" hidden md:flex flex-col items-center justify-center gap-1 flex-1 py-2 text-slate-400"
        >
          <FaPowerOff className="text-xl" />
          <span className="text-[11px] font-medium">Logout</span>
        </button>
      </div>
    </>
  );
}

export default StudentSidebar;