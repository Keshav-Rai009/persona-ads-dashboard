import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DashboardControls from "./components/core/DashboardControls";
import Navbar from "./components/core/Navbar";
import React from "react";
import AppRoutes from "./components/core/AppRoutes";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="flex h-full">
          <DashboardControls></DashboardControls>
          <div className="flex flex-col w-full">
            <Navbar></Navbar>
            <AppRoutes></AppRoutes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
