import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { admin, student } from "../assets/images";
import { useNavigate } from "react-router-dom";

// TEMP: mock "database" of valid students (used to verify identity during registration)
// Replace with a real API call, e.g. GET /api/students/verify?prn=...&name=...
const STUDENT_DB = [
  { prn: "283", fullName: "Ashraf Nabi Shaikh" },
  { prn: "263", fullName: "Fahim Shehenshah Yadgir" },
];

// TEMP: mock "database" of students who have completed registration
// Replace with a real API call, e.g. POST /api/auth/register, POST /api/auth/login
const REGISTERED_USERS = [
  // { prn: "2021001", fullName: "Rohan Sharma", password: "test123" }
];

const Login = () => {
  const [role, setRole] = useState("student");
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const navigate = useNavigate();

  // ---------- Login flow state ----------
  const [loginId, setLoginId] = useState(""); // roll number / username
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // ---------- Register flow state ----------
  const [prn, setPrn] = useState("");
  const [fullName, setFullName] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // ---------- Handlers ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (role === "admin") {
      // TODO: replace with real admin auth check
      navigate("/admin");
      return;
    }

    // Student login — check against registered users
    const user = REGISTERED_USERS.find(
      (u) => u.prn.trim().toLowerCase() === loginId.trim().toLowerCase()
    );

    if (!user) {
      setLoginError("No account found for this Roll Number. Please register first.");
      return;
    }

    if (user.password !== loginPassword) {
      setLoginError("Incorrect password.");
      return;
    }

    navigate("/student");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setVerifyError("");

    const match = STUDENT_DB.find(
      (s) =>
        s.prn.trim().toLowerCase() === prn.trim().toLowerCase() &&
        s.fullName.trim().toLowerCase() === fullName.trim().toLowerCase()
    );

    if (!match) {
      setIsVerified(false);
      setVerifyError("No matching student record found. Check your PRN and full name.");
      return;
    }

    const alreadyRegistered = REGISTERED_USERS.some(
      (u) => u.prn.trim().toLowerCase() === prn.trim().toLowerCase()
    );

    if (alreadyRegistered) {
      setIsVerified(false);
      setVerifyError("This student is already registered. Please log in instead.");
      return;
    }

    setIsVerified(true);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setVerifyError("");

    if (password.length < 6) {
      setVerifyError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setVerifyError("Passwords do not match.");
      return;
    }

    // TODO: replace with real API call, e.g. POST /api/auth/register
    REGISTERED_USERS.push({ prn, fullName, password });

    setRegisterSuccess(true);

    // Briefly show success, then send them to login with PRN pre-filled
    setTimeout(() => {
      setLoginId(prn);
      switchAuthMode("login");
      setRegisterSuccess(false);
    }, 1200);
  };

  const resetAuthState = () => {
    setPrn("");
    setFullName("");
    setIsVerified(false);
    setVerifyError("");
    setPassword("");
    setConfirmPassword("");
    setRegisterSuccess(false);
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
    setLoginError("");
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

                {verifyError && (
                  <p className="text-sm text-red-600">{verifyError}</p>
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