import yaml from "js-yaml";

export const fetchYaml = async (url) => {
  const response = await fetch(url);
  const text = await response.text();
  return yaml.loadAll(text);
};

// Adapters
export async function getKeyInsightsData() {
  const keyInsightsData = await fetchYaml("/configs/key-insights.yml");
  const keyInsights = keyInsightsData[0];
  let insightsData = {};
  Object.keys(keyInsights).forEach((key) => {
    const insightData = keyInsights[key];
    let data = insightData.map((insight) => ({
      name: insight.name,
      key: insight.key,
      icon: insight.icon.name,
      iconColor: insight.icon.color,
      showMetricTitle: insight.showMetricTitle || false,
      details: insight.details || "",
    }));
    insightsData[key] = data;
  });
  return insightsData;
}

export const getKeyMetrices = async () => {
  const adMetrices = await fetchYaml("/configs/ad-metrices.yml");
  const keyMetrices = adMetrices[0];
  return keyMetrices.map((metric) => {
    return {
      title: metric.name?.toUpperCase(),
      aliases: metric.aliases || [],
      type: metric.type,
      options: getMetricOptions(metric.label, metric.name),
      visuals: metric.visuals,
    };
  });
};

// can be configured by yaml
function getMetricOptions(xTitle, yTitle) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: xTitle, //e.g. "Timestamp",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: yTitle, //e.g. "Clicks",
        },
      },
    },
  };
}
