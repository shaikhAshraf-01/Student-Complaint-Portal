import { useState } from "react";
import { stdlogin, adminlogin } from "../assets/images";

const Login = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left Side */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
        <div>
            {role === "student" ? (<>
              <img src={stdlogin} alt="Student Login" className="mb-6 w-64" />
          <h1 className="text-4xl font-bold">Student Complaint Portal</h1>
          <p className="mt-4 text-lg">
            Raise complaints, track status, and communicate with the administration.
          </p>
          </>
            ) : (<>
              <img src={adminlogin} alt="Admin Login" className="mb-6 w-64" />
               <h1 className="text-4xl font-bold">Admin Portal</h1>
          <p className="mt-4 text-lg">
            Manage complaints, update status, and communicate with the students.
          </p>
          </>
            )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold">
            {role === "student" ? "Student Login" : "Admin Login"}
          </h2>

          {/* Role Switch */}
          <div className="mb-6 flex rounded-lg bg-gray-200 p-1">
            <button
              onClick={() => setRole("student")}
              className={`w-1/2 rounded-md py-2 font-medium transition ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700"
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`w-1/2 rounded-md py-2 font-medium transition ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700"
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
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;