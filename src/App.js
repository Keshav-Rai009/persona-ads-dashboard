import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DashboardControls from "./components/DashboardControls";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import AppRoutes from "./components/core/AppRoutes";
import { useDispatch } from "react-redux";
import useCSVData from "./hooks/useCSVData";
import {
  setAdvertisersData,
  setImpressionsData,
  setKeyInsights,
  setKeyMetrices,
  setLoading,
  storeProcessedAdvertisersData,
  storeProcessedImpressionsData,
} from "./redux/csvDataSlice";
import Advertiser_Data_CSV from "./assets/datasets/Advertiser_Data.csv";

import Top10_Countries_CSV from "./assets/datasets/Top10_Countries.csv";
import processCsvData, { processCsvDataForPieChart } from "./util/CsvProcessor";
import { getKeyInsightsData, getKeyMetrices } from "./util/YamlProcessor";

function App() {
  // INITIAL APP SETUP
  const dispatch = useDispatch();
  // Fetch advertisers CSV data
  const { csvData: advertisersData, loading: loadingAdvertisers } =
    useCSVData(Advertiser_Data_CSV);
  // Fetch impressions CSV data
  const { csvData: impressionsData, loading: loadingImpressions } =
    useCSVData(Top10_Countries_CSV);

  useEffect(() => {
    const initiateSetup = async () => {
      dispatch(setAdvertisersData(advertisersData));
      dispatch(setImpressionsData(impressionsData));
      dispatch(setLoading(true));

      const keyMetrices = await getKeyMetrices();
      dispatch(setKeyMetrices(keyMetrices));
      const processedAdvertisersData = processCsvData(
        advertisersData,
        keyMetrices
      );
      const keyInsights = await getKeyInsightsData();
      dispatch(setKeyInsights(keyInsights));
      const processedImpressionsData =
        processCsvDataForPieChart(impressionsData);
      dispatch(storeProcessedAdvertisersData(processedAdvertisersData));
      dispatch(storeProcessedImpressionsData(processedImpressionsData));
    };

    if (advertisersData?.length && impressionsData?.length) {
      initiateSetup();
    }
  }, [
    loadingAdvertisers,
    loadingImpressions,
    advertisersData,
    impressionsData,
    dispatch,
  ]);

  return (
    <div>
      <BrowserRouter>
        <div className="flex h-full">
          <DashboardControls></DashboardControls>
          <div className="flex flex-col w-full">
            <Navbar></Navbar>
            <AppRoutes></AppRoutes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
