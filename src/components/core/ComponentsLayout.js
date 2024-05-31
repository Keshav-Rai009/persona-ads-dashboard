// src/components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import DashboardControls from "./DashboardControls";
import getIcon from "../../util/IconFactory";

const ComponentsLayout = ({ children }) => {
  console.log(children);
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardControls navIcon={getIcon("NAVICON")} />
      <Navbar></Navbar>
      <div className="flex-grow p-4 overflow-auto">{children}</div>
    </div>
  );
};

export default ComponentsLayout;
