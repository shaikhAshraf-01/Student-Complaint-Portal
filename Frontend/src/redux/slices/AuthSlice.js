import { createSlice } from "@reduxjs/toolkit";

// TEMP mock DB — replace with real API calls later
const STUDENT_DB = [
  { prn: "283", fullName: "Ashraf Shaikh" },
  { prn: "263", fullName: "Fahim Yadgir" },
];

const loadAdminCredentials = () => {
  try {
    const saved = localStorage.getItem("adminCredentials");
    return saved
      ? JSON.parse(saved)
      : { username: "SOCMACS", password: "admin123" };
  } catch {
    return { username: "SOCMACS", password: "admin123" };
  }
};

const saveAdminCredentials = (creds) => {
  try {
    localStorage.setItem("adminCredentials", JSON.stringify(creds));
  } catch (err) {
    console.error("Failed to save admin credentials:", err);
  }
};

// Seed data used only when nothing is in localStorage yet (first run / testing)
const DEFAULT_REGISTERED_USERS = [
  {
    prn: "283",
    fullName: "Ashraf Shaikh",
    studentId: "STU283",
    password: "student123",
    email: null,
    dob: "",
    age: "24",
    gender: "",
    mobile: "12345",
    department: "BCA",
    year: "TY",
    division: "D",
  },
  {
    prn: "263",
    fullName: "Fahim Yadgir",
    studentId: "STU263",
    password: "student123",
    email: null,
    dob: "",
    age: "24",
    gender: "",
    mobile: "98765",
    department: "BCA",
    year: "TY",
    division: "D",
  },
];

const loadRegisteredUsers = () => {
  try {
    const saved = localStorage.getItem("registeredUsers");
    return saved ? JSON.parse(saved) : DEFAULT_REGISTERED_USERS;
  } catch {
    return DEFAULT_REGISTERED_USERS;
  }
};

const saveRegisteredUsers = (users) => {
  try {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save registered users:", err);
  }
};

const loadCurrentUser = () => {
  try {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const loadRole = () => {
  try {
    return localStorage.getItem("role") || null;
  } catch {
    return null;
  }
};

const initialState = {
  registeredUsers: loadRegisteredUsers(), // full student profile objects
  adminCredentials: loadAdminCredentials(),
  currentUser: loadCurrentUser(),
  role: loadRole(),
  verifiedStudent: null,
  loginError: "",
  verifyError: "",
  passwordError: "",
  passwordSuccess: false,
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
        state.verifyError =
          "No matching student record found. Check your PRN and full name.";
        return;
      }

      const alreadyRegistered = state.registeredUsers.some(
        (u) => u.prn.trim().toLowerCase() === prn.trim().toLowerCase()
      );

      if (alreadyRegistered) {
        state.verifiedStudent = null;
        state.verifyError =
          "This student is already registered. Please log in instead.";
        return;
      }

      state.verifiedStudent = { prn, fullName };
    },

    // Registration now captures the full profile
    registerUser: (state, action) => {
      const {
        password,
        email = "",
        dob = "",
        age = "",
        gender = "",
        mobile = "",
        department = "",
        year = "",
        division = "",
      } = action.payload;

      if (!state.verifiedStudent) return;

      const newUser = {
        ...state.verifiedStudent, // prn, fullName
        studentId: `STU${state.verifiedStudent.prn}`,
        password,
        email,
        dob,
        age,
        gender,
        mobile,
        department,
        year,
        division,
      };

      state.registeredUsers.push(newUser);
      saveRegisteredUsers(state.registeredUsers);
      state.verifiedStudent = null;
      state.verifyError = "";
    },

    loginUser: (state, action) => {
      const { id, password, role } = action.payload;
      state.loginError = "";

      if (role === "admin") {
        if (
          id.trim().toLowerCase() !==
            state.adminCredentials.username.toLowerCase() ||
          password !== state.adminCredentials.password
        ) {
          state.loginError = "Invalid admin username or password.";
          return;
        }
        state.currentUser = { username: id, role: "admin" };
        state.role = "admin";
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        localStorage.setItem("role", "admin");
        return;
      }

      const user = state.registeredUsers.find(
        (u) => u.prn.trim().toLowerCase() === id.trim().toLowerCase()
      );

      if (!user) {
        state.loginError =
          "No account found for this Roll Number. Please register first.";
        return;
      }
      if (user.password !== password) {
        state.loginError = "Incorrect password.";
        return;
      }

      state.currentUser = user;
      state.role = "student";
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("role", "student");
    },

    logout: (state) => {
      state.currentUser = null;
      state.role = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("role");
    },

    clearAuthErrors: (state) => {
      state.loginError = "";
      state.verifyError = "";
      state.passwordError = "";
      state.passwordSuccess = false;
    },

    resetVerification: (state) => {
      state.verifiedStudent = null;
      state.verifyError = "";
    },

    // Student changes their own password directly — no ticket needed
    changePassword: (state, action) => {
      const { prn, oldPassword, newPassword } = action.payload;
      state.passwordError = "";
      state.passwordSuccess = false;

      const user = state.registeredUsers.find(
        (u) => u.prn.trim().toLowerCase() === prn.trim().toLowerCase()
      );

      if (!user) {
        state.passwordError = "User not found.";
        return;
      }
      if (user.password !== oldPassword) {
        state.passwordError = "Current password is incorrect.";
        return;
      }
      if (!newPassword || newPassword.trim() === "") {
        state.passwordError = "New password cannot be empty.";
        return;
      }

      user.password = newPassword;
      saveRegisteredUsers(state.registeredUsers);

      if (state.currentUser?.prn === prn) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      state.passwordSuccess = true;
    },

    // Admin changes their own login password
    changeAdminPassword: (state, action) => {
      const { oldPassword, newPassword } = action.payload;
      state.passwordError = "";
      state.passwordSuccess = false;

      if (oldPassword !== state.adminCredentials.password) {
        state.passwordError = "Current password is incorrect.";
        return;
      }
      if (!newPassword || newPassword.trim() === "") {
        state.passwordError = "New password cannot be empty.";
        return;
      }

      state.adminCredentials.password = newPassword;
      saveAdminCredentials(state.adminCredentials);
      state.passwordSuccess = true;
    },

    // Admin edits a student's field directly, or applies an approved ticket
    updateStudentField: (state, action) => {
      const { prn, field, value } = action.payload;
      const user = state.registeredUsers.find(
        (u) => u.prn.trim().toLowerCase() === prn.trim().toLowerCase()
      );
      if (!user) return;

      user[field] = value;
      saveRegisteredUsers(state.registeredUsers);

      if (state.currentUser?.prn === prn) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
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
  changePassword,
  changeAdminPassword,
  updateStudentField,
} = authSlice.actions;

export default authSlice.reducer;