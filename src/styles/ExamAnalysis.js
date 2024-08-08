import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const ExamAnalysisContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  padding: 20px;
  background-color: #f5f5f5;
  /* margin-right: 20px; */
  background-color: grey;
  flex: 1;
  overflow-y: auto;
`;

export const SectionAnalysisContainer = styled.div`
  box-sizing: border-box;
  flex: 3;
  display: flex;
  height: 100%;
  flex-direction: column;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  padding: 15px;
  border-radius: 15px;
  overflow-y: auto;
`;

export const ExamSummaryContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 15px;
  border: "2px solid rgb(233, 233, 233)";
`;

export const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => props.scrollPosition}%;
  height: 4px;
  background-color: blue;
  z-index: 100;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;
