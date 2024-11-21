import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "./utils/api";

// Styled Components
const Container = styled.div`
  background-color: #181818;
  padding: 20px;
  border-radius: 10px;
`;

const Header = styled.h1`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  background-color: #1f1f1f;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const QuestionText = styled.span`
  flex-grow: 1;
  color: white;
`;

const DifficultyTag = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.difficulty === "Easy"
      ? "#22c55e"
      : props.difficulty === "Medium"
      ? "#f59e0b"
      : "#ef4444"};
  color: white;
`;

const AcceptanceRate = styled.span`
  color: #9ca3af;
  margin-left: 10px;
`;

// Main Component
const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axiosInstance.get("/questions").then((response) => {
      setQuestions(response.data.questions);
    });
  }, []);

  return (
    <Container>
      <Header>Questions</Header>
      <QuestionList>
        {questions.map((question) => (
          <QuestionItem key={question._id}>
            <Link to={`/questions/${question._id}`}>
              <QuestionText>{question.text}</QuestionText>
            </Link>
            {/* Replace the 'Medium' with actual difficulty from your API */}
            <DifficultyTag difficulty={"Medium"}>Medium</DifficultyTag>
            {/* Replace with actual acceptance rate */}
            <AcceptanceRate>60.4%</AcceptanceRate>
          </QuestionItem>
        ))}
      </QuestionList>
    </Container>
  );
};

export default Questions;
