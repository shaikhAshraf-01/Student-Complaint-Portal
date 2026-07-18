import { createSlice } from "@reduxjs/toolkit";

// TEMP mock DB — replace with real API calls later
const STUDENT_DB = [
  { prn: "283", fullName: "Ashraf  Shaikh" },
  { prn: "263", fullName: "Fahim  Yadgir" },
];
const ADMIN_CREDENTIALS = {
  username: "SOCMACS",
  password: "admin123",
};
const initialState = {
  registeredUsers: [], // { prn, fullName, password }
  currentUser: null,   // logged-in user (student or admin)
  role: null,           // "student" | "admin"
  verifiedStudent: null, // holds { prn, fullName } once verify succeeds
  loginError: "",
  verifyError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyStudent: (state, action) => {
      const { prn, fullName } = action.payload;
      state.verifyError = "";

      const match = STUDENT_DB.find(
        (s) =>
          s.prn.trim().toLowerCase() === prn.trim().toLowerCase() &&
          s.fullName.trim().toLowerCase() === fullName.trim().toLowerCase()
      );

      if (!match) {
        state.verifiedStudent = null;
        state.verifyError = "No matching student record found. Check your PRN and full name.";
        return;
      }

      const alreadyRegistered = state.registeredUsers.some(
        (u) => u.prn.trim().toLowerCase() === prn.trim().toLowerCase()
      );

      if (alreadyRegistered) {
        state.verifiedStudent = null;
        state.verifyError = "This student is already registered. Please log in instead.";
        return;
      }

      state.verifiedStudent = { prn, fullName };
    },

    registerUser: (state, action) => {
      const { password } = action.payload;
      if (!state.verifiedStudent) return;

      state.registeredUsers.push({
        ...state.verifiedStudent,
        password,
      });
      state.verifiedStudent = null;
      state.verifyError = "";
    },

    loginUser: (state, action) => {
      const { id, password, role } = action.payload;
      state.loginError = "";

       if (role === "admin") {
    if (
      id.trim().toLowerCase() !== ADMIN_CREDENTIALS.username.toLowerCase() ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      state.loginError = "Invalid admin username or password.";
      return;
    }

    state.currentUser = { username: id, role: "admin" };
    state.role = "admin";
    return;
  }
      const user = state.registeredUsers.find(
        (u) => u.prn.trim().toLowerCase() === id.trim().toLowerCase()
      );

      if (!user) {
        state.loginError = "No account found for this Roll Number. Please register first.";
        return;
      }
      if (user.password !== password) {
        state.loginError = "Incorrect password.";
        return;
      }

      state.currentUser = user;
      state.role = "student";
    },

    logout: (state) => {
      state.currentUser = null;
      state.role = null;
    },

    clearAuthErrors: (state) => {
      state.loginError = "";
      state.verifyError = "";
    },

    resetVerification: (state) => {
      state.verifiedStudent = null;
      state.verifyError = "";
    },
  },
});

export const {
  verifyStudent,
  registerUser,
  loginUser,
  logout,
  clearAuthErrors,
  resetVerification,
} = authSlice.actions;

export default authSlice.reducer;