import React, { useState } from "react";

//ui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const CustomConfirmModal = ({
  open,
  titleName,
  message,
  closeConfirmationDialog,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => closeConfirmationDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <WarningIcon color="primary" className="mr-2" />
        {titleName || "Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeConfirmationDialog(false)}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CustomConfirmModal;
