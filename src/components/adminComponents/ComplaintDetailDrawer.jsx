import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaImage } from "react-icons/fa";

const STATUS_OPTIONS = ["In Progress", "Resolved", "Rejected"];

export default function ComplaintDetailDrawer({
  selected,
  onClose,
  message,
  setMessage,
  status,
  setStatus,
  onSend,
  onImageClick,
}) {
  return (
    <AnimatePresence>
      {selected && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="font-semibold text-lg">
                Complaint #C-{selected.id}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Title</p>
                <p className="font-medium text-gray-800">{selected.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Student PRN</p>
                  <p className="text-gray-700 font-medium">{selected.stdPRN}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Category</p>
                  <p className="text-gray-700">{selected.category}</p>
                </div>
              </div>

              {selected.location && (
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Location</p>
                  <p className="text-gray-700">{selected.location}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Description</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selected.description}
                </p>
              </div>

              {/* Uploaded Documents / Images */}
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-2">
                  Attached Images / Media
                </p>
                {selected.documents && selected.documents.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selected.documents.map((doc, idx) => {
                      const isObject = typeof doc === "object";
                      const isImage = isObject && doc.url?.startsWith("data:image");

                      return isImage ? (
                        <button
                          key={idx}
                          onClick={() => onImageClick(doc)}
                          className="group relative border border-slate-200 hover:border-violet-500 rounded-lg overflow-hidden transition"
                          title="Click to view full image"
                        >
                          <img
                            src={doc.url}
                            alt={doc.name || `Attachment ${idx + 1}`}
                            className="w-16 h-16 object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
                        </button>
                      ) : (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs bg-slate-100 text-slate-700 px-3 py-2 rounded-lg border border-slate-200"
                        >
                          <FaImage className="text-slate-400" />
                          <span className="truncate max-w-[150px]">
                            {isObject ? doc.name : doc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No attachments uploaded.</p>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Filed On</p>
                <p className="text-sm text-gray-600">{selected.date}</p>
              </div>

              <hr />

              {/* Status Update */}
              <div>
                <label className="text-xs text-gray-400 uppercase font-medium">
                  Update Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Admin Response */}
              <div>
                <label className="text-xs text-gray-400 uppercase font-medium">
                  Response Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Write a reply to the student..."
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t bg-gray-50">
              <button
                onClick={onSend}
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
  );
}