// external
import React from "react";
import { useDispatch } from "react-redux";

// internal
import { toggleTheme } from "../../store/reducers/common";
import Header from "./Header";

const HeaderContainer = ({ handleDrawerToggle, open, is_darkmode }) => {
  const dispatch = useDispatch();

  // Theme Toggle
  const themeChangeHandler = () => {
    dispatch(toggleTheme(!is_darkmode));
  };

  return (
    <Header
      themeChangeHandler={themeChangeHandler}
      is_darkmode={is_darkmode}
      handleDrawerToggle={handleDrawerToggle}
      open={open}
    />
  );
};

export default HeaderContainer;
