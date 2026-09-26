import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import { addResponse } from "../../redux/slices/ComplaintSlice"; // adjust path to your slice

const STATUS_OPTIONS = ["In Progress", "Resolved", "Rejected"];

const getStatus = (status) => {
  switch (status) {
    case "Resolved":
      return { color: "text-green-600", bg: "bg-green-100", icon: <FaCheckCircle /> };
    case "Rejected":
      return { color: "text-red-600", bg: "bg-red-100", icon: <FaTimesCircle /> };
    default:
      return { color: "text-yellow-600", bg: "bg-yellow-100", icon: <FaClock /> };
  }
};

export default function AllComplaints() {
  const dispatch = useDispatch();
  const complaints = useSelector((state) => state.complaints.list);

  const [selected, setSelected] = useState(null); // complaint object currently open in drawer
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [filter, setFilter] = useState("All");

  const openDrawer = (complaint) => {
    setSelected(complaint);
    setMessage(complaint.adminResponse || "");
    setStatus(complaint.status);
  };

  const closeDrawer = () => {
    setSelected(null);
    setMessage("");
  };

  const handleSend = () => {
    if (!selected || message.trim() === "") return;
    dispatch(
      addResponse({
        id: selected.id,
        message: message.trim(),
        status,
      })
    );
    closeDrawer();
  };

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="p-4 md:p-6 relative">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">All Complaints</h1>
          <p className="text-gray-500">
            Review student complaints and send a response.
          </p>
        </div>

        <div className="flex gap-2">
          {["All", "In Progress", "Resolved", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                filter === f
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-2">Student PRN</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y">
          {filteredComplaints.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No complaints found for this filter.
            </div>
          ) : (
            filteredComplaints.map((c) => {
              const s = getStatus(c.status);
              return (
                <div
                  key={c.id}
                  className="grid grid-cols-2 md:grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition"
                >
                  <div className="hidden md:block col-span-1 text-gray-400 text-sm">
                    #C-{c.id}
                  </div>

                  <div className="col-span-2 md:col-span-3">
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-gray-400 md:hidden">
                      #C-{c.id}
                    </p>
                  </div>

                  <div className="hidden md:block col-span-2 text-gray-600 text-sm">
                    {c.stdPRN}
                  </div>

                  <div className="hidden md:block col-span-2 text-gray-600 text-sm">
                    {c.category}
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}
                    >
                      {s.icon}
                      {c.status}
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button
                      onClick={() => openDrawer(c)}
                      className="text-violet-600 font-medium text-sm hover:underline"
                    >
                      {c.adminResponse ? "Edit Response" : "Respond"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Side Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h2 className="font-semibold text-lg">Complaint #C-{selected.id}</h2>
                <button
                  onClick={closeDrawer}
                  className="text-gray-400 hover:text-gray-700 transition"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Title</p>
                  <p className="font-medium">{selected.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Student PRN</p>
                    <p>{selected.stdPRN}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Category</p>
                    <p>{selected.category}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Description</p>
                  <p className="text-gray-600 text-sm mt-1">{selected.description}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Filed On</p>
                  <p>{selected.date}</p>
                </div>

                <hr />

                <div>
                  <label className="text-xs text-gray-400 uppercase font-medium">
                    Update Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase font-medium">
                    Response Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Write a reply to the student..."
                    className="w-full mt-1 border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>

              <div className="px-5 py-4 border-t">
                <button
                  onClick={handleSend}
                  disabled={message.trim() === ""}
                  className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white font-medium py-2.5 rounded-lg hover:bg-violet-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="text-sm" />
                  Send Response
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}