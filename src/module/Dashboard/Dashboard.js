import { Container, Grid } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

import UpcomingBirthdays from "./upcomingBirthday/UpcomingBirthdays";
import WelcomeUser from "./welcomeUser/WelcomeUser";
import EmployeeLeaveTable from "../Leave/EmploayeeLeave";
import HolidaysList from "../Holidays/UpcomingHolidays";

const useStyles = makeStyles((theme) => ({
  Grid: {
    padding: 16,
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.Grid}>
      <Grid>
        <WelcomeUser />
      </Grid>
      <Grid container className="mt-4">
        <HolidaysList />
      </Grid>
      <Grid container className="mt-4">
        <Grid item xs={12} md={5} className="pr-3">
          <UpcomingBirthdays />
        </Grid>
        <Grid item xs={12} md={7}>
          <EmployeeLeaveTable />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
