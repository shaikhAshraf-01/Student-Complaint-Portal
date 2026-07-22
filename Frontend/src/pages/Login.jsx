import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { admin, student } from "../assets/images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyStudent,
  registerUser,
  loginUser,
  clearAuthErrors,
  resetVerification,
} from "../redux/slices/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { verifiedStudent, currentUser, role: authRole, loginError, verifyError } =
    useSelector((state) => state.auth);

  const [role, setRole] = useState("student");
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  // ---------- Login flow state (UI only) ----------
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ---------- Register flow state (UI only) ----------
  const [prn, setPrn] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [localError, setLocalError] = useState(""); // for password length/match checks

  const isVerified = !!verifiedStudent;

  // ---------- Redirect once login actually succeeds ----------
  useEffect(() => {
    if (currentUser && authRole) {
      navigate(authRole === "admin" ? "/admin" : "/student");
    }
  }, [currentUser, authRole, navigate]);

  // ---------- Handlers ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAuthErrors());
    dispatch(loginUser({ id: loginId, password: loginPassword, role }));
  };

  const handleVerify = (e) => {
    e.preventDefault();
    dispatch(verifyStudent({ prn, fullName }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    // Regular expression to check for:
// (?=.*[A-Z]) -> At least one uppercase letter
// (?=.*\d)    -> At least one number
// (?=.*[!@#$%^&*(),.?":{}|<>]) -> At least one special character
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

if (!passwordRegex.test(password)) {
  setLocalError("Password must be at least 6 characters and include one uppercase letter, one number, and one special character.");
  return;
}

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    dispatch(registerUser({ password }));
    setRegisterSuccess(true);

    setTimeout(() => {
      setLoginId(prn);
      switchAuthMode("login");
      setRegisterSuccess(false);
    }, 1200);
  };

  const resetAuthState = () => {
    setPrn("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setRegisterSuccess(false);
    setLocalError("");
    dispatch(resetVerification());
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    resetAuthState();
  };

  const switchRole = (nextRole) => {
    setRole(nextRole);
    switchAuthMode("login");
    setLoginId("");
    setLoginPassword("");
    dispatch(clearAuthErrors());
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2 overflow-hidden">
      {/* Left Panel */}
      <motion.div
        layout
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`hidden md:flex items-center justify-center bg-blue-600 text-white p-10 ${
          role === "student" ? "md:order-1" : "md:order-2"
        }`}
      >
        <motion.div
          key={role}
          initial={{ opacity: 0, x: role === "student" ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {role === "student" ? (
            <>
              <h1 className="text-4xl font-bold">Student Complaint Portal</h1>
              <p className="mt-4 text-lg">
                Raise complaints, track status, and communicate with the
                administration.
              </p>
              <img
                src={student}
                alt="Student Login"
                className="mb-6 block mx-auto w-80 h-90"
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">Admin Portal</h1>
              <p className="mt-4 text-lg">
                Manage complaints, update status, and communicate with students.
              </p>
              <img
                src={admin}
                alt="Admin Login"
                className="mb-6 block mx-auto w-64"
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        layout
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`flex items-center justify-center bg-gray-100 p-6 ${
          role === "student" ? "md:order-2" : "md:order-1"
        }`}
      >
        <motion.div
          layout
          className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-center text-3xl font-bold">
            {role === "student"
              ? authMode === "login"
                ? "Student Login"
                : "Student Registration"
              : "Admin Login"}
          </h2>

          {/* Role Switch */}
          <div className="mb-6 flex rounded-lg bg-gray-200 p-1">
            <button
              type="button"
              onClick={() => switchRole("student")}
              className={`w-1/2 rounded-md py-2 font-medium transition-all duration-300 ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => switchRole("admin")}
              className={`w-1/2 rounded-md py-2 font-medium transition-all duration-300 ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

          {/* Login / Register tabs — students only */}
          {role === "student" && (
            <div className="mb-6 flex justify-center gap-6 border-b border-gray-200">
              <button
                type="button"
                onClick={() => switchAuthMode("login")}
                className={`pb-2 text-sm font-semibold transition-colors ${
                  authMode === "login"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchAuthMode("register")}
                className={`pb-2 text-sm font-semibold transition-colors ${
                  authMode === "register"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Register
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ---------- LOGIN FORM (admin, or student in login mode) ---------- */}
            {(role === "admin" || authMode === "login") && (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    {role === "student" ? "Roll Number" : "Username"}
                  </label>
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder={
                      role === "student" ? "Enter Roll Number" : "Enter Username"
                    }
                    className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {loginError && (
                  <p className="text-sm text-red-600">{loginError}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
                >
                  Login
                </motion.button>
              </motion.form>
            )}

            {/* ---------- REGISTER FORM (student only) ---------- */}
            {role === "student" && authMode === "register" && (
              <motion.form
                key="register-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                onSubmit={isVerified ? handleRegisterSubmit : handleVerify}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    PRN No.
                  </label>
                  <input
                    type="text"
                    value={prn}
                    onChange={(e) => setPrn(e.target.value)}
                    disabled={isVerified}
                    placeholder="Enter PRN Number"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isVerified}
                    placeholder="Enter Full Name"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                  />
                </div>

                {/* Password fields appear only after a successful match */}
                <AnimatePresence>
                  {isVerified && !registerSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <p className="text-sm font-medium text-green-600">
                        ✓ Student record verified. Set a password to continue.
                      </p>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Create Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter Password"
                          className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter Password"
                          className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {registerSuccess && (
                  <p className="text-sm font-medium text-green-600">
                    ✓ Registration complete! Redirecting to login…
                  </p>
                )}

                {(verifyError || localError) && (
                  <p className="text-sm text-red-600">{verifyError || localError}</p>
                )}

                {!registerSuccess && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
                  >
                    {isVerified ? "Complete Registration" : "Verify Details"}
                  </motion.button>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;