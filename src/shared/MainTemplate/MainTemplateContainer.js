import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Internal
import MainTemplate from "./MainTemplate";
import { toggleNavbar } from "../../store/reducers/common";

const MainTemplateContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { is_navbar_open, is_darkmode } = useSelector((state) => state.common);

  const handleDrawerToggle = () => {
    dispatch(toggleNavbar(!is_navbar_open));
  };

  return (
    <MainTemplate
      open={is_navbar_open}
      handleDrawerToggle={handleDrawerToggle}
      is_darkmode={is_darkmode}
    >
      {children}
    </MainTemplate>
  );
};
export default MainTemplateContainer;
