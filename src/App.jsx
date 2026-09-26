import Login from "./pages/Login";
 {/* Student — files */}
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./components/studentComponents/StudentDashboard";
import AddComplaint from "./components/studentComponents/AddComplaint";
import StudentProfile from "./components/studentComponents/StudentProfile";
import Responses from "./components/studentComponents/Responses";
 {/* Admin — Files */}
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/adminComponents/AdminDashboard"
import AllComplaints from "./components/adminComponents/AllComplaints"
import AllStudents from "./components/adminComponents/AllStudents"
import AdminProfile from "./components/adminComponents/AdminProfile"
 {/*  protected route */}
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin — protected */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminDashboard/>}/>
           <Route path="allComplaints" element={<AllComplaints />} />
           <Route path="allStudents" element={<AllStudents />} />
           <Route path="adminProfile" element={<AdminProfile />} />

        </Route>
        </Route>

        {/* Student — protected, nested routes preserved */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="addComplaint" element={<AddComplaint />} />
            <Route path="responses" element={<Responses />} />
            <Route path="studentProfile" element={<StudentProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;