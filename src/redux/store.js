import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";

const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
  },
});

export default store;
