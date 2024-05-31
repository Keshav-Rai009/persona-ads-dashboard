import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import navIcon from "../../assets/images/persona-icon.png";
import {
  faTachometerAlt,
  faUsers,
  faCog,
  faSignOutAlt,
  faChartBar,
  faChevronDown,
  faChevronUp,
  faTimes,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { buildDashboardNavigation } from "../../util/NavigationBuilder";

function DashboardControls({ links1 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState([]);

  const links = buildDashboardNavigation();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (selectedSubMenu) => {
    setOpenSubMenus((prevOpenedSubMenus) =>
      prevOpenedSubMenus.includes(selectedSubMenu)
        ? prevOpenedSubMenus.filter((menu) => menu !== selectedSubMenu)
        : [...prevOpenedSubMenus, selectedSubMenu]
    );
  };

  const isSubMenuOpen = (selectedSubMenu) =>
    openSubMenus.includes(selectedSubMenu);

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    // setIsExpanded(!isExpanded);
    setIsExpanded(true);
  };

  return (
    <nav
      className={`${
        isExpanded ? "w-64" : "w-20"
      } bg-gray-800 text-white flex flex-col h-screen fixed transition-all duration-300`}
    >
      <div
        className="p-4 text-2xl font-semibold flex items-center justify-between mb-16"
        style={{ color: "#e63946" }}
      >
        {isExpanded && (
          <div
            className="flex items-center cursor-pointer font-normal"
            onClick={() => navigate("/")}
          >
            <img src={navIcon} alt="persona-logo" className="mr-2 w-7 h-7" />
            PERSONA
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {/* <FontAwesomeIcon icon={isExpanded ? faArrowLeft : faBars} /> */}
        </button>
      </div>
      {isExpanded && (
        <div>
          <div className="text-gray-400 ml-4 text-lg font-medium flex items-center">
            MENU
          </div>
          <div className="flex flex-col space-y-4 w-full p-2">
            {links.map((link, index) => (
              <div key={index} className="w-full">
                <div
                  onClick={() => toggleSubMenu(index)}
                  className="text-white hover:text-gray-300 flex items-center justify-between p-2 cursor-pointer "
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={link.icon} className="mr-2" />
                    {link.label}
                  </div>
                  {link.subLinks && (
                    <FontAwesomeIcon
                      className="mr-6 mt-1"
                      icon={isSubMenuOpen(index) ? faChevronUp : faChevronDown}
                    />
                  )}
                </div>
                {link.subLinks && isSubMenuOpen(index) && (
                  <div className="flex flex-col space-y-2 ml-6">
                    {link.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        className="text-white hover:text-gray-300 p-2 nav-link"
                        to={subLink.href}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default DashboardControls;
