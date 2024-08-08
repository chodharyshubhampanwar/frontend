import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  color: #000;
  margin-bottom: 32px;
  letter-spacing: normal;
  line-height: 1.25;
  font-weight: 700;
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  padding: 10px 20px;
  gap: 10px;
`;

export const ScoreTitle = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #333;
  padding: 10px 20px;
`;

export const ScoreStatus = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  padding: 10px 20px;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const QuestionTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const QuestionText = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #666;
  margin-bottom: 10px;
`;

export const AnswerText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
  color: ${(props) => (props.isCorrect ? "green" : "red")};
`;

export const CorrectAnswerText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
  color: #000;
`;

export const SolutionText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 400;
  color: #333;
`;

export const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const QuestionsWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  flex: 3;
  margin-right: 20px;
  background-color: #ffffff;
  padding: 20px 0px;
  @media (max-width: 768px) {
    margin-right: 0px;
    margin-top: 20px;
  }
`;

export const ScoreContainer = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  padding: 20px 0px;
`;

export const ScoreItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AnalysisContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const Circle = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 30px;
  border: ${(props) => `5px solid ${props.color}`};
`;

export const QuestionNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isCorrect ? "#aea" : "#fbb7b7")};
  color: ${(props) => (props.isCorrect ? "green" : "red")};
`;
