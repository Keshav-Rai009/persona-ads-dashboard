export const metricesMap = {
  IMPRESSIONS: "Impressions",
  CLICKS: "Clicks",
  "CTR%": "CTR (in %)",
  CTR: "CTR (in %)",
};

export default function processCsvData(data, metricesConfig) {
  if (!data) return { labels: null, datasets: null };

  const csvHeaders = Object.keys(data[0]).map((key) => key.toLocaleLowerCase());

  let dataSetKeys = [];
  metricesConfig.forEach((metric) => {
    if (isValidMetric(csvHeaders, metric)) {
      dataSetKeys.push(metric.title);
    }
  });

  let datasets = [];

  dataSetKeys.forEach((key, i) => {
    const metricVisuals = getMetricVisuals(metricesConfig, key);
    datasets.push({
      label: key,
      data: data.map((dataPoint) => ({
        advertiser: dataPoint.Advertiser,
        value: key.includes("%")
          ? dataPoint[getMetricName(key)] || dataPoint[metricesMap[key]]
          : parseInt(
              dataPoint[getMetricName(key)] || dataPoint[metricesMap[key]],
              10
            ),
      })),
    });
    Object.keys(metricVisuals).forEach((visual) => {
      datasets[i][visual] = metricVisuals[visual];
    });
  });

  const advertisers = [...new Set(data.map((d) => d.Advertiser))];
  const labels = data.map((row) => ({
    value: row.Date,
    advertiser: row.Advertiser,
  }));

  return {
    advertisers,
    labels,
    datasets: datasets,
  };
}

function isValidMetric(csvHeaders, metric) {
  return (
    csvHeaders.includes(metric.title?.toLocaleLowerCase()) ||
    metric.aliases.some((alias) =>
      csvHeaders.includes(alias.toLocaleLowerCase())
    )
  );
}

function getMetricConfig(metricesConfig, metricName) {
  return metricesConfig.find(
    (config) =>
      config.title.toLocaleLowerCase() === metricName.toLocaleLowerCase()
  );
}

function getMetricVisuals(metricesConfig, metricName) {
  const metricConfig = getMetricConfig(metricesConfig, metricName);
  return { ...(metricConfig?.visuals || {}) };
}

export function getMetricName(metric) {
  const metricLower = metric.toLocaleLowerCase();
  return metricLower.charAt(0).toUpperCase() + metricLower.slice(1);
}

export function processCsvDataForPieChart(data = []) {
  if (!data) return;
  const countryImpressions = {};

  data.forEach((row) => {
    const country = row.Country;
    const impressions = parseInt(row.Impressions, 10);

    if (country in countryImpressions) {
      countryImpressions[country] += impressions;
    } else {
      countryImpressions[country] = impressions;
    }
  });

  return countryImpressions;
}
