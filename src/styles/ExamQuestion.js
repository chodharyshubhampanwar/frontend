import styled from "styled-components";

export const QuestionFormWrapper = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const StartExam = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-size: 2rem;
`;

export const StartItemButton = styled.button`
  padding: 10px 20px;
  max-width: 400px;
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

export const QuestionNumber = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.status};
  color: white;
  font-weight: 700;
`;

export const QuestionActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 1;
  span {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const LegendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
  }
`;

export const Button = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.color || "#2823ee"};
  background-color: ${(props) => props.backgroundColor || "#ffcd1f"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#ffdc62"};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const StatusActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;
