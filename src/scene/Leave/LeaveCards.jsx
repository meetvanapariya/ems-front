import { Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "400px",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    textAlign: "center",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
  },
}));
const LeaveCards = ({ card }) => {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" color="primary">
          {card.title}
        </Typography>
        <Typography variant="h5">{card.subTitle}</Typography>
      </Paper>
    </div>
  );
};

export default LeaveCards;
