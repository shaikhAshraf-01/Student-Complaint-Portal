import { useSelector } from "react-redux";
import {
  FaClipboardList,
  FaCheckSquare,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

import Complaints from "./dashboardComponents/Complaints";
import Chart from "./dashboardComponents/Chart";

function StudentDashboard() {
  const allComplaints =
    useSelector((state) => state.complaints?.list) || [];

  const currentUser = useSelector(
    (state) => state.auth?.currentUser
  );

  // Student ne jo delete ki hain wo yahan nahi dikhengi (admin ko dikhti rahengi)
  const studentComplaints = allComplaints.filter(
    (complaint) =>
      complaint.stdPRN === currentUser?.prn && !complaint.deletedByStudent
  );

  const total = studentComplaints.length;

  const inProgress = studentComplaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolved = studentComplaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const rejected = studentComplaints.filter(
    (complaint) => complaint.status === "Rejected"
  ).length;

  return (
    <div className="w-full min-h-screen md:h-screen overflow-visible md:overflow-hidden px-4 py-6 md:px-10 md:py-6 bg-slate-50 flex flex-col">

      {/* Header */}
      <header className="mb-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">
          Welcome Back, {currentUser?.fullName || "Student"} 👋
        </h1>

        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Here's what's happening with your complaints today.
        </p>
      </header>

      {/* Statistics */}
      <div className="hidden md:grid lg:grid-cols-4 gap-4 md:gap-6 mt-4">

        {/* Total */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl text-purple-700">
            <FaClipboardList className="text-lg md:text-xl" />
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-medium text-slate-500">
              Total
            </h2>

            <p className="text-xl md:text-2xl font-bold text-slate-900">
              {total}
            </p>
          </div>
        </div>

        {/* In Progress */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-xl text-amber-600">
            <FaHourglassHalf className="text-lg md:text-xl" />
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-medium text-slate-500">
              In Progress
            </h2>

            <p className="text-xl md:text-2xl font-bold text-slate-900">
              {inProgress}
            </p>
          </div>
        </div>

        {/* Resolved */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl text-emerald-700">
            <FaCheckSquare className="text-lg md:text-xl" />
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-medium text-slate-500">
              Resolved
            </h2>

            <p className="text-xl md:text-2xl font-bold text-slate-900">
              {resolved}
            </p>
          </div>
        </div>

        {/* Rejected */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-rose-50 rounded-xl text-rose-700">
            <FaTimesCircle className="text-lg md:text-xl" />
          </div>

          <div>
            <h2 className="text-xs md:text-sm font-medium text-slate-500">
              Rejected
            </h2>

            <p className="text-xl md:text-2xl font-bold text-slate-900">
              {rejected}
            </p>
          </div>
        </div>

      </div>

      {/* Complaints and Chart */}
      <div className="flex flex-col lg:flex-row py-6 gap-6">

        <div className="w-full lg:w-[65%] order-2 lg:order-1">
          <Complaints data={studentComplaints} />
        </div>

        <div className="w-full lg:w-[35%] order-1 lg:order-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 h-[260px] md:h-[400px]">
          <Chart />
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;