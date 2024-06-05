import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  engagementData: [],
  loading: true,
};

const engagementSlice = createSlice({
  name: "engagementSlice",
  initialState,
  reducers: {
    setEngagementData(state, action) {
      state.engagementData = action.payload;
      state.loading = false;
    },
    removeData(state, action) {
      state = initialState;
    },
  },
});

export const { setEngagementData } = engagementSlice.actions;

export default engagementSlice.reducer;
