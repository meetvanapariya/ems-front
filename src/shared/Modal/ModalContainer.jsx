import React from "react";
import ModalComponent from "./ModalComponent";

const ModalContainer = ({ children }) => {
  return (
    <div>
      <ModalComponent>{children}</ModalComponent>
    </div>
  );
};

export { ModalContainer };
