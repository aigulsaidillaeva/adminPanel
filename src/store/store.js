import { configureStore } from "@reduxjs/toolkit";

import bannerSlice from "./slices/bannerSlice";
import applicationSlice from "./slices/applicationSlice";

export const store = configureStore({
  reducer: {
    banners: bannerSlice,
    applications: applicationSlice,
  },
});
