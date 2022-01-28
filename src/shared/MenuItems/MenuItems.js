// external
import React from "react";

// material
import { Menu, MenuItem, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import makeStyles from "@mui/styles/makeStyles";

// internal
import CustomLink from "../Link/Link";

const useStyles = makeStyles((theme) => ({
  menuText: {
    color: theme.palette.text.primary,
  },
}));

const MenuItems = ({
  handleLogout,
  anchorEl,
  handleClick,
  handleClose,
  ProfileMenu,
  history,
}) => {
  const classes = useStyles();
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PersonIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {ProfileMenu?.map((item, index) => {
          return (
            <CustomLink to={item.path} key={index}>
              <MenuItem
                className={classes.menuText}
                onClick={item.name === "logout" ? handleLogout : handleClose}
                selected={item.path === history.location.pathname}
              >
                {item.text}
              </MenuItem>
            </CustomLink>
          );
        })}
      </Menu>
    </>
  );
};
export default MenuItems;
