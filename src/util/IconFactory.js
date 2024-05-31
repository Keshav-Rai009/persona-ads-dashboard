import {
  faTachometerAlt,
  faUsers,
  faCog,
  faSignOutAlt,
  faChartBar,
  faFaceSmile,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ICONS_REGISTRY = Object.freeze({
  NAVICON: faChartBar,
  DASHBOARD: faTachometerAlt,
  USERS: faUsers,
  SETTINGS: faCog,
  SUPPORT: faEnvelope,
  LOGOUT: faSignOutAlt,
  DEFAULT: faFaceSmile,
});

function getIcon(iconName = "") {
  const icon = iconName.toUpperCase();
  return ICONS_REGISTRY[icon] || ICONS_REGISTRY["DEFAULT"];
}

export default getIcon;
