import { configureStore } from "@reduxjs/toolkit";

import applicationSlice from "./slices/applicationSlice";
import BannerSlice from "./slices/bannerSlice";

export const store = configureStore({
  reducer: {
    banners: BannerSlice,
    applications: applicationSlice,
  },
});
