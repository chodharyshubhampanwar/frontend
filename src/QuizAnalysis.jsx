import React, { useEffect, useState } from "react";
import { getQuizAnalysis } from "./utils/api.js";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "./styles/Spinner.js";
import { Icon } from "@iconify/react";
import {
  Container,
  Title,
  Score,
  QuestionsWrapper,
  QuestionContainer,
  QuestionNumber,
  QuestionText,
  AnswerText,
  CorrectAnswerText,
  SolutionText,
  MainContainer,
  ScoreContainer,
  ScoreItem,
  AnalysisContainer,
  ScoreTitle,
  ScoreStatus,
  Circle,
} from "./styles/QuizAnalysis.js";

import Modal from "./components/ModalQuestion.jsx";

const QuizAnalysis = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const openModal = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentQuestion(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getQuizAnalysis(id);
        setQuizData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner size="48px" />;
  }

  console.log(quizData);

  const percentage = Math.round(
    (quizData.userQuiz.correctAnswers / quizData.userQuiz.totalQuestions) * 100
  );

  let color;
  if (percentage > 70) {
    color = "#00d26a";
  } else if (percentage < 40) {
    color = "#f8312f";
  } else {
    color = "#fcd53f";
  }

  return (
    <AnalysisContainer>
      <span>
        <Icon icon="fxemoji:trophy" width={50} height={50} />
      </span>
      <Title>{quizData.userQuiz.quiz.name}</Title>
      <MainContainer>
        <Container>
          <ScoreTitle> {"Questions"}</ScoreTitle>
          <QuestionsWrapper>
            {quizData.userQuiz.answers.map((answer, index) => (
              <QuestionContainer
                key={index}
                isCorrect={answer.isCorrect}
                openModal={openModal}
                title="Click to know more"
              >
                <QuestionNumber
                  isCorrect={answer.isCorrect}
                  onClick={() => openModal(answer)}
                >
                  {index + 1}
                </QuestionNumber>
              </QuestionContainer>
            ))}

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              {currentQuestion && (
                <div>
                  <QuestionText>
                    {"Question"}: {currentQuestion.question.text}
                  </QuestionText>
                  {"Your answer"}:
                  <AnswerText isCorrect={currentQuestion.isCorrect}>
                    {currentQuestion.selectedOption}
                  </AnswerText>
                  {"Correct answer"}:
                  <CorrectAnswerText>
                    {currentQuestion.question.correctAnswer}
                  </CorrectAnswerText>
                  {"Solution"}:
                  <SolutionText>
                    {currentQuestion.question.explanation}
                  </SolutionText>
                </div>
              )}
            </Modal>
          </QuestionsWrapper>
        </Container>

        <ScoreContainer>
          <ScoreTitle> {"Your Result"}</ScoreTitle>
          <Circle color={color}>{percentage}%</Circle>
          <ScoreItem>
            <Score>
              <Icon
                icon="fluent-emoji-flat:blue-circle"
                width={20}
                height={20}
              />
              <span>{"Score"}</span>
            </Score>
            <ScoreStatus>{quizData.userQuiz.totalScore}</ScoreStatus>
          </ScoreItem>
          <ScoreItem>
            <Score>
              <Icon
                icon="fluent-emoji-flat:green-circle"
                width={20}
                height={20}
              />
              <span>{"Correct"}</span>
            </Score>
            <ScoreStatus>{quizData.userQuiz.correctAnswers}</ScoreStatus>
          </ScoreItem>
          <ScoreItem>
            <Score>
              <Icon
                icon="fluent-emoji-flat:red-circle"
                width={20}
                height={20}
              />
              <span>{"InCorrect"}</span>
            </Score>
            <ScoreStatus>{quizData.userQuiz.incorrectAnswers}</ScoreStatus>
          </ScoreItem>
        </ScoreContainer>
      </MainContainer>
    </AnalysisContainer>
  );
};

export default QuizAnalysis;
