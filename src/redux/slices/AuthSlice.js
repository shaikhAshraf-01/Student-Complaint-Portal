import { createSlice } from "@reduxjs/toolkit";

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

// Seed initial data if localStorage is empty
const DEFAULT_REGISTERED_USERS = [
  {
    prn: "283",
    fullName: "Ashraf Shaikh",
    studentId: "STU283",
    password: "student123",
    email: "ashraf@example.com",
    dob: "2000-01-01",
    age: "24",
    gender: "Male",
    mobile: "1234567890",
    department: "BCA",
    year: "TY",
    division: "D",
    isRegistered: true,
  },
  {
    prn: "263",
    fullName: "Fahim Yadgir",
    studentId: "STU263",
    password: "student123",
    email: "fahim@example.com",
    dob: "2000-01-01",
    age: "24",
    gender: "Male",
    mobile: "9876543210",
    department: "BCA",
    year: "TY",
    division: "D",
    isRegistered: true,
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
  registeredUsers: loadRegisteredUsers(), // Contains all students added by admin / registered
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
    // 1. Admin Adds / Creates a Student
    registerUser: (state, action) => {
      const studentData = action.payload;

      const existingIndex = state.registeredUsers.findIndex(
        (u) => u.prn.trim().toLowerCase() === studentData.prn.trim().toLowerCase()
      );

      if (existingIndex !== -1) {
        // Update existing record
        state.registeredUsers[existingIndex] = {
          ...state.registeredUsers[existingIndex],
          ...studentData,
        };
      } else {
        // Add new student record
        const newUser = {
          ...studentData,
          studentId: `STU${studentData.prn}`,
          isRegistered: false, // Student has not set password yet
          password: "",
        };
        state.registeredUsers.push(newUser);
      }

      saveRegisteredUsers(state.registeredUsers);
    },

    // 2. Student Verifies PRN & Full Name on Register Tab
    verifyStudent: (state, action) => {
      const { prn, fullName } = action.payload;
      state.verifyError = "";

      const match = state.registeredUsers.find(
        (s) =>
          s.prn.trim().toLowerCase() === prn.trim().toLowerCase() &&
          s.fullName.trim().toLowerCase() === fullName.trim().toLowerCase()
      );

      if (!match) {
        state.verifiedStudent = null;
        state.verifyError =
          "No matching student record found. Enter the PRN and Full Name added by Admin.";
        return;
      }

      if (match.isRegistered && match.password) {
        state.verifiedStudent = null;
        state.verifyError =
          "This student is already registered. Please log in instead.";
        return;
      }

      state.verifiedStudent = match;
    },

    // 3. Student Creates Password and Completes Registration
    completeStudentRegistration: (state, action) => {
      const { password } = action.payload;
      if (!state.verifiedStudent) return;

      const user = state.registeredUsers.find(
        (u) =>
          u.prn.trim().toLowerCase() ===
          state.verifiedStudent.prn.trim().toLowerCase()
      );

      if (user) {
        user.password = password;
        user.isRegistered = true;
        saveRegisteredUsers(state.registeredUsers);
      }

      state.verifiedStudent = null;
      state.verifyError = "";
    },

    // 4. Login Function
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

      // Student Login
      const user = state.registeredUsers.find(
        (u) => u.prn.trim().toLowerCase() === id.trim().toLowerCase()
      );

      if (!user) {
        state.loginError =
          "No record found for this PRN / Roll Number. Please register first.";
        return;
      }

      if (!user.isRegistered || !user.password) {
        state.loginError =
          "Account not active yet. Please go to Register tab to create your password.";
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
  completeStudentRegistration,
  loginUser,
  logout,
  clearAuthErrors,
  resetVerification,
  changePassword,
  changeAdminPassword,
  updateStudentField,
} = authSlice.actions;

export default authSlice.reducer;