// external
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  leftBarMenu: {
    display: "flex",
    color: theme.palette.mode === "dark" ? "white" : "black",
    "&:hover": {
      color: theme.palette.mode === "dark" ? "white" : "black",
    },
  },
}));

const CustomLink = ({ children, to }) => {
  const classes = useStyles();
  return (
    <Link className={`${classes.leftBarMenu} `} to={to}>
      {children}
    </Link>
  );
};
export default forwardRef(CustomLink);
