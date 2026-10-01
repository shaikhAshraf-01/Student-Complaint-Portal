import { useState } from "react";
import { FaTimes, FaUserPlus } from "react-icons/fa";

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
  const INITIAL_STATE = {
    prn: "",
    fullName: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    dob: "",
    age: "",
    gender: "",
    department: "",
    year: "",
    division: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Full Name Validation: Sirf alphabets aur spaces allowed hain
    if (name === "fullName") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // 2. PRN Validation: Sirf numbers allowed hain
    if (name === "prn") {
      if (!/^\d*$/.test(value)) return;
    }

    // 3. Mobile Number Validation: Sirf numbers aur max 10 digits
    if (name === "mobile") {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    // 4. Age Validation: Sirf numbers aur max 2 digits
    if (name === "age") {
      if (!/^\d*$/.test(value) || value.length > 2) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.prn || !formData.fullName) {
      alert("Please fill PRN and Full Name");
      return;
    }

    // Full Mobile Number with Country Code
    const fullData = {
      ...formData,
      fullMobile: `${formData.countryCode} ${formData.mobile}`,
    };

    onAdd(fullData);
    handleClose();
  };

  const handleClose = () => {
    setFormData(INITIAL_STATE);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <div className="flex items-center gap-2">
            <FaUserPlus className="text-violet-600 text-lg" />
            <h2 className="text-xl font-bold text-gray-800">Add New Student</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-700 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">PRN No. *</label>
              <input
                type="text"
                name="prn"
                required
                value={formData.prn}
                 minLength={6}
                 maxLength={14}
                onChange={handleChange}
                placeholder="e.g. 284"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                          maxLength={32}
                onChange={handleChange}
                placeholder="Student Name"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                          maxLength={32}
                onChange={handleChange}
                placeholder="student@example.com"
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            {/* Mobile with Country Code Selector */}
            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Mobile</label>
              <div className="flex gap-1 mt-1">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                >
                  <option value="+91">+91 (IN)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AU)</option>
                  <option value="+971">+971 (UAE)</option>
                </select>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10 digit number"
                   minLength={10}
                  maxLength={10}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 21"
                maxLength={2}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
              >
                <option value="">Select</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="BCOM">BCOM</option>
                <option value="BA">BA</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Year of Study</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="FY / SY / TY"
                maxLength={4}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase font-medium">Division</label>
              <input
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
                placeholder="A / B / C / D"
                maxLength={2}
                className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-violet-600 text-white font-medium text-sm rounded-lg hover:bg-violet-700 transition"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}