import { Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    minHeight: "145px",
    textAlign: "center",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
  },
}));
const CustomCard = ({ card }) => {
  const classes = useStyle();
  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Typography variant="h6" color="primary">
          {card.title}
        </Typography>
        <Typography variant="h5">{card.subTitle}</Typography>
      </Paper>
    </>
  );
};

export default CustomCard;
