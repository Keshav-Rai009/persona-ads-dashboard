import getIcon from "./IconFactory";
import { fetchYaml } from "./YamlProcessor";

const navigationYaml = await fetchYaml("/configs/navigation.yml");

export function buildDashboardNavigation() {
  const dashboardLinks = navigationYaml[0];
  return dashboardLinks.map((link) => {
    return {
      href: link.label?.toLowerCase(),
      label: link.label,
      icon: getIcon(link.label),
      subLinks: link.subLinks?.map((subLink) => {
        return { href: subLink.label?.toLowerCase(), label: subLink.label };
      }),
      // show link - can be configured via permissions model stored in the backend based on the user role.
      // e.g. A link/tab which is shown only to an admin
    };
  });
}

export function buildNavbarNavigation() {}
