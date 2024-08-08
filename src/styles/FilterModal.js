import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;
`;

export const FilterSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ApplyButton = styled.button`
  background-color: #202124;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 2px 3px 0px,
      rgba(60, 64, 67, 0.15) 0px 6px 10px 4px;
    background-color: rgb(32, 33, 36);
    border: medium;
  }
`;

export const ClearButton = styled.button`
  background-color: #ececec;
  color: #202124;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
`;
