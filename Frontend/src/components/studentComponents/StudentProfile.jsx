import { FaUserCircle, FaIdBadge, FaGraduationCap, FaEnvelope, FaPhone, FaPen, FaPowerOff } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/AuthSlice"; // adjust path if needed

function StudentProfile() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const studentData = {
    name: `${currentUser.fullName}`,
    studentId: `${currentUser.prn}`,
    semester: `${currentUser.semester}`,
    department: "Bachelor of Computer Applications",
    email: "ashraf.shaikh@example.edu",
    mobile: "+91 98765 43210",
  };

  const infoItems = [
    { icon: FaIdBadge, label: "Student ID", value: studentData.studentId },
    { icon: FaGraduationCap, label: "Academic Info", value: studentData.semester, sub: studentData.department },
    { icon: FaEnvelope, label: "Email", value: studentData.email },
    { icon: FaPhone, label: "Mobile No.", value: studentData.mobile },
  ];

  return (
    <div className="w-full min-h-screen md:h-screen overflow-visible md:overflow-auto px-4 py-6 md:px-10 md:py-6 bg-slate-50 flex flex-col">
      <header className="border-b border-slate-400 pb-2 shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-purple-700 font-bold">My Profile</h1>
          <p>View your account information</p>
        </div>

        {/* Logout — mobile/tablet only, desktop already has it in the sidebar */}
        <button
          type="button"
          onClick={handleLogout}
          className="md:hidden flex items-center gap-2 text-red-700 hover:text-white hover:bg-rose-600 border border-rose-200 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium shrink-0"
        >
          <FaPowerOff className="text-sm" />
          Logout
        </button>
      </header>

      {/* Profile Card */}
      <div className="flex-1 flex items-start md:items-center justify-center mt-6 md:mt-0">
        <div className="w-full max-w-md lg:max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* Left: Avatar + identity — becomes a fixed sidebar column on large screens */}
          <div className="flex flex-col items-center gap-3 lg:w-64 lg:shrink-0 lg:border-r lg:border-slate-100 lg:pr-8">
            <FaUserCircle className="text-8xl lg:text-9xl text-purple-200" />
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 text-center">
              {studentData.name}
            </h2>
            <span className="text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
              Student
            </span>

            {/* Edit button lives here on large screens, under the identity block */}
            <button
              type="button"
              className="hidden lg:flex w-full items-center justify-center gap-2 bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition duration-300 font-medium text-sm mt-4"
            >
              <FaPen className="text-xs" />
              Edit Profile
            </button>
          </div>

          {/* Right: Info grid — 1 column on mobile, 2 columns on large screens */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 divide-y divide-slate-100 lg:divide-y-0">
              {infoItems.map(({ icon: Icon, label, value, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-3.5 lg:py-5 lg:border-b lg:border-slate-100"
                >
                  <div className="flex items-center justify-center w-9 h-9 lg:w-11 lg:h-11 bg-purple-50 rounded-lg text-purple-600 shrink-0">
                    <Icon className="text-sm lg:text-base" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                      {label}
                    </span>
                    <span className="text-sm lg:text-base font-semibold text-slate-800 truncate">
                      {value}
                    </span>
                    {sub && (
                      <span className="text-xs text-slate-500 truncate">{sub}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Edit button on mobile/tablet only — stays at the bottom like before */}
            <button
              type="button"
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition duration-300 font-medium text-sm mt-6"
            >
              <FaPen className="text-xs" />
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentProfile;