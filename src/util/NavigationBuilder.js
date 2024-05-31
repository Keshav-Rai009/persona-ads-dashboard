import yaml from "js-yaml";
import getIcon from "./IconFactory";

export const fetchYaml = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  return yaml.loadAll(text);
};

const navigationYaml = await fetchYaml("/configs/navigation.yml");

export function buildDashboardNavigation() {
  const dashboardLinks = navigationYaml[0];
  console.log(dashboardLinks);
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
