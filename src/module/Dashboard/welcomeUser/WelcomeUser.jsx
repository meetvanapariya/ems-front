import React from "react";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getUserInfo,
  IMG_STORAGE_URL,
  camelCaseConvertor,
} from "../../../utils";
import moment from "moment";
import ProfileIcon from "../../../shared/ProfileIcon/ProfileIcon";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    display: "flex",
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const WelcomeUser = () => {
  const classes = useStyles();
  const fullName = {
    first_name: getUserInfo().first_name,
    last_name: getUserInfo().last_name,
  };
  const typography = {
    variant: "h5",
    color: "primary",
    align: "center",
  };

  return (
    <Grid className={classes.paper}>
      <ProfileIcon
        name={fullName}
        subTitle={moment().format("dddd, Do MMMM YYYY")}
        greeting="Welcome"
        typography={typography}
      />
    </Grid>
  );
};

export default WelcomeUser;
