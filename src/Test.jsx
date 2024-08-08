import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "./Test.css";

function Test({ test }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = currentUser.uid;

  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [questionStatuses, setQuestionStatuses] = useState(
    JSON.parse(localStorage.getItem("questionStatuses")) ||
      test.sections.map((section) => section.questions.map(() => "unattended"))
  );
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    JSON.parse(localStorage.getItem("timeLeft")) || 3 * 60 * 60
  );
  const [startTime, setStartTime] = useState(
    JSON.parse(localStorage.getItem("startTime")) || null
  );
  const [showPdf, setShowPdf] = useState(false);
  const [isTestSectionVisible, setIsTestSectionVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer;
    if (testStarted && !testFinished && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      alert("Time is up!");
      finishTest();
    }
    return () => clearTimeout(timer);
  }, [testStarted, testFinished, timeLeft]);

  useEffect(() => {
    localStorage.setItem("questionStatuses", JSON.stringify(questionStatuses));
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    localStorage.setItem("startTime", JSON.stringify(startTime));
  }, [questionStatuses, timeLeft, startTime]);

  const handleSectionClick = (index) => {
    setSelectedSectionIndex(index);
    setSelectedQuestionIndex(0);
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
  };

  const handleStatusChange = (status) => {
    const newStatuses = [...questionStatuses];
    newStatuses[selectedSectionIndex][selectedQuestionIndex] = status;
    setQuestionStatuses(newStatuses);
  };

  const handleNextClick = () => {
    if (
      selectedQuestionIndex <
      test.sections[selectedSectionIndex].questions.length - 1
    ) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    } else if (selectedSectionIndex < test.sections.length - 1) {
      setSelectedSectionIndex(selectedSectionIndex + 1);
      setSelectedQuestionIndex(0);
    }
  };

  const handlePrevClick = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
    } else if (selectedSectionIndex > 0) {
      setSelectedSectionIndex(selectedSectionIndex - 1);
      setSelectedQuestionIndex(
        test.sections[selectedSectionIndex - 1].questions.length - 1
      );
    }
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case "marked":
        return "purple";
      case "answered":
        return "green";
      case "unanswered":
        return "red";
      case "unattended":
        return "grey";
      default:
        return "black";
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes}:${secs}`;
  };

  const postData = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  const finishTest = async () => {
    setTestFinished(true);
    const endTime = Date.now();
    const newStatuses = test.sections.map((section, sectionIndex) => ({
      sectionId: section._id,
      questions: section.questions.map((question, questionIndex) => ({
        questionId: question._id,
        status:
          questionStatuses[sectionIndex][questionIndex] === "unattended"
            ? "unanswered"
            : questionStatuses[sectionIndex][questionIndex],
      })),
    }));
    setQuestionStatuses(newStatuses);

    const data = {
      userId,
      testId: test._id,
      startTime,
      endTime,
      questionStatuses: newStatuses,
    };

    try {
      const response = await postData(
        "https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/submitTest",
        data
      );
      console.log("Test submitted successfully:", response.data);
      const finishTesId = response.data._id;

      localStorage.removeItem("questionStatuses");
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("startTime");

      setIsSubmitting(false);
      if (finishTesId) {
        navigate(`/testanalysis/${finishTesId}`);
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("An error occurred while submitting the test. Please try again.");
    }
  };

  const startTest = () => {
    setTestStarted(true);
    setStartTime(Date.now());
    setTimeLeft(3 * 60 * 60); // Reset time to 3 hours
    setQuestionStatuses(
      test.sections.map((section) => section.questions.map(() => "unattended"))
    );
  };

  const toggleTestSection = () => {
    setIsTestSectionVisible(!isTestSectionVisible);
  };

  if (isSubmitting) {
    return (
      <div className="loading-screen">
        <h2>Submitting your test...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  function Question({ question }) {
    return (
      <div
        style={{
          boxSizing: "border-box",
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
          flex: 2,
        }}
      >
        <img
          src={question.image}
          alt="question"
          style={{ maxWidth: "90%", overflow: "hidden" }}
        />
        {question?.options?.map((option, oIndex) => (
          <p key={oIndex}>{option}</p>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "lightgrey",
        margin: 0,
        padding: 0,
      }}
    >
      {testStarted ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
            >
              <h2>{"Sections |"}</h2>
              {test.sections.map((section, index) => (
                <div
                  key={section._id}
                  onClick={() => handleSectionClick(index)}
                  style={{
                    backgroundColor:
                      index === selectedSectionIndex ? "blue" : "transparent",
                  }}
                >
                  {section.title}
                </div>
              ))}
            </div>

            {showPdf ? (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <iframe src={test.paper} width="100%" height="100%"></iframe>
              </div>
            ) : (
              <Question
                question={
                  test.sections[selectedSectionIndex].questions[
                    selectedQuestionIndex
                  ]
                }
              />
            )}

            <div
              style={{
                border: "0.5px solid black",
                padding: "10px",
                margin: "10px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleStatusChange("marked")}>
                  Mark
                </button>
                <button onClick={() => handleStatusChange("answered")}>
                  Answer
                </button>
                <button onClick={() => handleStatusChange("unanswered")}>
                  Skip
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handlePrevClick}>Previous</button>
                <button onClick={handleNextClick}>Next</button>
                <button onClick={toggleTestSection} className="hamburger">
                  ☰
                </button>
              </div>
            </div>
          </div>

          <div
            className={`test-section ${!isTestSectionVisible ? "hidden" : ""}`}
          >
            <h2>Time left: {formatTime(timeLeft)}</h2>
            <div
              style={{
                border: "0.5px solid black",
                padding: "10px",
                margin: "10px",
                height: "50vh",
                backgroundColor: "biege",
              }}
            >
              {test.sections[selectedSectionIndex].questions.map(
                (question, qIndex) => (
                  <div
                    key={question._id}
                    onClick={() => handleQuestionClick(qIndex)}
                    style={{
                      cursor: "pointer",
                      color: getColorForStatus(
                        questionStatuses[selectedSectionIndex][qIndex]
                      ),
                    }}
                  >
                    {`Question ${qIndex + 1}`}
                  </div>
                )
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                border: "0.5px solid black",
                padding: "10px",
                margin: "10px",
                height: "20vh",
              }}
            >
              <button onClick={finishTest}>Finish Test</button>
              <button onClick={() => setShowPdf(!showPdf)}>
                Show/Hide Paper
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <button style={{ display: "flex" }} onClick={startTest}>
            I am ready to begin the test
          </button>
        </div>
      )}
    </div>
  );
}

export default Test;
