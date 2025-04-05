import { configureStore } from "@reduxjs/toolkit";
import bannersSlice from "./slices/bannersSlice";
import applicationsSlice from "./slices/applicationsSlice";

export const store = configureStore({
  reducer: {
    banners: bannersSlice,
    applications: applicationsSlice,
  },
});
