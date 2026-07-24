import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserGraduate,
  FaPen,
  FaSave,
} from "react-icons/fa";
import { updateStudentField } from "../../redux/slices/AuthSlice"; // adjust path
import { approveRequest, rejectRequest } from "../../redux/slices/EditRequestSlice"; // adjust path

// Maps a ticket "field" key to a friendly label
const FIELD_LABELS = {
  fullName: "Full Name",
  email: "Email",
  mobile: "Mobile Number",
  age: "Age",
};

export default function AllStudents() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.auth.registeredUsers);
  const requests = useSelector((state) => state.editRequests.list);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});

  const openStudent = (s) => {
    setSelected(s);
    setEditMode(false);
    setEditForm({
      fullName: s.fullName || "",
      email: s.email || "",
      mobile: s.mobile || "",
      dob: s.dob || "",
      age: s.age || "",
      gender: s.gender || "",
      department: s.department || "",
      year: s.year || "",
      division: s.division || "",
    });
  };

  const closeDrawer = () => {
    setSelected(null);
    setEditMode(false);
  };

  const handleFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdits = () => {
    if (!selected) return;
    Object.entries(editForm).forEach(([field, value]) => {
      if (value !== (selected[field] || "")) {
        dispatch(updateStudentField({ prn: selected.prn, field, value }));
      }
    });
    setSelected({ ...selected, ...editForm });
    setEditMode(false);
  };

  const filteredStudents = students.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.prn?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.department?.toLowerCase().includes(q)
    );
  });

  const pendingRequests = requests.filter((r) => r.status === "Pending");

  const studentRequests = (prn) =>
    requests.filter((r) => r.prn === prn).sort((a, b) => (a.date < b.date ? 1 : -1));

  const handleApprove = (req) => {
    dispatch(
      updateStudentField({
        prn: req.prn,
        field: req.field,
        value: req.newValue,
      })
    );
    dispatch(approveRequest(req.id));
  };

  const handleReject = (req) => {
    dispatch(rejectRequest(req.id));
  };

  return (
    <div className="p-4 md:p-6 relative">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">All Students</h1>
          <p className="text-gray-500">
            View student records and manage edit requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pendingRequests.length > 0 && (
            <span className="flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <FaClock className="text-[10px]" />
              {pendingRequests.length} pending request
              {pendingRequests.length > 1 ? "s" : ""}
            </span>
          )}

          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, PRN, email..."
              className="pl-9 pr-3 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">PRN</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Email</div>
          <div className="col-span-2">Mobile</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-1">Division</div>
          <div className="col-span-1 text-right">Details</div>
        </div>

        <div className="divide-y">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No students found.
            </div>
          ) : (
            filteredStudents.map((s) => {
              const hasPending = requests.some(
                (r) => r.prn === s.prn && r.status === "Pending"
              );
              return (
                <div
                  key={s.prn}
                  className="grid grid-cols-2 md:grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition"
                >
                  <div className="hidden md:block col-span-1 text-gray-600 text-sm">
                    {s.prn}
                  </div>

                  <div className="col-span-2">
                    <p className="font-medium flex items-center gap-2">
                      {s.fullName}
                      {hasPending && (
                        <span className="w-2 h-2 rounded-full bg-amber-500" title="Pending request" />
                      )}
                    </p>
                    <p className="text-xs text-gray-400 md:hidden">
                      PRN: {s.prn}
                    </p>
                  </div>

                  <div className="hidden md:block col-span-2 text-gray-600 text-sm truncate">
                    {s.email || "—"}
                  </div>

                  <div className="hidden md:block col-span-2 text-gray-600 text-sm">
                    {s.mobile || "—"}
                  </div>

                  <div className="hidden md:block col-span-2 text-gray-600 text-sm uppercase">
                    {s.department || "—"}
                  </div>

                  <div className="hidden md:block col-span-1 text-gray-600 text-sm">
                    {s.year || "—"}
                  </div>

                  <div className="hidden md:block col-span-1 text-gray-600 text-sm">
                    {s.division || "—"}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => openStudent(s)}
                      className="text-violet-600 font-medium text-sm hover:underline"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Side Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <div className="flex items-center gap-2">
                  <FaUserGraduate className="text-violet-600" />
                  <h2 className="font-semibold text-lg">{selected.fullName}</h2>
                </div>
                <div className="flex items-center gap-3">
                  {editMode ? (
                    <button
                      onClick={handleSaveEdits}
                      className="flex items-center gap-1.5 text-green-600 text-sm font-medium hover:underline"
                    >
                      <FaSave className="text-xs" />
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-1.5 text-violet-600 text-sm font-medium hover:underline"
                    >
                      <FaPen className="text-xs" />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={closeDrawer}
                    className="text-gray-400 hover:text-gray-700 transition"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                {/* Profile details */}
                {editMode ? (
                  <div className="grid grid-cols-2 gap-4">
                    <ReadOnlyField label="Student ID" value={selected.studentId} />
                    <ReadOnlyField label="PRN No." value={selected.prn} />
                    <EditField
                      label="Full Name"
                      value={editForm.fullName}
                      onChange={(v) => handleFormChange("fullName", v)}
                    />
                    <EditField
                      label="Email"
                      value={editForm.email}
                      onChange={(v) => handleFormChange("email", v)}
                    />
                    <EditField
                      label="Mobile"
                      value={editForm.mobile}
                      onChange={(v) => handleFormChange("mobile", v)}
                    />
                    <EditField
                      label="Date of Birth"
                      type="date"
                      value={editForm.dob}
                      onChange={(v) => handleFormChange("dob", v)}
                    />
                    <EditField
                      label="Age"
                      type="number"
                      value={editForm.age}
                      onChange={(v) => handleFormChange("age", v)}
                    />
                    <div>
                      <label className="text-xs text-gray-400 uppercase font-medium">
                        Gender
                      </label>
                      <select
                        value={editForm.gender}
                        onChange={(e) => handleFormChange("gender", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase font-medium">
                        Department
                      </label>
                      <select
                        value={editForm.department}
                        onChange={(e) => handleFormChange("department", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      >
                        <option value="">Select</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                        <option value="BCOM">BCOM</option>
                        <option value="BA">BA</option>
                      </select>
                    </div>
                    <EditField
                      label="Year of Study"
                      value={editForm.year}
                      onChange={(v) => handleFormChange("year", v)}
                    />
                    <EditField
                      label="Division"
                      value={editForm.division}
                      onChange={(v) => handleFormChange("division", v)}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Student ID" value={selected.studentId} />
                    <Field label="PRN No." value={selected.prn} />
                    <Field label="Email" value={selected.email} />
                    <Field label="Mobile" value={selected.mobile} />
                    <Field label="Date of Birth" value={selected.dob} />
                    <Field label="Age" value={selected.age} />
                    <Field label="Gender" value={selected.gender} />
                    <Field label="Department" value={selected.department} />
                    <Field label="Year of Study" value={selected.year} />
                    <Field label="Division" value={selected.division} />
                  </div>
                )}

                <hr />

                {/* Edit requests for this student */}
                <div>
                  <p className="text-sm font-semibold mb-3">Edit Requests</p>

                  {studentRequests(selected.prn).length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No edit requests from this student.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {studentRequests(selected.prn).map((req) => (
                        <div
                          key={req.id}
                          className="border rounded-lg p-3 text-sm"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">
                              {FIELD_LABELS[req.field] || req.field}
                            </span>
                            <StatusBadge status={req.status} />
                          </div>
                          <p className="text-gray-500 text-xs mb-1">
                            {req.date}
                          </p>
                          <p className="text-gray-600">
                            <span className="line-through text-gray-400">
                              {req.oldValue || "—"}
                            </span>
                            {"  →  "}
                            <span className="font-medium">{req.newValue}</span>
                          </p>

                          {req.status === "Pending" && (
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => handleApprove(req)}
                                className="flex-1 bg-green-600 text-white text-xs font-medium py-1.5 rounded-md hover:bg-green-700 transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(req)}
                                className="flex-1 bg-red-100 text-red-600 text-xs font-medium py-1.5 rounded-md hover:bg-red-200 transition"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase font-medium">{label}</p>
      <p className="text-sm mt-0.5">{value || "—"}</p>
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase font-medium">{label}</p>
      <p className="text-sm mt-1 text-gray-400">{value || "—"}</p>
    </div>
  );
}

function EditField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs text-gray-400 uppercase font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
    </div>
  );
}

function StatusBadge({ status }) {
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