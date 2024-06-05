import { createSlice } from "@reduxjs/toolkit";
import SelectFilter from "../components/SelectFilter";
const initialState = {
  csvData: {},
  keyMetrices: [],
  keyInsights: [],
  graphData: {},
  initialData: {},
  advertisersData: [],
  impressionsData: [],
  processedAdvertisersData: [],
  processedImpressionsData: [],
  metricesAnalysisData: {},
  loading: true,
  selectFilterVal: "",
};

const csvDataSlice = createSlice({
  name: "csvData",
  initialState,
  reducers: {
    setKeyMetrices(state, action) {
      state.keyMetrices = action.payload;
    },
    setKeyInsights(state, action) {
      state.keyInsights = action.payload;
    },
    setGraphData(state, action) {
      state.graphData = action.payload;
    },
    setInitialData(state, action) {
      state.initialData = action.payload;
    },
    setAdvertisersData(state, action) {
      state.advertisersData = action.payload;
      state.loading = false;
    },
    setImpressionsData(state, action) {
      state.impressionsData = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    storeProcessedAdvertisersData(state, action) {
      state.processedAdvertisersData = action.payload;
      state.loading = false;
    },
    storeProcessedImpressionsData(state, action) {
      state.processedImpressionsData = action.payload;
      state.loading = false;
    },
    storeData(state, action) {
      state.keyMetrices = action.payload.keyMetrices;
      state.advertisersData = action.payload.advertisersData;
      state.impressionsData = action.payload.impressionsData;
      state.initialData = action.payload.initialData;
      state.graphData = action.payload.graphData;
      state.loading = false;
    },
    removeData(state, action) {
      state = initialState;
    },
    storeMetricesAnalysisData(state, action) {
      state.metricesAnalysisData = action.payload;
      state.loading = false;
    },
    setSelectFilter(state, action) {
      state.selectFilterVal = action.payload;
    },
  },
});

export const {
  setKeyMetrices,
  setKeyInsights,
  setAdvertisersData,
  setImpressionsData,
  setLoading,
  storeProcessedAdvertisersData,
  storeProcessedImpressionsData,
  storeData,
  removeData,
  setGraphData,
  setInitialData,
  storeMetricesAnalysisData,
  setSelectFilter,
} = csvDataSlice.actions;

export default csvDataSlice.reducer;
