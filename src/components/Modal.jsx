import React from "react";
import {
  ModalWrapper,
  ModalContent,
  OkButton,
  CancelButton,
} from "../styles/ModalPopup.js";

function Modal({ title, message, onCancel, onOk }) {
  return (
    <ModalWrapper>
      <ModalContent>
        <h2>{title}</h2>
        <p>{message}</p>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <OkButton onClick={onOk}>OK</OkButton>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
