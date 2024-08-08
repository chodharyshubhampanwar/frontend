import React, { useState } from "react";
import Modal from "./../Modal.jsx";
import {
  QuestionFormWrapper,
  QuestionNumber,
  StartExam,
  StartItemButton,
  QuestionWrapper,
  QuestionActionsWrapper,
  LegendsWrapper,
  LegendItem,
  Button,
  StatusActions,
} from "../../styles/ExamQuestion";

// StartTestButton.js
export const StartTestButton = ({ handleStartTest }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <StartExam>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        {
          "I agree that i would not cheat in the exam and i would not use any unfair means to attempt the exam."
        }
      </label>
      <StartItemButton onClick={handleStartTest} disabled={!isChecked}>
        Start Now
      </StartItemButton>
    </StartExam>
  );
};

// TimeDisplay.js

export const TimeDisplay = ({ time, label }) => (
  <>
    {label}: {time}
  </>
);

// SectionButton.js
export const SectionButton = ({
  section,
  index,
  handleSectionClick,
  currentSectionIndex,
}) => (
  <button
    key={section._id}
    onClick={() => handleSectionClick(index)}
    style={{
      backgroundColor:
        index === currentSectionIndex ? "#4255ff" : "transparent",
      border: "none",
      color: index === currentSectionIndex ? "#ffffff" : "black",
      padding: "6px 12px",
      borderRadius: "10px",
      marginLeft: "10px",
      fontSize: "14px",
      fontWeight: "600",
    }}
  >
    {section.title}
  </button>
);

export const QuestionForm = ({
  currentQuestion,
  handleAnswerQuestion,
  handleOptionChange,
  handleClearResponse,
  answers,
  selectedOption,
}) => {
  return (
    <QuestionFormWrapper onSubmit={handleAnswerQuestion}>
      {currentQuestion && currentQuestion.options && (
        <QuestionWrapper>
          <span>{currentQuestion.text}</span>
          {currentQuestion.options.map((option) => (
            <div key={option} style={{ display: "flex", marginBottom: "10px" }}>
              <input
                type="radio"
                name={currentQuestion._id}
                value={option}
                checked={
                  answers[currentQuestion._id] === option ||
                  (selectedOption?.selectedOption === option &&
                    selectedOption?.questionId === currentQuestion._id)
                }
                onChange={() => handleOptionChange(currentQuestion._id, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </QuestionWrapper>
      )}
      <QuestionActionsWrapper>
        <Button
          color="white"
          backgroundColor="#0a092d"
          hoverColor="#4255ff"
          onClick={handleClearResponse}
        >
          Clear Response
        </Button>
        <Button
          type="submit"
          color="white"
          backgroundColor="#4255ff"
          hoverColor="#0a092d"
        >
          Submit & Next
        </Button>
      </QuestionActionsWrapper>
    </QuestionFormWrapper>
  );
};

export const Legends = () => (
  <LegendsWrapper>
    <LegendItem color="green">
      <span>Answered</span>
    </LegendItem>
    <LegendItem color="red">
      <span>Skipped</span>
    </LegendItem>
    <LegendItem color="grey">
      <span>Not Answered</span>
    </LegendItem>
  </LegendsWrapper>
);

// QuestionIcon.js

export const QuestionIcon = ({ index, status, handleQuestionClick }) => {
  let color;
  switch (status) {
    case "answered":
      color = "green";
      break;
    case "skipped":
      color = "red";
      break;
    default:
      color = "grey";
  }
  return (
    <QuestionNumber
      onClick={() => handleQuestionClick(index)}
      key={index}
      value={{ color }}
      status={color}
    >
      {index + 1}
    </QuestionNumber>
  );
};

// FinishTestButton.js
export const FinishTestButton = ({ handleFinishTest }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirm = () => {
    handleFinishTest();
    setIsModalVisible(false);
  };

  return (
    <StatusActions>
      {/* <Button color="white" backgroundColor="#4255ff" hoverColor="#0a092d">
        Question Paper
      </Button> */}
      <Button
        color="#282e3e"
        backgroundColor="#ffcd1f"
        hoverColor="#ffedab"
        onClick={() => setIsModalVisible(true)}
      >
        Finish Test
      </Button>
      {isModalVisible && (
        <Modal
          title="End Exam"
          message="Are you sure you want to end and submit exam?"
          onCancel={() => setIsModalVisible(false)}
          onOk={handleConfirm}
        />
      )}
    </StatusActions>
  );
};
