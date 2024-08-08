import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuiz } from "./utils/api.js";
import LoadingIcon from "./components/Loading.jsx";
import Quiz from "./Quiz.jsx";
import useFullscreen from "./utils/fullScreen.js";
import { toTitleCase } from "./utils/stringCase.js";

import Assessment from "./components/Assessment.jsx";

const QuizHome = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { requestFullscreen } = useFullscreen();

  const handleQuizEnd = () => {
    setIsQuizStarted(false);
    setIsQuizEnded(true);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const quiz = await getQuiz(id);
      setQuiz(quiz);
      setIsLoading(false);
    };

    fetchQuiz();
  }, [id]);

  if (isLoading || isQuizEnded) {
    return <LoadingIcon />;
  }

  if (isQuizStarted) {
    return <Quiz quiz={quiz} onQuizEnd={handleQuizEnd} />;
  }

  console.log(quiz);

  function countQuestionTypes(sections) {
    const counts = {};
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        const type = toTitleCase(question.type);
        if (!counts[type]) {
          counts[type] = 1;
        } else {
          counts[type]++;
        }
      });
    });
    return counts;
  }

  const questionCounts = countQuestionTypes(quiz.sections);

  return (
    <Assessment
      item={quiz}
      onStart={() => {
        setIsQuizStarted(true);
        setIsQuizEnded(false);
        requestFullscreen();
      }}
      questionCounts={questionCounts}
    />
  );
};

export default QuizHome;
