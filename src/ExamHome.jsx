import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useParams } from "react-router-dom";
import { getExam } from "./utils/api.js";
import LoadingIcon from "./components/Loading.jsx";
import Exam from "./Exam.jsx";
import useFullscreen from "./utils/fullScreen.js";
import { toTitleCase } from "./utils/stringCase.js";

import Assessment from "./components/Assessment.jsx";

const ExamHome = () => {
  const { currentUser } = useContext(AuthContext);
  const [exam, setExam] = useState([]);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { requestFullscreen } = useFullscreen();
  const { id } = useParams();
  const userId = currentUser.uid;

  useEffect(() => {
    const fetchExam = async () => {
      const exam = await getExam(id);
      setExam(exam);
      setIsLoading(false);
    };

    fetchExam();
  }, [id]);

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (isExamStarted) {
    return (
      <Exam
        sections={exam.sections}
        examId={id}
        userId={userId}
        duration={exam.duration}
        exam={exam}
      />
    );
  }

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

  const questionCounts = countQuestionTypes(exam.sections);

  return (
    <Assessment
      item={exam}
      loading={isLoading}
      onStart={() => {
        setIsExamStarted(true);
        requestFullscreen();
      }}
      questionCounts={questionCounts}
    />
  );
};

export default ExamHome;
