import React from "react";
import { Dialog } from "@mui/material";
import create from "zustand";

const useCustomModal = create((set) => ({
  open: false,
  children: undefined,
  Close: () =>
    set({
      open: false,
    }),
}));

export const CustomModal = () => {
  const { open, children, Close } = useCustomModal();

  return (
    <Dialog open={open} onClose={Close} maxWidth="sm" fullWidth>
      {children && React.cloneElement(children, { Close: Close })}
    </Dialog>
  );
};

export const modal = (open, children) => {
  useCustomModal.setState({
    open,
    children,
  });
};
