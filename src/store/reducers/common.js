import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  is_darkmode: true,
  is_navbar_open: true,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleTheme: (state, actions) => {
      return {
        ...state,
        is_darkmode: actions?.payload,
      };
    },
    toggleNavbar: (state, actions) => {
      return {
        ...state,
        is_navbar_open: actions?.payload,
      };
    },
  },
});

export const { toggleTheme, toggleNavbar } = commonSlice.actions;
export default commonSlice.reducer;
