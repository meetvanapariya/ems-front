import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Typography, Box, Button } from "@mui/material";

import useStyles from "./style";

const NotFound = ({ history }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="md" style={{ textAlign: "center" }}>
        <Typography
          className={classes.title}
          variant="h4"
          align="center"
          component="h1"
        >
          404
        </Typography>
        <Typography className={classes.title} variant="h6">
          The page you are looking for isn’t here
        </Typography>
        <Box className={classes.box}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(NotFound);
