import { createSlice } from "@reduxjs/toolkit";

const loadRequests = () => {
  try {
    const saved = localStorage.getItem("editRequests");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveRequests = (list) => {
  try {
    localStorage.setItem("editRequests", JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save edit requests:", err);
  }
};

const EditRequestSlice = createSlice({
  name: "editRequests",
  initialState: {
    list: loadRequests(), // { id, prn, studentName, field, oldValue, newValue, status, date }
  },
  reducers: {
    // Student raises a ticket to change name / email / mobile / age
    raiseRequest: (state, action) => {
      const { prn, studentName, field, oldValue, newValue } = action.payload;

      state.list.unshift({
        id: Date.now(),
        prn,
        studentName,
        field, // "name" | "email" | "mobile" | "age"
        oldValue,
        newValue,
        status: "Pending", // "Pending" | "Approved" | "Rejected"
        date: new Date().toISOString().split("T")[0],
      });
      saveRequests(state.list);
    },

    approveRequest: (state, action) => {
      const req = state.list.find((r) => r.id === action.payload);
      if (!req) return;
      req.status = "Approved";
      saveRequests(state.list);
    },

    rejectRequest: (state, action) => {
      const req = state.list.find((r) => r.id === action.payload);
      if (!req) return;
      req.status = "Rejected";
      saveRequests(state.list);
    },
  },
});

export const { raiseRequest, approveRequest, rejectRequest } =
  editRequestSlice.actions;
export default editRequestSlice.reducer;