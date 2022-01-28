import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { withRouter } from "react-router-dom";

const ModalComponent = ({ location, history, children }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={location.state.state}
        onClose={() => history.goBack()}
        aria-labelledby="responsive-dialog-title"
      >
        {children}
      </Dialog>
    </div>
  );
};

export default withRouter(ModalComponent);
