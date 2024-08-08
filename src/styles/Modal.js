import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 50%;
  height: 50vh;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 90%;
    height: 75vh;
  }
`;

export const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
