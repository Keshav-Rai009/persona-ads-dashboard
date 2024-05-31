import React from "react";
import { Routes, Route } from "react-router-dom";
import Overview from "../Overview";
import LandingPage from "./LandingPage";
const AppRoutes = ({ data, isLoading, advertisers }) => {
  return (
    <div className="mt-16 ml-64 p-4 overflow-y-auto">
      <Routes>
        <Route exact path="/" element={<LandingPage key="landing-page" />} />
        <Route
          exact
          path="/overview"
          element={
            <Overview
              // data={data}
              // isLoading={isLoading}
              // advertisers={advertisers}
              key="overview"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
