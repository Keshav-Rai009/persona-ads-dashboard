import {
  getMetricName,
  metricesMap,
  processCsvDataForPieChart,
} from "./CsvProcessor";
import { fetchYaml } from "./NavigationBuilder";

const transformToGraphdata = (data) => {
  return data?.datasets
    ? {
        ...data,
        datasets: data.datasets.map((ds) => ({
          ...ds,
          data: ds.data?.map((dataPoint) => dataPoint.value),
        })),
      }
    : data;
};

const filterDataByAdvertiser = ({
  selectedAdvertiser,
  csvData,
  type = "graph",
}) => {
  let filteredData = {};

  if (type === "pie") {
    filteredData = filterByAdvertiser(csvData, selectedAdvertiser.value);
    return processCsvDataForPieChart(filteredData);
  }

  if (selectedAdvertiser?.value === "All") {
    filteredData = csvData;
  } else {
    filteredData = {
      ...csvData,
      datasets: csvData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter(
          (dataPoint) => dataPoint.advertiser === selectedAdvertiser.value
        ),
      })),
    };
  }

  return transformToGraphdata(filteredData);
};

const filterDataByDateRange = ({ dateRange, graphData }) => {
  let filteredData = { ...graphData };

  if (dateRange?.length === 2) {
    const [startDate, endDate] = dateRange.map(
      (date) => date.toISOString().split("T")[0]
    );

    filteredData.datasets = filteredData.datasets?.map((dataset) => ({
      ...dataset,
      data: dataset.data.filter((_, index) => {
        const labelDate = graphData.labels[index];
        return labelDate >= startDate && labelDate <= endDate;
      }),
    }));
    filteredData.labels = filteredData.labels.filter(
      (label) => label >= startDate && label <= endDate
    );
  }

  return filteredData;
};

export const filterByAdvertiser = (metricData = [], advertiser = "") => {
  return advertiser === "All"
    ? [...metricData]
    : metricData.filter((dataPoint) => dataPoint.Advertiser === advertiser);
};

export const filterMetricDataByAdvertiser = ({
  selectedAdvertiser,
  metricData,
  type,
}) => {
  let filteredData = {};

  if (type === "pie") {
    filteredData = filterByAdvertiser(metricData, selectedAdvertiser.value);
    return processCsvDataForPieChart(filteredData);
  }

  if (Array.isArray(metricData.datasets)) {
    metricData.datasets = metricData.datasets[0];
  }

  if (selectedAdvertiser?.value === "All") {
    filteredData = { ...metricData, datasets: [metricData.datasets] };
  } else {
    filteredData = {
      ...metricData,
      datasets: [
        {
          ...metricData.datasets,
          data: metricData.datasets?.data.filter(
            (dataPoint) => dataPoint.advertiser === selectedAdvertiser.value
          ),
        },
      ],
    };
  }

  return transformToGraphdata(filteredData);
};

export const filterMetricDataByDateRange = ({
  selectedDateRange,
  metricData,
}) => {
  if (Array.isArray(metricData.datasets)) {
    metricData.datasets = metricData.datasets[0];
  }
  let filteredData = { ...metricData };
  if (selectedDateRange?.length === 2) {
    const [startDate, endDate] = selectedDateRange.map(
      (date) => date.toISOString().split("T")[0]
    );

    filteredData.datasets = [
      {
        ...metricData.datasets,
        data: metricData.datasets.data.filter((_, index) => {
          const labelDate = metricData.labels[index];
          return labelDate >= startDate && labelDate <= endDate;
        }),
      },
    ];
    filteredData.labels = filteredData.labels.filter(
      (label) => label >= startDate && label <= endDate
    );
  }
  return filteredData;
};

export const filterCsvData = ({
  csvData,
  selectedAdvertiser,
  selectedDateRange,
}) => {
  if (selectedAdvertiser?.value === "All") {
    return csvData;
  }

  let filteredData = [...csvData];
  if (selectedAdvertiser) {
    filteredData = filteredData.filter(
      (dataPoint) => dataPoint.Advertiser === selectedAdvertiser.value
    );
  }

  if (selectedDateRange?.length === 2) {
    const [startDate, endDate] = selectedDateRange.map(
      (date) => date.toISOString().split("T")[0]
    );
    filteredData = filteredData.filter(
      (dataPoint) => dataPoint.Date >= startDate && dataPoint.Date <= endDate
    );
  }
  return filteredData;
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

const getKeyMetrices = async () => {
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

export const getMetricDatasets = (datasets = [], metricName = "") => {
  return datasets?.find((dataset) => dataset.label === metricName) || [];
};

export const getMetricData = (metricesData = [], metricName = "") => {
  return {
    ...metricesData,
    datasets:
      metricesData.datasets?.find((dataset) => dataset.label === metricName) ||
      [],
  };
};

export function isGraph(type = "") {
  return type === "line" || type === "bar";
}
const extractMetricInsights = ({
  metricData = [],
  pieChartData = [],
  keyMetrices = [],
}) => {
  let metricInsights = {};

  keyMetrices.forEach((metric) => (metricInsights[metric.title] = {}));

  if (!metricData?.length || !keyMetrices.length) {
    return metricInsights;
  }

  const CTR_THRESHOLD = 0.5;
  let topPerformers = [];
  metricData.forEach((dataPoint) => {
    if (dataPoint["CTR (in %)"] >= CTR_THRESHOLD) {
      topPerformers.push(dataPoint.Advertiser);
    }
  });
  // top 3 performers
  topPerformers = [...new Set(topPerformers)]?.slice(0, 3);
  metricInsights.topPerformers = topPerformers;

  keyMetrices.forEach((metric) => {
    if (isGraph(metric.type)) {
      const totalSum = metricData.reduce(
        (acc, dataPoint) => acc + getMetricValue(dataPoint, metric.title),
        0
      );
      const avgMetricValue = totalSum / metricData.length;

      const maxMetricValue = Math.max(
        ...metricData.map((dataPoint) =>
          getMetricValue(dataPoint, metric.title)
        )
      );

      const maxMetricEntry = metricData.find(
        (dataPoint) =>
          getMetricValue(dataPoint, metric.title) === maxMetricValue
      );

      const sortedByDate = metricData
        .slice()
        .sort((a, b) => new Date(a.Date) - new Date(b.Date));
      const firstEntry = sortedByDate[0];
      const lastEntry = sortedByDate[sortedByDate.length - 1];
      const metricTrend =
        (getMetricValue(lastEntry, metric.title) -
          getMetricValue(firstEntry, metric.title)) /
        getMetricValue(firstEntry, metric.title);
      const minMetricValue = Math.min(
        ...metricData.map((item) => parseInt(item.Impressions, 10))
      );
      const minMetricEntry = metricData.find(
        (item) => parseInt(item.Impressions, 10) === minMetricValue
      );

      const growthRate =
        ((maxMetricValue - minMetricValue) / minMetricValue) * 100;
      const peakPeriod = maxMetricEntry?.Date;
      const standardDeviation = Math.sqrt(
        metricData.reduce(
          (acc, item) => acc + Math.pow(item.Impressions - avgMetricValue, 2),
          0
        ) / metricData.length
      );
      metricInsights[metric.title] = {
        totalSum,
        avgMetricValue: Math.floor(avgMetricValue),
        maxMetricValue,
        maxMetricEntry,
        minMetricEntry,
        growthRate: growthRate.toFixed(2),
        peakPeriod,
        standardDeviation: standardDeviation.toFixed(2),
        trend: describeTrend(metricTrend, getMetricName(metric.title)),
        topPerformers,
      };
    } else {
      const { impressionsData, impressionsByCountry } = pieChartData;
      if (!Object.keys(impressionsByCountry)?.length) {
        return metricInsights;
      }
      const totalSum = impressionsData.reduce(
        (sum, entry) => sum + parseInt(entry.Impressions, 10),
        0
      );
      const sortedCountries = Object.entries(impressionsByCountry).sort(
        ([, a], [, b]) => b - a
      );
      const topPerformingCountry = sortedCountries[0][0];
      const lowestPerformingCountry =
        sortedCountries[sortedCountries.length - 1][0];
      const numberOfCountries = Object.keys(impressionsByCountry).length;
      const countryPercentages = Object.entries(impressionsByCountry).reduce(
        (acc, [country, impressions]) => {
          acc[country] = ((impressions / totalSum) * 100).toFixed(2);
          return acc;
        },
        {}
      );
      const impressionsByAdvertiser = impressionsData.reduce((acc, entry) => {
        const impressions = parseInt(entry.Impressions, 10);
        if (!acc[entry.Advertiser]) {
          acc[entry.Advertiser] = 0;
        }
        acc[entry.Advertiser] += impressions;
        return acc;
      }, {});
      const maxAdvertiserImpressions = Object.entries(
        impressionsByAdvertiser
      ).reduce(
        (max, curr) => {
          return curr[1] > max[1] ? curr : max;
        },
        ["", 0]
      )?.[0];
      const distributionSpread = sortedCountries.map(
        ([country, impressions]) => ({
          country,
          impressions,
          percentage: countryPercentages[country],
        })
      );

      metricInsights[metric.title] = {
        totalSum,
        lowestPerformingCountry,
        topPerformingCountry,
        maxAdvertiserImpressions,
        numberOfCountries,
        distributionSpread,
        topCountributors: distributionSpread.slice(0, 3),
        trend: `${getMetricName(
          metric.title
        )} remained relatively stable over the period.`,
      };
    }
  });

  return { ...metricInsights };
};

function describeTrend(metricTrend, metricName) {
  if (metricTrend > 0) {
    return `${metricName} grew over the period.`;
  } else if (metricTrend < 0) {
    return `${metricName} declined over the period.`;
  } else {
    return `${metricName} remained relatively stable over the period.`;
  }
}

function getMetricValue(dataPoint, metricName) {
  const metricValue =
    dataPoint[metricName] || dataPoint[metricesMap[metricName]];
  return parseInt(metricValue);
}

export {
  transformToGraphdata,
  filterDataByAdvertiser,
  filterDataByDateRange,
  getKeyMetrices,
  extractMetricInsights,
};
