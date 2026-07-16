import { configureStore } from "@reduxjs/toolkit";
import complaintsReducer from "./slices/ComplaintSlice";

export const store = configureStore({
  reducer: {
    // This key "complaints" matches what you call in useSelector((state) => state.complaints.list)
    complaints: complaintsReducer,
  },
});
