import React, { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Question from "./components/Quiz/Question.jsx";
import {
  QuizContainer,
  QuizHeader,
  QuizProgress,
  QuestionWrapper,
} from "./styles/Quiz.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { submitQuiz } from "./utils/api.js";
import useFullscreen from "./utils/fullScreen.js";
import Modal from "./components/Modal.jsx";

const Quiz = ({ quiz, onQuizEnd }) => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [optionSelected, setOptionSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentQuestion =
    quiz.sections[currentSectionIndex]?.questions[currentQuestionIndex];
  const totalQuestions = quiz.sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );
  const timePerQuestion = Math.floor(quiz.duration / totalQuestions);
  const [questionTimer, setQuestionTimer] = useState(timePerQuestion);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { exitFullscreen } = useFullscreen();

  const handleSubmitQuiz = async (userAnswers) => {
    setSubmitting(true);
    try {
      const response = await submitQuiz(userAnswers, userId, quiz._id);
      const userQuiz = response.userQuiz;
      navigate(`/quiz/${userQuiz._id}/analysis`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("questionTimer", questionTimer);
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [questionTimer, answers]);

  const handleNextQuestion = async () => {
    setOptionSelected(false);
    setAnswers((prevAnswers) => {
      const currentQuestionId =
        quiz.sections[currentSectionIndex].questions[currentQuestionIndex]._id;
      const currentQuestionAnswered = prevAnswers.some(
        (answer) => answer.question === currentQuestionId
      );

      let newAnswers = [...prevAnswers];
      if (!currentQuestionAnswered) {
        const skippedAnswer = {
          section: quiz.sections[currentSectionIndex]._id,
          question: currentQuestionId,
          selectedOption: "skipped",
        };
        newAnswers.push(skippedAnswer);
      }

      return newAnswers;
    });
    if (
      currentQuestionIndex + 1 <
      quiz.sections[currentSectionIndex].questions.length
    ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (currentSectionIndex + 1 < quiz.sections.length) {
      setCurrentSectionIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsQuizEnded(true);
    }
    setQuestionTimer(timePerQuestion);
  };

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const answerObject = {
        section: quiz.sections[currentSectionIndex]._id,
        question:
          quiz.sections[currentSectionIndex].questions[currentQuestionIndex]
            ._id,
        selectedOption: answer,
      };
      setOptionSelected(true);

      return [...prevAnswers, answerObject];
    });
  };

  const handleQuizEnd = async () => {
    try {
      await handleSubmitQuiz(answers);
    } catch (error) {
      console.error("Error in handleQuizEnd:", error);
    } finally {
      resetQuiz();
      onQuizEnd();
    }
  };

  const resetQuiz = () => {
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestionTimer(timePerQuestion);
    setIsQuizEnded(false);
    setSubmitting(false);
    localStorage.removeItem("questionTimer");
    localStorage.removeItem("answers");
    exitFullscreen();
  };

  useEffect(() => {
    const savedQuestionTimer = localStorage.getItem("questionTimer");
    const savedAnswers = localStorage.getItem("answers");

    if (savedQuestionTimer) {
      setQuestionTimer(parseInt(savedQuestionTimer, 10));
    }

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    const interval = setInterval(() => {
      if (!isQuizEnded && questionTimer > 0) {
        setQuestionTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(interval);
        if (!isQuizEnded) {
          handleNextQuestion();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isQuizEnded, questionTimer]);

  useEffect(() => {
    if (isQuizEnded) {
      handleQuizEnd();
    }
  }, [isQuizEnded]);

  useEffect(() => {
    if (optionSelected) {
      handleNextQuestion();
    }
  }, [optionSelected]);

  const handleExit = () => {
    setShowModal(true);
  };

  return (
    <QuizContainer>
      <QuizHeader>
        <span>{quiz.name}</span>
        <span>{questionTimer}</span>
        <span onClick={handleExit} style={{ cursor: "pointer" }}>
          <Icon icon="mingcute:close-fill" width={20} height={20} />
        </span>
        {showModal && (
          <Modal
            title="End Quiz"
            message="Are you sure you want to end the quiz?"
            onCancel={() => setShowModal(false)}
            onOk={() => {
              resetQuiz();
              navigate(0);
            }}
          />
        )}
      </QuizHeader>

      <QuestionWrapper>
        {currentQuestion && (
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            optionSelected={optionSelected}
            submitting={submitting}
          />
        )}
      </QuestionWrapper>
      <QuizProgress value={currentQuestionIndex} max={totalQuestions} />
    </QuizContainer>
  );
};

export default Quiz;
