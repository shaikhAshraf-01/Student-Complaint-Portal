import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";
import { addResponse } from "../../redux/slices/ComplaintSlice";
import ComplaintDetailDrawer from "./ComplaintDetailDrawer";
import ImageLightboxModal from "./ImageLightboxModal";

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

  const [selected, setSelected] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
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
      {/* Header & Filter */}
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

      {/* Main Table */}
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
                    <p className="text-xs text-gray-400 md:hidden">#C-{c.id}</p>
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
                      className="flex items-center gap-1.5 text-violet-600 font-medium text-sm hover:underline"
                    >
                      <FaEye className="text-xs" />
                      {c.adminResponse ? "View & Edit" : "View & Respond"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Side Drawer Component */}
      <ComplaintDetailDrawer
        selected={selected}
        onClose={closeDrawer}
        message={message}
        setMessage={setMessage}
        status={status}
        setStatus={setStatus}
        onSend={handleSend}
        onImageClick={(img) => setSelectedImage(img)}
      />

      {/* Lightbox Modal Component */}
      <ImageLightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}