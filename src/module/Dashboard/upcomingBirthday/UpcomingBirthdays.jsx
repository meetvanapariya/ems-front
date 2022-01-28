import React from "react";
import moment from "moment";

import { Box, Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import map from "lodash/map";
import CakeIcon from "@mui/icons-material/Cake";

import TimelineItem from "./Timeline";
import { useGetBirthdaysQuery } from "../../../RTK-Query/appApi";
import ProfileIcon from "../../../shared/ProfileIcon/ProfileIcon";
import { $primary, $white } from "../../../utils/colors";

const useStyles = makeStyles((theme) => ({
  birthdayCard: {
    maxWidth: "500px",
    backgroundColor: theme.palette.mode === "dark" ? "rgb(65 65 64)" : $white,
  },
  cardContainer: {
    height: "100%",
    overflowY: "scroll",
    padding: "2px",
  },
  linkIcon: {
    marginRight: 15,
  },
  scrollBar: {
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: 10,
      border: `1px solid grey`,
    },
  },
}));
const UpcomingBirthdays = () => {
  const classes = useStyles();
  const { data } = useGetBirthdaysQuery();
  const birthdayList = data?.payload?.birthdayList || [];
  // Upcoming and Todays Birthday
  let todayBirthdayList = [];
  let upcomingBirthdayList = [];

  const setTimeInDate = (props) => {
    return props
      .utcOffset(0)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  };
  const today = setTimeInDate(moment());

  birthdayList.forEach((user) => {
    const upcoming = setTimeInDate(moment(user.user_birth_date));
    if (upcoming.isSame(today)) {
      todayBirthdayList.push(user);
    }
    if (upcoming.isAfter(today)) {
      upcomingBirthdayList.push(user);
    }
  });
  return (

    <div className={classes.birthdayCard}>
      <Box pt={3} px={3} style={{ display: "flex", alignItems: "center" }}>
        <CakeIcon
          color="primary"
          fontSize="large"
          className={classes.linkIcon}
        />
        <Box>
          <Typography
            className={classes.header}
            variant="h6"
            fontWeight="medium"
            color="primary"
          >
            Upcoming Birthdays
          </Typography>
          <Typography variant="body1">January to March</Typography>
        </Box>
      </Box>


    <Box pt={3} px={3} className={classes.birthdayCard}>
      <Typography variant="h6" color="primary">
        <CakeIcon
          fontSize="large"
          className={classes.linkIcon}
          color="primary"
        />
        Today's Birthday List
      </Typography>
      <Grid
        container
        className={`${classes.cardContainer} ${classes.scrollBar}`}
      >
        {map(todayBirthdayList, (user, index) => {
          return (
            <ProfileIcon
              name={{
                first_name: user?.first_name,
                last_name: user?.last_name,
              }}
              subTitle={moment(user?.user_birth_date).format("Do MMMM YYYY")}
              profileImage={user?.profile_image}
            />
          );
        })}
      </Grid>
      <Typography variant="h6" color="primary">
        <CakeIcon
          fontSize="large"
          className={classes.linkIcon}
          color="primary"
        />{" "}
        Upcoming Birthdays
      </Typography>

      <Grid
        container
        className={`${classes.cardContainer} ${classes.scrollBar}`}
      >
        {map(upcomingBirthdayList, (user, index) => {
          return (
            <ProfileIcon
              name={{
                first_name: user?.first_name,
                last_name: user?.last_name,
              }}
              subTitle={moment(user?.user_birth_date).format("Do MMMM YYYY")}
              profileImage={user?.profile_image}
            />
          );
        })}
      </Grid>
    </Box>
    </div>
  );
};

export default UpcomingBirthdays;
