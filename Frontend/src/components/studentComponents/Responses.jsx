import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEnvelopeOpenText,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { markResponseSeen } from "../../redux/slices/ComplaintSlice"; // adjust path to your slice

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

  // Only this student's complaints that have actually received a response
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

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow border p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-400 text-sm">
                      Complaint ID: #C-{item.id}
                    </p>
                  </div>

                  {item.isNewResponse && (
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  )}
                </div>

                {isOpen && (
                  <p className="text-gray-600 mt-4">{item.adminResponse}</p>
                )}

                <div className="flex flex-wrap items-center justify-between mt-5 gap-3">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} ${status.color}`}
                  >
                    {status.icon}
                    <span>{item.status}</span>
                  </div>

                  <span className="text-sm text-gray-500">
                    {item.respondedAt}
                  </span>
                </div>

                <button
                  onClick={() => handleToggle(item)}
                  className="mt-5 flex items-center gap-2 text-violet-600 font-medium hover:underline"
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
    </div>
  );
}