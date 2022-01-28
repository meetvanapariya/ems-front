import { createSlice } from "@reduxjs/toolkit";

import initialState from "../initialState";

export const eventSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setTotalLeavesData: (state, action) => {
      const totalLeaves = action.payload;
      console.log("total leaves", totalLeaves);
      state.leaves = totalLeaves;
      state.isLoading = false;
    },
    setUpcomingHolidayData: (state, action) => {
      const upcomingHoliday = action.payload;
      state.upcoming_holidays = upcomingHoliday;
      state.isLoading = false;
    },
    setUpcomingBirthdayData: (state, action) => {
      const upcomingBday = action.payload;
      state.upcoming_bdays = upcomingBday;
      state.isLoading = false;
    },
    setLoader: (state, action) => {
      const loader = action.payload;
      state.isLoading = loader;
    },
  },
});

//Get all leaves
export const { setTotalLeavesData } = eventSlice.actions;
//Get all holiday
export const { setUpcomingHolidayData } = eventSlice.actions;
//Get all bday
export const { setUpcomingBirthdayData } = eventSlice.actions;
export const { setLoader } = eventSlice.actions;

export default eventSlice.reducer;
