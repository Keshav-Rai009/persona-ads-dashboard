import React from "react";
import { Routes, Route } from "react-router-dom";
import Overview from "../Overview";
import LandingPage from "../LandingPage";
import AdAnalytics from "../analytics/AdAnalytics";
const AppRoutes = () => {
  return (
    <div className="mt-16 ml-64 p-4 overflow-y-auto">
      <Routes>
        <Route exact path="/" element={<LandingPage key="landing-page" />} />
        <Route exact path="/overview" element={<Overview key="overview" />} />
        <Route path="/analytics" element={<AdAnalytics />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
