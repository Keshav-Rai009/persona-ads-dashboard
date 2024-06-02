import React, { useEffect, useState } from "react";
import MetricInsights from "./MetricInsights";
import Graph from "./Graph";
import {
  extractMetricInsights,
  filterCsvData,
  filterDataByAdvertiser,
  filterDataByDateRange,
  filterMetricDataByAdvertiser,
  filterMetricDataByDateRange,
  getMetricData,
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
    processedImpressionsData,
    advertiserOptions,
  } = initialData;
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([
    "Select dates...",
  ]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentInsights, setCurrentInsights] = useState(insightsData);

  useEffect(() => {
    setFilteredData(data);
    setCurrentInsights(insightsData);
  }, [data, insightsData]);

  const handleAdvertiserChange = (selectedAdvertiser, metricName) => {
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
        metricData: getMetricData(processedAdvertisersData, metricName),
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
        impressionsData,
        impressionsByCountry: processedImpressionsData,
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
