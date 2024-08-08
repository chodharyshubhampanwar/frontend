import styled from "styled-components";
import { FaBars } from "react-icons/fa";

export const ExamContainer = styled.div`
  box-sizing: border-box;
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ExamWrapper = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;

export const ExamContainerWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
`;

export const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background-color: #eaeaea;
  span {
    font-size: 14px;
    font-weight: 400;
    color: black;
  }
`;

export const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 10px;
`;

export const StatusContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e6eeff;
  @media (max-width: 768px) {
    display: ${(props) =>
      props.isVisible
        ? `
  dispaly: flex;
  height: 95vh;
      position: absolute;
      top: 5vh;
      right: 0;
      width: 100%;
      z-index: 1000;
      background-color: white;
    `
        : "none"};
  }
`;

export const NavIcon = styled(FaBars)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
    margin-left: 20px;
  }
`;

export const ExamNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;

export const QuestionInfo = styled.div`
  box-sizing: border-box;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  span {
    font-size: 16px;
    font-weight: 500;
  }
  border-bottom: 0.05px solid #7b7b7b;
`;

export const MarksInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

export const PositiveMarks = styled.span`
  padding: 5px 10px;
  background-color: lightgreen;
  border-radius: 10px;
  color: green;
`;

export const NegativeMarks = styled.span`
  padding: 5px 10px;
  background-color: #f9c6c6;
  border-radius: 10px;
  color: red;
`;

export const Palette = styled.span`
  background-color: #4255ff;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;

export const ExamTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex: 1;
`;
