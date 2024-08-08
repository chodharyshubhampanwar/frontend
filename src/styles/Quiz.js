import styled from "styled-components";

export const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  height: 100vh;
  background-color: #0c111d;
`;

export const QuestionWrapper = styled.div`
  flex-grow: 1;
`;

export const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 24px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

export const QuizProgress = styled.progress`
  width: 100%;
  height: 1rem;
`;
