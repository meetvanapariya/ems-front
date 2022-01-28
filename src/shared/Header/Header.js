// external
import React from "react";

// Material
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { IconButton, Toolbar, Badge, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness2, Brightness5, Notifications } from "@mui/icons-material";

// internal
import MenuItems from "../MenuItems/MenuItemsContainer";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const Header = ({
  is_darkmode,
  open,
  handleDrawerToggle,
  themeChangeHandler,
}) => {
  // Theme Icons
  const themeModeIcon = is_darkmode ? <Brightness2 /> : <Brightness5 />;
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          direction="row"
          alignItems="center"
          position="absolute"
          right="30px"
        >
          <IconButton
            color="inherit"
            aria-label="mode"
            onClick={themeChangeHandler}
            size="large"
          >
            {themeModeIcon}
          </IconButton>
          <IconButton color="inherit" aria-label="mode" size="large">
            <Badge badgeContent={4} color="primary">
              <Notifications />
            </Badge>
          </IconButton>
          <MenuItems />
        </Stack>
        <Typography variant="h6" noWrap component="div"></Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
