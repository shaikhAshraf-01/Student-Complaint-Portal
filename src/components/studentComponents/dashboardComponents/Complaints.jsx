import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Complaint from "./Complaint";
import ConfirmModal from "../../ConfirmModal";
import { softDeleteComplaint } from "../../../redux/slices/ComplaintSlice";

const FILTERS = [
  { key: "All", label: "All" },
  { key: "In Progress", label: "In Progress" },
  { key: "Resolved", label: "Resolved" },
  { key: "Rejected", label: "Rejected" },
];

function Complaints({ data }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const [activeFilter, setActiveFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Soft delete: student ke dashboard se hat jaati hai, admin ko "deleted by student" dikhta hai
  const handleConfirmDelete = () => {
    if (!deleteTarget || !currentUser?.prn) return;
    dispatch(softDeleteComplaint({ id: deleteTarget.id, prn: currentUser.prn }));
    setDeleteTarget(null);
  };

  const filteredData = useMemo(() => {
    if (activeFilter === "All") return data;
    return data.filter((item) => item.status === activeFilter);
  }, [data, activeFilter]);

  const getCount = (key) =>
    key === "All" ? data.length : data.filter((item) => item.status === key).length;

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
      
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-10 bg-white -mx-4 px-4 md:mx-0 md:px-0 flex flex-col gap-3 border-b border-slate-100 pb-4 shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900">Recent Complaints</h3>
            <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">Showing your submitted grievances</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full shrink-0">
            {filteredData.length} Total
          </span>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-slate-500 border-slate-200 hover:border-purple-200 hover:text-purple-600"
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {getCount(f.key)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List Container */}
      <div className="flex flex-col gap-3 md:gap-4 max-h-[550px] overflow-y-auto pr-1 scrollbar-none">
        {filteredData.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            No {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} complaints found.
          </div>
        ) : (
          filteredData.map((item) => (
            <Complaint key={item.id} complaint={item} onDelete={setDeleteTarget} />
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this complaint?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" will be removed from your dashboard. The admin will still be able to see that you deleted it.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default Complaints;