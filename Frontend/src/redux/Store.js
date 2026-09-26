import { configureStore } from "@reduxjs/toolkit";
import complaintsReducer from "./slices/ComplaintSlice";
import authReducer from "./slices/AuthSlice"
import editRequestReducer from "./slices/EditRequestSlice"

export const store = configureStore({
  reducer: {
    // This key "complaints" matches what you call in useSelector((state) => state.complaints.list)
    complaints: complaintsReducer,
    auth: authReducer,
    editRequests: editRequestReducer,
  },
});
