import { useSelector } from "react-redux";
import { FaClipboardList, FaCheckSquare, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import OldPendingComplaints from "./dashboardComponents/OldPendingComplaints";
import AdminChart from "./dashboardComponents/AdminChart";

function AdminDashboard() {
  const complaints = useSelector((state) => state.complaints.list);
  const { currentUser } = useSelector((state) => state.auth);

  const total = complaints.length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const rejected = complaints.filter((c) => c.status === "Rejected").length;

  return (
    <div className="w-full min-h-screen md:h-screen overflow-visible md:overflow-hidden px-4 py-6 md:px-10 md:py-6 bg-slate-50 flex flex-col">
      <header className="mb-1">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1">Overview of complaints</p>
      </header>

      <div className="hidden md:grid lg:grid-cols-4 gap-4 md:gap-6 mt-4">
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl text-purple-700 shrink-0">
            <FaClipboardList className="text-lg md:text-xl" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-xs md:text-sm font-medium text-slate-500 tracking-wide truncate">Total Complaints</h2>
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-none">{total}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-xl text-amber-600 shrink-0">
            <FaHourglassHalf className="text-lg md:text-xl" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-xs md:text-sm font-medium text-slate-500 tracking-wide truncate">Pending Complaints</h2>
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-none">{inProgress}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl text-emerald-700 shrink-0">
            <FaCheckSquare className="text-lg md:text-xl" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-xs md:text-sm font-medium text-slate-500 tracking-wide truncate">Resolved Complaints</h2>
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-none">{resolved}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl shadow-xs border border-slate-100">
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-rose-50 rounded-xl text-rose-700 shrink-0">
            <FaTimesCircle className="text-lg md:text-xl" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-xs md:text-sm font-medium text-slate-500 tracking-wide truncate">Rejected Complaints</h2>
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-none">{rejected}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row py-6 gap-6">
        <div className="w-full lg:w-[65%] order-2 lg:order-1">
          <OldPendingComplaints data={complaints} limit={5} />
        </div>

        <div className="w-full lg:w-[35%] order-1 lg:order-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-auto md:h-[400px]">
          <AdminChart />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;