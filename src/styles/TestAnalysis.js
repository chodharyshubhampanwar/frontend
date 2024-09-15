import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 800px;
  margin: 32px auto;
`;

export const Header = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 16px;
`;

export const InfoText = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Section = styled.div`
  margin-top: 24px;
`;

export const SectionTitle = styled.h3`
  color: #444;
  font-size: 18px;
  margin-bottom: 12px;
`;

export const Question = styled.div`
  margin-bottom: 16px;
`;

export const QuestionText = styled.p`
  color: #555;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const StatusText = styled.p`
  color: ${(props) =>
    props.status === "correct"
      ? "#4caf50"
      : props.status === "incorrect"
      ? "#f44336"
      : "#ff9800"};
  font-weight: bold;
  font-size: 14px;
`;

export const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 32px;
`;
