import React, { useState } from "react";

const SectionQuestions = ({ data }) => {
  const [showQuestionDetails, setShowQuestionDetails] = useState(false);

  const handleClick = () => {
    setShowQuestionDetails(!showQuestionDetails);
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      <button onClick={handleClick}>
        {showQuestionDetails ? "Hide Data" : "Show Data"}
      </button>
      {showQuestionDetails && (
        <div>
          {data.analysis.sections.map((section, index) => (
            <div key={index}>
              <h2>{section.name}</h2>
              {section.questions.map((question, qIndex) => {
                return (
                  <div key={qIndex}>
                    <p
                      onClick={() =>
                        setShowQuestionDetails(!showQuestionDetails)
                      }
                    >
                      {question.question.text}
                    </p>
                    {showQuestionDetails && (
                      <div>
                        <p>{question.question.correctAnswer}</p>
                        <p>{question.question.marks}</p>
                        <p>{question.userAnswer}</p>
                        <ul>
                          {question.question?.options?.map((option, oIndex) => (
                            <li key={oIndex}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionQuestions;
