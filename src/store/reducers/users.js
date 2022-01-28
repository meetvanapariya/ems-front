import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserData: (state, actions) => {
      return {
        ...state,
        current_user: actions?.payload,
      };
    },
    setUsersData: (state, actions) => {
      return {
        ...state,
        users: actions?.payload?.users,
      };
    },
  },
});

export const { setCurrentUserData, setUsersData } = usersSlice.actions;

export default usersSlice.reducer;
