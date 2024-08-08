import styled from "styled-components";

export const CardContainer = styled.div`
  perspective: 1000px;
  margin: 20px;
`;

export const Card = styled.div`
  width: 300px;
  height: 200px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  position: relative;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const CardFront = styled(CardFace)`
  background-color: #f9f9f9;
`;

export const CardBack = styled(CardFace)`
  background-color: #efefef;
  transform: rotateY(180deg);
`;
