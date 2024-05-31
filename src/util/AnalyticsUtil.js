import { fetchYaml } from "./NavigationBuilder";

const transformGraphdata = (data) => {
  return data.datasets
    ? {
        ...data,
        datasets: data.datasets.map((ds) => ({
          ...ds,
          data: ds.data.map((dataPoint) => dataPoint.value),
        })),
      }
    : data;
};

const filterDataByAdvertiser = ({ selectedAdvertiser, graphData, csvData }) => {
  if (selectedAdvertiser?.value === "All") {
    return graphData;
  }

  const filteredData = {
    ...csvData,
    datasets: csvData.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.filter(
        (dataPoint) => dataPoint.advertiser === selectedAdvertiser.value
      ),
    })),
  };

  return transformGraphdata(filteredData);
};

const filterDataByDateRange = ({ dateRange, graphData }) => {
  let filteredData = { ...graphData };
  if (dateRange?.length === 2) {
    const [startDate, endDate] = dateRange.map(
      (date) => date.toISOString().split("T")[0]
    );

    filteredData.datasets = filteredData.datasets.map((dataset) => ({
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
          text: xTitle, //"Timestamp",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: yTitle, //"Clicks",
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
      type: metric.type,
      options: getMetricOptions(metric.label, metric.name),
    };
  });
};

export {
  transformGraphdata,
  filterDataByAdvertiser,
  filterDataByDateRange,
  getKeyMetrices,
};
