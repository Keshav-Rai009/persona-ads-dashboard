import { createSlice } from "@reduxjs/toolkit";

const csvDataSlice = createSlice({
  name: "csvData",
  initialState: {},
  reducers: {
    storeData(state, action) {
      state = { ...state, ...action.payload };
      console.log(state);
    },
    removeData(state, action) {},
  },
});
export default csvDataSlice.reducer;

export const { storeData, removeData } = csvDataSlice.actions;
