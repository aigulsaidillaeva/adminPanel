import React from "react";
import { Routes, Route, Navigate } from "react-router";
import MainLayout from "../layout/MainLayout";
import BannerPage from "../pages/BannerPage";
import BannerDetail from "../pages/BannerDetail";
import ApplicationPage from "../pages/ApplicationPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="banner" />} />
        <Route path="banner" element={<BannerPage />} />
        <Route path="banner/:id" element={<BannerDetail />} />

        <Route path="application" element={<ApplicationPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
