import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import HeaderContainer from "../Header/HeaderContainer";
import Sidebar from "../Sidebar/Sidebar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MainTemplate = ({ open, handleDrawerToggle, children, is_darkmode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HeaderContainer
        handleDrawerToggle={handleDrawerToggle}
        open={open}
        is_darkmode={is_darkmode}
      />
      <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <>{children}</>
      </Box>
    </Box>
  );
};
export default MainTemplate;
