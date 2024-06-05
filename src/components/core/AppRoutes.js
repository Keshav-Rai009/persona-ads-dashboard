import React from "react";
import { Routes, Route } from "react-router-dom";
import Overview from "../Overview";
import LandingPage from "../LandingPage";
import AdAnalytics from "../analytics/AdAnalytics";
import EngagementReporter from "../reporting/EngagementReporter";
const AppRoutes = () => {
  return (
    <div className="mt-16 ml-64 p-4 overflow-y-auto max-[640px]:ml-12 transition-all duration-300 ease-in-out">
      <Routes>
        <Route exact path="/" element={<LandingPage key="landing-page" />} />
        <Route exact path="/overview" element={<Overview key="overview" />} />
        <Route path="/analytics" element={<AdAnalytics />} />
        <Route path="/reports" element={<EngagementReporter />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
