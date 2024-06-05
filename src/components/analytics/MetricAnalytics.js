import React, { useEffect, useState } from "react";
import MetricInsights from "./MetricInsights";
import Graph from "./visualizers/Graph";
import {
  extractMetricInsights,
  filterByAdvertiser,
  filterCsvData,
  filterMetricDataByAdvertiser,
  filterMetricDataByDateRange,
  getMetricData,
  isGraph,
} from "../../util/AnalyticsUtil";

const MetricAnalytics = ({
  metricData,
  insightsData,
  initialData,
  customisations,
}) => {
  const { title, data, type, options } = metricData;
  const {
    keyMetrices,
    advertisersData,
    impressionsData,
    processedAdvertisersData,
    advertiserOptions,
    setSelectFilter,
  } = initialData;
  const [selectedAdvertiser, setSelectedAdvertiser] = useState({
    value: localStorage.getItem("selectedAdvertiser"),
    label: localStorage.getItem("selectedAdvertiser"),
  });
  // const [selectFilterState, setSelectFilterState] = useState();
  const [selectedDateRange, setSelectedDateRange] = useState([
    "Select dates...",
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentInsights, setCurrentInsights] = useState(insightsData);

  useEffect(() => {
    setSelectedAdvertiser({
      value: localStorage.getItem("selectedAdvertiser"),
      label: localStorage.getItem("selectedAdvertiser"),
    });
    setFilteredData(data);
    setCurrentInsights(insightsData);
  }, [data, insightsData]);

  const handleAdvertiserChange = (selectedAdvertiser, metricName) => {
    // if (
    //   localStorage.getItem("selectedAdvertiser") !== selectedAdvertiser?.value
    // ) {
    localStorage.setItem("selectedAdvertiser", selectedAdvertiser.value);
    //}
    setSelectedAdvertiser(selectedAdvertiser);

    filterData(selectedAdvertiser, selectedDateRange, metricName);
  };

  const handleDateRangeChange = (selectedDateRange, metricName) => {
    setSelectedDateRange(selectedDateRange);
    filterData(selectedAdvertiser, selectedDateRange, metricName);
  };

  const filterData = (selectedAdvertiser, selectedDateRange, metricName) => {
    let filteredMetricData = { ...data };
    if (selectedAdvertiser) {
      setSelectedAdvertiser({ ...selectedAdvertiser });
      filteredMetricData = filterMetricDataByAdvertiser({
        selectedAdvertiser,
        metricData:
          type === "pie"
            ? impressionsData
            : getMetricData(processedAdvertisersData, metricName),
        type,
      });
    }

    if (selectedDateRange?.length === 2) {
      setSelectedDateRange([...selectedDateRange]);
      filteredMetricData = filterMetricDataByDateRange({
        selectedDateRange,
        metricData: filteredMetricData,
      });
    }

    const metricInsights = extractMetricInsights({
      keyMetrices: keyMetrices.filter((keyMetric) => keyMetric.title === title),
      metricData: filterCsvData({
        csvData: advertisersData,
        selectedAdvertiser,
        selectedDateRange,
      }),
      pieChartData: {
        impressionsData: filterByAdvertiser(
          impressionsData,
          selectedAdvertiser?.value
        ),
        impressionsByCountry: filteredMetricData,
      },
    });
    setCurrentInsights(metricInsights[title]);
    setFilteredData({ ...filteredMetricData });
  };

  return (
    <div className="flex w-full border-b rounded-md">
      <div className="w-2/3">
        <Graph
          title={title}
          data={filteredData}
          type={type}
          options={options}
          customisations={{
            showFilters: true,
            filterControls: {
              advertiserFilter: {
                options: advertiserOptions,
                value: selectedAdvertiser,
                onChange: handleAdvertiserChange,
              },
              dateFilter: {
                onChange: handleDateRangeChange,
                visible: isGraph(type),
              },
            },
          }}
        />
      </div>
      <div className="w-1/3 pl-4">
        <MetricInsights
          data={currentInsights}
          customisations={customisations}
          title={title}
          type={type}
        />
      </div>
    </div>
  );
};

export default MetricAnalytics;
