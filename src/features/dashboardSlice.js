import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTabIndex: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectTab: (state, action) => {
      state.selectedTabIndex = action.payload;
    },
  },
});

export const { selectTab } = dashboardSlice.actions;

export default dashboardSlice.reducer;
