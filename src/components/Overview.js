import React, { useEffect, useState } from "react";
import Select from "react-select";
import DateRangeFilter from "./DateRangeFilter";
import { useDispatch, useSelector } from "react-redux";
import Graph from "./analytics/Graph";
import {
  filterByAdvertiser,
  filterDataByAdvertiser,
  filterDataByDateRange,
  getAdvertiserOptions,
  getMetricDatasets,
  transformToGraphdata,
} from "../util/AnalyticsUtil";
import { processCsvDataForPieChart } from "../util/CsvProcessor";

function Overview() {
  const {
    keyMetrices,
    advertisersData,
    impressionsData,
    processedAdvertisersData,
    processedImpressionsData,
    loading,
  } = useSelector((state) => state.csvData);
  const dispatch = useDispatch();

  const [countryImpressions, setCountryImpressions] = useState([]);
  const [advertisers, setAdvertisers] = useState(
    processedAdvertisersData.advertisers
  );
  const [initialData, setInitialData] = useState(null);
  const [filteredGraphData, setFilteredGraphData] = useState(null);
  const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);
  const [dateRange, setDateRange] = useState(["Select dates..."]);

  useEffect(() => {
    const initiateSetup = async () => {
      setAdvertisers(processedAdvertisersData.advertisers);
      setCountryImpressions(processedImpressionsData);
      const graphData = transformToGraphdata(processedAdvertisersData);
      setInitialData(processedAdvertisersData);
      setFilteredGraphData(graphData);
    };
    if (advertisersData?.length && impressionsData?.length) {
      initiateSetup();
    }
  }, [
    processedAdvertisersData,
    processedImpressionsData,
    advertisersData,
    impressionsData,
    dispatch,
    loading,
  ]);

  const filterData = ({ selectedAdvertiser, dateRange }) => {
    let filteredData = { ...filteredGraphData };
    if (selectedAdvertiser) {
      setSelectedAdvertiser({ ...selectedAdvertiser });
      filteredData = filterDataByAdvertiser({
        selectedAdvertiser,
        csvData: initialData,
      });
      const filteredImpressionsData = filterByAdvertiser(
        impressionsData,
        selectedAdvertiser.value
      );
      setCountryImpressions(processCsvDataForPieChart(filteredImpressionsData));
    }

    if (dateRange?.length === 2) {
      setDateRange([...dateRange]);
      filteredData = filterDataByDateRange({
        dateRange,
        graphData: filteredData,
      });
    }

    setFilteredGraphData({ ...filteredData });
  };
  const advertiserOptions = getAdvertiserOptions(advertisers);

  const handleDateChange = (selectedDates) => {
    filterData({ selectedAdvertiser, dateRange: selectedDates });
  };

  return loading ? (
    <h1 className="text-3xl"> Loading data. Please wait... </h1>
  ) : (
    <div className="p-5 min-h-screen overflow-auto">
      <div className="flex pb-5 justify-between">
        <div style={{ width: "25%", maxWidth: "500px" }}>
          <Select
            value={selectedAdvertiser}
            onChange={(selectedAdvertiser) =>
              filterData({ selectedAdvertiser, dateRange })
            }
            options={advertiserOptions}
            placeholder="Select an advertiser..."
          />
        </div>
        <DateRangeFilter onDateChange={handleDateChange}></DateRangeFilter>
      </div>
      <div className="grid grid-cols-2 gap-4" style={{ height: "100%" }}>
        {keyMetrices.map((metric, i) => {
          const { title, type, options } = metric;
          const data =
            type === "pie"
              ? { ...countryImpressions }
              : {
                  ...filteredGraphData,
                  datasets: [
                    getMetricDatasets(filteredGraphData?.datasets, title),
                  ],
                };
          return (
            <Graph
              key={i}
              title={title}
              data={data}
              options={options}
              type={type}
            ></Graph>
          );
        })}
      </div>
    </div>
  );
}

export default Overview;
