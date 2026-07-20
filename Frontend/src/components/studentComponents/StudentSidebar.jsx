import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import {
  FaGraduationCap,
  FaPowerOff,
  FaChartBar,
  FaClipboardList,
  FaPlusCircle,
  FaUserCircle,
} from "react-icons/fa";

const navItems = [
  { to: "/student", label: "Dashboard", icon: FaChartBar },
  { to: "/student/addComplaint", label: "Add Complaint", icon: FaPlusCircle },
  { to: "/student/studentProfile", label: "Profile", icon: FaUserCircle },
];

function StudentSidebar() {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(logout())
    navigate("/");}

  const desktopLinkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-black-500 hover:bg-slate-800 hover:text-white group";
  const desktopActiveClass =
    "bg-emerald-600 text-white shadow-md shadow-emerald-900/30 hover:bg-emerald-600";

  const mobileLinkClass =
    "relative flex flex-col items-center justify-center gap-1 flex-1 py-2 text-slate-500 transition-all duration-200 active:scale-90 active:bg-slate-100";
  const mobileActiveClass = "text-emerald-600";

  return (
    <>
      {/* Desktop sidebar — only visible md and up */}
      <div className="hidden md:flex flex-col justify-between w-64 h-screen p-2 bg-slate-300 text-black border-r border-slate-700">
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
                end={to === "/student"}
                className={({ isActive }) =>
                  `${desktopLinkClass} ${isActive ? desktopActiveClass : ""}`
                }
              >
                <Icon className="text-lg transition-transform group-hover:scale-105" />
                <span className="font-medium text-lg">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-700 hover:text-black hover:bg-rose-200 rounded-xl transition-colors duration-200 mt-auto border border-transparent hover:border-rose-900/30"
        >
          <FaPowerOff className="text-lg" />
          <span className="font-medium text-lg">Logout</span>
        </button>
      </div>

      {/* Mobile bottom nav — only visible below md */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch bg-white border-t border-slate-200 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/student"}
            className={({ isActive }) =>
              `${mobileLinkClass} ${isActive ? mobileActiveClass : ""}`
            }
          >
            {({ isActive }) => (
              <>
                {/* top indicator bar for active tab */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-emerald-600" />
                )}
                <Icon
                  className={`text-xl transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                <span
                  className={`text-[11px] transition-all duration-200 ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default StudentSidebar;