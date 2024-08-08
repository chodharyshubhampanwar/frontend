import styled from "styled-components";

export const ItemWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

export const ItemContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ItemInfoWrapper = styled.div`
  box-sizing: border-box;
  flex: 3;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

export const ItemInfoSummary = styled.div`
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  background-color: #f5f5f5;
`;

export const ItemTitle = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

export const ItemInfo = styled.p`
  font-size: 1.2em;
  color: #666;
  margin-bottom: 5px;
`;

export const StartItemButton = styled.button`
  padding: 10px 20px;
  width: 100%;
  margin-top: 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0051bb;
  }
`;

export const Label = styled.label`
  font-size: 1.2em;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
`;
