import styled from "styled-components";

export const TestContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Arial", sans-serif;
`;

export const Sidebar = styled.div`
  width: 20%;
  background-color: #f8f9fa;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Timer = styled.div`
  margin: 20px 0;
  font-size: 1.5em;
  font-weight: bold;
  color: #d9534f;
`;

export const QuestionButton = styled.button`
  background-color: ${(props) =>
    props.status === "answered"
      ? "#5cb85c"
      : props.status === "unanswered"
      ? "#f0ad4e"
      : "#d9d9d9"};
  color: #fff;
  border: none;
  margin: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.8)};
`;

export const StatusButton = styled.div`
  background-color: ${(props) =>
    props.status === "answered"
      ? "#5cb85c"
      : props.status === "unanswered"
      ? "#f0ad4e"
      : "#d9d9d9"};
  padding: 5px 10px;
  color: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 0.9em;
`;

export const ControlButtons = styled.div`
  margin-top: auto;
  button {
    background-color: #0275d8;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
  }
  button:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const QuestionPanel = styled.div`
  width: 80%;
  padding: 30px;
`;

export const QuestionDisplay = styled.div`
  margin-bottom: 20px;
  h3 {
    margin-bottom: 15px;
  }
`;

export const Option = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 10px 20px;
    background-color: #0275d8;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;
