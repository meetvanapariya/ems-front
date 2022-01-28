import React from "react";
const useModal = () => {
  const [openModal, setOpenModal] = React.useState(false);

  return { openModal, setOpenModal };
};

export default useModal;
