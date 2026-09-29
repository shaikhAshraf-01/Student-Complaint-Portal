import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEnvelopeOpenText,
  FaChevronRight,
  FaChevronDown,
  FaTimes,
  FaImage,
} from "react-icons/fa";
import { markResponseSeen } from "../../redux/slices/ComplaintSlice";

const getStatus = (status) => {
  switch (status) {
    case "Resolved":
      return {
        color: "text-green-600",
        bg: "bg-green-100",
        icon: <FaCheckCircle />,
      };

    case "Rejected":
      return {
        color: "text-red-600",
        bg: "bg-red-100",
        icon: <FaTimesCircle />,
      };

    default:
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        icon: <FaClock />,
      };
  }
};

export default function Responses() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allComplaints = useSelector((state) => state.complaints.list);

  const [openId, setOpenId] = useState(null);

  // Selected image state for Popup / Modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter complaints having admin responses
  const responses = allComplaints.filter(
    (c) =>
      c.stdPRN === currentUser?.prn &&
      c.adminResponse &&
      c.adminResponse.trim() !== ""
  );

  const handleToggle = (item) => {
    const isOpening = openId !== item.id;
    setOpenId(isOpening ? item.id : null);
    if (isOpening && item.isNewResponse) {
      dispatch(markResponseSeen(item.id));
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Responses</h1>
        <p className="text-gray-500">
          View replies received from the administrator.
        </p>
      </div>

      {responses.length === 0 ? (
        <div className="bg-white rounded-xl shadow border p-8 text-center text-gray-500">
          No responses yet. You'll see admin replies here once your
          complaints are reviewed.
        </div>
      ) : (
        <div className="space-y-5">
          {responses.map((item) => {
            const status = getStatus(item.status);
            const isOpen = openId === item.id;

            // Extract image document if available
            const imageDoc = item.documents?.find((doc) =>
              typeof doc === "object" ? doc.url?.startsWith("data:image") : false
            );

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow border p-4 sm:p-5 hover:shadow-lg transition relative"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Complaint ID: #C-{item.id}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.isNewResponse && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
                        NEW
                      </span>
                    )}

                    {/* Right side Image Thumbnail Preview */}
                    {/* Right side Image Thumbnail or Placeholder */}
{imageDoc ? (
  <button
    onClick={() => setSelectedImage(imageDoc)}
    className="relative group border-2 border-purple-200 hover:border-purple-600 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0"
    title="Click to view attachment"
  >
    <img
      src={imageDoc.url}
      alt={imageDoc.name || "Attachment"}
      className="w-11 h-11 sm:w-12 sm:h-12 object-cover group-hover:scale-110 transition-transform duration-200"
    />
  </button>
) : (
  /* Fallback Icon when NO image is attached */
  <div 
    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-400 flex-shrink-0"
    title="No attachment"
  >
    <FaImage className="text-base sm:text-lg" />
    <span className="text-[9px] text-slate-400 mt-0.5">No Media</span>
  </div>
)}
                  </div>
                </div>

                {/* Response Message */}
                {isOpen && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {item.adminResponse}
                    </p>
                  </div>
                )}

                {/* Footer Section */}
                <div className="flex flex-wrap items-center justify-between mt-4 sm:mt-5 gap-3 pt-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${status.bg} ${status.color}`}
                  >
                    {status.icon}
                    <span>{item.status}</span>
                  </div>

                  {/* Date positioned below thumbnail / on right side */}
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    {item.respondedAt}
                  </span>
                </div>

                <button
                  onClick={() => handleToggle(item)}
                  className="mt-4 flex items-center gap-2 text-violet-600 font-medium text-sm sm:text-base hover:underline"
                >
                  <FaEnvelopeOpenText />
                  {isOpen ? "Hide Details" : "View Details"}
                  {isOpen ? (
                    <FaChevronDown className="text-xs" />
                  ) : (
                    <FaChevronRight className="text-xs" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Responsive Image Modal / Lightbox Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] p-2 sm:p-4 shadow-2xl flex flex-col items-center overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
          >
            {/* Header & Close Button */}
            <div className="w-full flex justify-between items-center pb-2 px-2 border-b border-gray-100">
              <span className="text-xs sm:text-sm font-medium text-gray-600 truncate max-w-[80%] flex items-center gap-2">
                <FaImage className="text-purple-600" />
                {selectedImage.name || "Attachment Preview"}
              </span>

              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="w-full flex-1 flex items-center justify-center overflow-auto p-2">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}