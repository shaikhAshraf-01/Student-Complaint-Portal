import { useState } from "react";
import { motion } from "framer-motion";
import { stdlogin, adminlogin } from "../assets/images";

const Login = () => {
  const [role, setRole] = useState("student");

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
              <img
                src={stdlogin}
                alt="Student Login"
                className="mb-6 w-64"
              />
              <h1 className="text-4xl font-bold">
                Student Complaint Portal
              </h1>
              <p className="mt-4 text-lg">
                Raise complaints, track status, and communicate with the
                administration.
              </p>
            </>
          ) : (
            <>
              <img
                src={adminlogin}
                alt="Admin Login"
                className="mb-6 w-64"
              />
              <h1 className="text-4xl font-bold">Admin Portal</h1>
              <p className="mt-4 text-lg">
                Manage complaints, update status, and communicate with students.
              </p>
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
            {role === "student" ? "Student Login" : "Admin Login"}
          </h2>

          {/* Role Switch */}
          <div className="mb-6 flex rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setRole("student")}
              className={`w-1/2 rounded-md py-2 font-medium transition-all duration-300 ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`w-1/2 rounded-md py-2 font-medium transition-all duration-300 ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              Admin
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                {role === "student" ? "Roll Number" : "Username"}
              </label>

              <input
                type="text"
                placeholder={
                  role === "student"
                    ? "Enter Roll Number"
                    : "Enter Username"
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
                placeholder="Enter Password"
                className="w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;