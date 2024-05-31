import { configureStore } from "@reduxjs/toolkit";
import csvDataSlice from "./csvDataSlice";

const store = configureStore({
  reducer: {
    csvData: csvDataSlice,
  },
});

export default store;
