import { useState } from "react";
import {
  FaUserCircle,
  FaIdBadge,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaPowerOff,
  FaKey,
  FaEdit,
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, changePassword } from "../../redux/slices/AuthSlice"; // adjust path if needed
import { raiseRequest } from "../../redux/slices/EditRequestSlice"; // adjust path if needed

const REQUESTABLE_FIELDS = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "mobile", label: "Mobile Number" },
  { key: "age", label: "Age" },
];

function StudentProfile() {
  const { currentUser, passwordError, passwordSuccess } = useSelector(
    (state) => state.auth
  );
  const myRequests = useSelector((state) =>
    state.editRequests.list.filter((r) => r.prn === currentUser.prn)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const infoItems = [
    { icon: FaIdBadge, label: "Student ID", value: currentUser.prn },
    {
      icon: FaGraduationCap,
      label: "Academic Info",
      value: `${currentUser.department || "—"} • Year ${currentUser.year || "—"}`,
      sub: `Division ${currentUser.division || "—"}  •  Age ${currentUser.age || "—"}`,
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: currentUser.email || "Not added yet",
    },
    {
      icon: FaPhone,
      label: "Mobile No.",
      value: currentUser.mobile || "Not added yet",
    },
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

          {/* Left: Avatar + identity */}
          <div className="flex flex-col items-center gap-3 lg:w-64 lg:shrink-0 lg:border-r lg:border-slate-100 lg:pr-8">
            <FaUserCircle className="text-8xl lg:text-9xl text-purple-200" />
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 text-center">
              {currentUser.fullName}
            </h2>
            <span className="text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
              Student
            </span>

            {/* Action buttons — desktop */}
            <div className="hidden lg:flex flex-col w-full gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition duration-300 font-medium text-sm"
              >
                <FaKey className="text-xs" />
                Change Password
              </button>
              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-white text-purple-700 border border-purple-200 py-2.5 rounded-md hover:bg-purple-50 transition duration-300 font-medium text-sm"
              >
                <FaEdit className="text-xs" />
                Request Info Change
              </button>
            </div>
          </div>

          {/* Right: Info grid */}
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

            {/* Action buttons — mobile/tablet */}
            <div className="lg:hidden flex flex-col gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition duration-300 font-medium text-sm"
              >
                <FaKey className="text-xs" />
                Change Password
              </button>
              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-white text-purple-700 border border-purple-200 py-2.5 rounded-md hover:bg-purple-50 transition duration-300 font-medium text-sm"
              >
                <FaEdit className="text-xs" />
                Request Info Change
              </button>
            </div>

            {/* Pending / past requests tracker */}
            {myRequests.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Your Change Requests
                </p>
                <div className="space-y-2">
                  {myRequests.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between text-sm bg-slate-50 border border-slate-100 rounded-lg px-3 py-2"
                    >
                      <span className="text-slate-600">
                        {REQUESTABLE_FIELDS.find((f) => f.key === r.field)?.label ||
                          r.field}
                        : <span className="font-medium">{r.newValue}</span>
                      </span>
                      <RequestStatusBadge status={r.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          prn={currentUser.prn}
          error={passwordError}
          success={passwordSuccess}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={(oldPassword, newPassword) =>
            dispatch(changePassword({ prn: currentUser.prn, oldPassword, newPassword }))
          }
        />
      )}

      {showTicketModal && (
        <RaiseTicketModal
          currentUser={currentUser}
          onClose={() => setShowTicketModal(false)}
          onSubmit={(field, newValue) =>
            dispatch(
              raiseRequest({
                prn: currentUser.prn,
                studentName: currentUser.fullName,
                field,
                oldValue: currentUser[field] || "",
                newValue,
              })
            )
          }
        />
      )}
    </div>
  );
}

function RequestStatusBadge({ status }) {
  const map = {
    Pending: { bg: "bg-amber-100", color: "text-amber-700", icon: <FaClock /> },
    Approved: { bg: "bg-green-100", color: "text-green-700", icon: <FaCheckCircle /> },
    Rejected: { bg: "bg-red-100", color: "text-red-700", icon: <FaTimesCircle /> },
  };
  const s = map[status] || map.Pending;
  return (
    <span
      className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}
    >
      {s.icon}
      {status}
    </span>
  );
}

function ChangePasswordModal({ prn, error, success, onClose, onSubmit }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (newPassword !== confirmPassword) {
      setLocalError("New password and confirm password do not match.");
      return;
    }
    onSubmit(oldPassword, newPassword);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-slate-500 font-medium">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {(localError || error) && (
            <p className="text-red-600 text-xs">{localError || error}</p>
          )}
          {success && !error && (
            <p className="text-green-600 text-xs">Password updated successfully.</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition font-medium text-sm mt-2"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

function RaiseTicketModal({ currentUser, onClose, onSubmit }) {
  const [field, setField] = useState("fullName");
  const [newValue, setNewValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newValue.trim() === "") return;
    onSubmit(field, newValue.trim());
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Request Info Change</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <FaTimes />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-3" />
            <p className="text-sm text-slate-600">
              Your request has been sent to the admin for approval.
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition text-sm font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-slate-500">
              Changes to your name, email, mobile number, or age must be approved
              by an admin. Submit a request below.
            </p>

            <div>
              <label className="text-xs text-slate-500 font-medium">Field to Change</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {REQUESTABLE_FIELDS.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-500 font-medium">
                Current Value
              </label>
              <input
                type="text"
                value={currentUser[field] || "—"}
                disabled
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 font-medium">
                Requested New Value
              </label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                required
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition font-medium text-sm mt-2"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default StudentProfile;