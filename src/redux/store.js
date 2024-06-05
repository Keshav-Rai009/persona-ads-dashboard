import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";
import engagementSliceReducer from "./engagementSlice";

const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
    engagement: engagementSliceReducer,
  },
});

export default store;
