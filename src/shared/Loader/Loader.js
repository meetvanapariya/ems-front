import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import useStyles from "./style";

const CircularLoader = ({ ...rest }) => {
  const classes = useStyles();

  return <CircularProgress {...rest} className={classes.loader} />;
};
export default CircularLoader;
