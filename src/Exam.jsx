import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "./icons/examIcons";
import LoadingIcon from "./components/Loading.jsx";
import { convertToTimeFormat } from "./utils/time.js";
import {
  StartTestButton,
  TimeDisplay,
  SectionButton,
  QuestionIcon,
  QuestionForm,
  FinishTestButton,
  Legends,
} from "./components/Exam/Question.jsx";
import {
  ExamContainer,
  SectionContainer,
  QuestionsContainer,
  StatusContainer,
  ExamWrapper,
  ExamContainerWrapper,
  NavIcon,
  ExamNav,
  QuestionInfo,
  MarksInfo,
  PositiveMarks,
  NegativeMarks,
  Palette,
  ExamTitle,
} from "./styles/Exam.js";
import { submitAnswer } from "./utils/api.js";

const Exam = ({ sections, examId, userId, duration, exam }) => {
  const maxExamTime = duration;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [examStartTime, setExamStartTime] = useState(null);
  // const [examEndTime, setExamEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(maxExamTime);
  const [timers, setTimers] = useState(
    sections.map((section) => new Array(section.questions.length).fill(0))
  );
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStatusContainerVisible, setIsStatusContainerVisible] =
    useState(false);

  const navigate = useNavigate();
  let intervalId = useRef(null);

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  const handleNavIconClick = () => {
    setIsStatusContainerVisible(!isStatusContainerVisible);
  };

  const handleStartTest = async () => {
    setLoading(true);
    const startTime = Date.now();
    setExamStartTime(startTime);
    localStorage.setItem("examStartTime", startTime.toString());
    localStorage.setItem("maxTime", maxExamTime.toString());
    localStorage.setItem("timers", JSON.stringify(timers));
    setIsTestStarted(true);
    setLoading(false);
    document.documentElement.requestFullscreen();
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOption({ questionId, selectedOption });
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSectionClick = (index) => {
    setCurrentSectionIndex(index);
    setCurrentQuestionIndex(0);
  };

  const handleClearResponse = (event) => {
    event.preventDefault();
    const questionId = currentQuestion._id;
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      delete newAnswers[questionId];
      localStorage.setItem("answers", JSON.stringify(newAnswers));
      return newAnswers;
    });
    setSelectedOption(null);
  };

  const handleAnswerQuestion = (event) => {
    event.preventDefault();
    const timeTaken = timers[currentSectionIndex][currentQuestionIndex];
    const questionId = currentSection.questions[currentQuestionIndex]._id;

    if (selectedOption) {
      const { questionId, selectedOption: option } = selectedOption;
      setAnswers((prevAnswers) => {
        const newAnswers = {
          ...prevAnswers,
          [questionId]: {
            sectionId: currentSection._id,
            questionId,
            selectedOption: option,
            timeTaken,
            skipped: false,
          },
        };
        localStorage.setItem("answers", JSON.stringify(newAnswers));
        return newAnswers;
      });
      setSelectedOption(null);
    } else {
      setAnswers((prevAnswers) => {
        const newAnswers = {
          ...prevAnswers,
          [questionId]: {
            sectionId: currentSection._id,
            questionId,
            selectedOption: "SKIPPED",
            timeTaken,
            skipped: true,
          },
        };
        localStorage.setItem("answers", JSON.stringify(newAnswers));
        return newAnswers;
      });
    }

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleSubmit = async (allAnswers, endTime) => {
    setLoading(true);
    try {
      const id = await submitAnswer(
        userId,
        examId,
        examStartTime,
        allAnswers,
        endTime
      );
      if (id) {
        navigate(`/exam/${id}/analysis`);
      } else {
        console.error("Failed to get exam analysis ID");
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetExam = () => {
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setExamStartTime(null);
    setTimeRemaining(maxExamTime);
    setTimers(
      sections.map((section) => new Array(section.questions.length).fill(0))
    );
    setIsTestStarted(false);
    localStorage.removeItem("examStartTime");
    localStorage.removeItem("maxTime");
    localStorage.removeItem("answers");
    localStorage.removeItem("examEndTime");
    localStorage.removeItem("timers");
  };

  const handleFinishTest = async () => {
    setLoading(true);
    clearInterval(intervalId.current);
    const endTime = Date.now();
    localStorage.setItem("examEndTime", endTime.toString());

    const allAnswers = { ...answers };
    sections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        if (!allAnswers[question._id]) {
          allAnswers[question._id] = {
            sectionId: section._id,
            questionId: question._id,
            selectedOption: "SKIPPED",
            timeTaken: timers[sectionIndex][questionIndex],
            skipped: true,
          };
        }
      });
    });

    await handleSubmit(allAnswers, endTime);
    resetExam();
  };
  ///////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const storedStartTime = localStorage.getItem("examStartTime");
    const storedAnswers = localStorage.getItem("answers");
    const storedTimers = localStorage.getItem("timers");
    if (storedTimers) {
      setTimers(JSON.parse(storedTimers));
    }
    if (storedStartTime) {
      const startTime = Number(storedStartTime);
      setExamStartTime(startTime);
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setTimeRemaining(maxExamTime - elapsedSeconds);
      setIsTestStarted(true);
    }
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  useEffect(() => {
    if (!isTestStarted) {
      return;
    }

    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        newTimers[currentSectionIndex] = [...newTimers[currentSectionIndex]];
        newTimers[currentSectionIndex][currentQuestionIndex] += 1;
        localStorage.setItem("timers", JSON.stringify(newTimers));
        return newTimers;
      });
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [isTestStarted, currentQuestionIndex, currentSectionIndex]);

  useEffect(() => {
    const startTime = localStorage.getItem("examStartTime");
    const maxTime = localStorage.getItem("maxTime");
    if (startTime && maxTime) {
      const elapsedTime = (Date.now() - Number(startTime)) / 1000;
      const remainingTime = Number(maxTime) - elapsedTime;
      setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
    }
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleFinishTest();
    }
  }, [timeRemaining]);

  if (!currentQuestion) {
    return <LoadingIcon />;
  }

  const questionStatuses = sections.map((section) =>
    section.questions.map((question) =>
      answers[question._id]
        ? answers[question._id].skipped
          ? "skipped"
          : "answered"
        : "unanswered"
    )
  );

  return (
    <ExamContainer>
      {loading ? (
        <LoadingIcon />
      ) : !isTestStarted ? (
        <StartTestButton handleStartTest={handleStartTest} />
      ) : (
        <>
          <ExamNav>
            <ExamTitle>{exam.title}</ExamTitle>
            <TimeDisplay
              time={convertToTimeFormat(
                Math.round(timeRemaining),
                "hhmmss",
                "seconds"
              )}
              label="Time Left"
            />
            <NavIcon onClick={handleNavIconClick} />
          </ExamNav>
          <ExamContainerWrapper>
            <ExamWrapper>
              <SectionContainer>
                <span>{"Sections |"}</span>
                {sections.map((section, index) => (
                  <SectionButton
                    section={section}
                    index={index}
                    handleSectionClick={handleSectionClick}
                    currentSectionIndex={currentSectionIndex}
                  />
                ))}
              </SectionContainer>

              <QuestionInfo>
                <span>{`Question: ${currentQuestionIndex + 1}`}</span>
                <MarksInfo>
                  {"Marks"}
                  <PositiveMarks>{`+ : ${
                    currentQuestion.marks || 0
                  }`}</PositiveMarks>
                  <NegativeMarks>{`- : ${
                    currentQuestion.negativeMarks || 0
                  }`}</NegativeMarks>
                </MarksInfo>
                <TimeDisplay
                  time={timers[currentSectionIndex][currentQuestionIndex] || 0}
                  label="Time"
                />
              </QuestionInfo>
              <QuestionForm
                currentSection={currentSection}
                currentQuestion={currentQuestion}
                handleAnswerQuestion={handleAnswerQuestion}
                handleOptionChange={handleOptionChange}
                handleClearResponse={handleClearResponse}
                answers={answers}
                selectedOption={selectedOption}
                exam={exam}
              />
            </ExamWrapper>

            <StatusContainer isVisible={isStatusContainerVisible}>
              <Palette>{"Legend"}</Palette>
              <Legends />
              <Palette>{"Questions Palette: " + currentSection.title}</Palette>
              <QuestionsContainer>
                {currentSection.questions.map((_, index) => {
                  const Icon = icons[index];
                  const status = questionStatuses[currentSectionIndex][index];
                  return (
                    <QuestionIcon
                      index={index}
                      Icon={Icon}
                      status={status}
                      handleQuestionClick={handleQuestionClick}
                    />
                  );
                })}
              </QuestionsContainer>
              <FinishTestButton handleFinishTest={handleFinishTest} />
            </StatusContainer>
          </ExamContainerWrapper>
        </>
      )}
    </ExamContainer>
  );
};

export default Exam;
