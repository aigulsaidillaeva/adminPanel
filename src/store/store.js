import { configureStore } from "@reduxjs/toolkit";

import applicationSlice from "./slices/applicationSlice";
import bannerSlice from "./slices/bannerSlice";

export const store = configureStore({
  reducer: {
    banners: bannerSlice,
    applications: applicationSlice,
  },
});
