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
    };
  });
}

export function buildNavbarNavigation() {}
