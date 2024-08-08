import React from "react";
import { ModalOverlay, ModalContainer, CloseIcon } from "./../styles/Modal.js";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseIcon onClick={closeModal} />
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
