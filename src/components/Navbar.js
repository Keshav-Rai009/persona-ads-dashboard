import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getIcon from "../util/IconFactory";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-md fixed w-full
     top-0 z-10 left-64 max-[640px]:left-12 transition-all duration-300 ease-in-out"
    >
      <div className="flex justify-between items-center p-4 mr-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FontAwesomeIcon
              icon={getIcon("SEARCH")}
              size="lg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Type to search..."
              className="px-4 py-2 rounded-md pl-10"
              style={{ width: "500px", outline: "none" }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-5 right-64 relative">
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-200 fa-lg"
          >
            {darkMode ? (
              <FontAwesomeIcon icon={getIcon("SUN")} size="lg" />
            ) : (
              <FontAwesomeIcon icon={getIcon("MOON")} size="lg" />
            )}
          </button>
          <FontAwesomeIcon
            icon={getIcon("BELL_ICON")}
            size="lg"
            className="text-gray-500 dark:text-gray-200 fa-xl"
          />
          <FontAwesomeIcon
            icon={getIcon("SLIDERS")}
            size="lg"
            className="text-gray-500 dark:text-gray-200 fa-xl"
          />
          <FontAwesomeIcon
            icon={getIcon("USER_ICON")}
            size="lg"
            className="text-gray-500 dark:text-gray-200 fa-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
