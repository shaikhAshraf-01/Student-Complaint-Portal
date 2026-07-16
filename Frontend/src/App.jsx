import Login from "./pages/Login";
import AdminLayout from "./layouts/adminLayout";
import StudentLayout from "./layouts/studentLayout";
import StudentDashboard from "./components/studentComponents/StudentDashboard";
import AddComplaint from "./components/studentComponents/AddComplaint";
import StudentProfile from "./components/studentComponents/StudentProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />

          <Route path="addComplaint" element={<AddComplaint />} />
          <Route path="studentProfile" element={<StudentProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
