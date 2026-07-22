import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEnvelopeOpenText,
  FaChevronRight,
} from "react-icons/fa";

const responses = [
  {
    id: "#C-120",
    title: "Wi-Fi not working in Library",
    status: "Resolved",
    date: "22 Jul 2026",
    message: "The Wi-Fi router has been restarted. Please check again.",
    isNew: true,
  },
  {
    id: "#C-118",
    title: "Water Cooler not working",
    status: "In Progress",
    date: "21 Jul 2026",
    message: "Maintenance team has been assigned and inspection is in progress.",
    isNew: true,
  },
  {
    id: "#C-115",
    title: "Projector issue in Class 201",
    status: "Resolved",
    date: "20 Jul 2026",
    message: "The projector has been replaced successfully.",
    isNew: false,
  },
  {
    id: "#C-112",
    title: "Broken classroom fan",
    status: "Rejected",
    date: "19 Jul 2026",
    message: "The complaint could not be verified during inspection.",
    isNew: false,
  },
];
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
  return (
    <div className="p-4 md:p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Responses</h1>
        <p className="text-gray-500">
          View replies received from the administrator.
        </p>
      </div>

      <div className="space-y-5">

        {responses.map((item) => {

          const status = getStatus(item.status);

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow border p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">

                <div>

                  <h2 className="font-semibold text-lg">
                    {item.title}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Complaint ID : {item.id}
                  </p>

                </div>

                {item.isNew && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                    NEW
                  </span>
                )}

              </div>

              <p className="text-gray-600 mt-4">
                {item.message}
              </p>

              <div className="flex flex-wrap items-center justify-between mt-5 gap-3">

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} ${status.color}`}
                >
                  {status.icon}
                  <span>{item.status}</span>
                </div>

                <span className="text-sm text-gray-500">
                  {item.date}
                </span>

              </div>

              <button className="mt-5 flex items-center gap-2 text-violet-600 font-medium hover:underline">
                <FaEnvelopeOpenText />
                View Details
                <FaChevronRight className="text-xs" />
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
}