import { useState } from "react";
import {
  FaUserShield,
  FaIdBadge,
  FaPowerOff,
  FaKey,
  FaTimes,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, changeAdminPassword } from "../../redux/slices/AuthSlice"; // adjust path if needed

function AdminProfile() {
  const { currentUser, passwordError, passwordSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen md:h-screen overflow-visible md:overflow-auto px-4 py-6 md:px-10 md:py-6 bg-slate-50 flex flex-col">
      <header className="border-b border-slate-400 pb-2 shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-purple-700 font-bold">Admin Profile</h1>
          <p>View your account information</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="md:hidden flex items-center gap-2 text-red-700 hover:text-white hover:bg-rose-600 border border-rose-200 px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium shrink-0"
        >
          <FaPowerOff className="text-sm" />
          Logout
        </button>
      </header>

      <div className="flex-1 flex items-start md:items-center justify-center mt-6 md:mt-0">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 lg:p-10 flex flex-col items-center gap-3">
          <FaUserShield className="text-8xl text-purple-200" />

          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 text-center">
            {currentUser.username}
          </h2>
          <span className="text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
            Admin
          </span>

          <div className="w-full flex items-center gap-3 mt-6 py-3.5 border-t border-b border-slate-100">
            <div className="flex items-center justify-center w-9 h-9 bg-purple-50 rounded-lg text-purple-600 shrink-0">
              <FaIdBadge className="text-sm" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                Username
              </span>
              <span className="text-sm font-semibold text-slate-800 truncate">
                {currentUser.username}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-purple-700 text-white py-2.5 rounded-md hover:bg-purple-800 transition duration-300 font-medium text-sm mt-4"
          >
            <FaKey className="text-xs" />
            Change Password
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden md:flex w-full items-center justify-center gap-2 text-red-700 hover:text-white hover:bg-rose-600 border border-rose-200 py-2.5 rounded-md transition-colors duration-200 font-medium text-sm"
          >
            <FaPowerOff className="text-xs" />
            Logout
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <ChangePasswordModal
          error={passwordError}
          success={passwordSuccess}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={(oldPassword, newPassword) =>
            dispatch(changeAdminPassword({ oldPassword, newPassword }))
          }
        />
      )}
    </div>
  );
}

function ChangePasswordModal({ error, success, onClose, onSubmit }) {
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

export default AdminProfile;