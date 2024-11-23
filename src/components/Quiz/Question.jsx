import React, { useState, useEffect } from "react";
import {
  QuestionForm,
  QuestionText,
  OptionContainer,
  OptionInput,
  SubmitButton,
} from "../../styles/Question.js";
import { FaSpinner } from "react-icons/fa";
import MathEquation from "../../components/MathEquation.jsx";

const Question = ({ question, onAnswer, submitting }) => {
  const [answer, setAnswer] = useState("");

  const decodeMathEquation = (equation) => {
    return equation.replace(/\\\\/g, "\\").replace(/\\n/g, "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnswer(answer);
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    setAnswer("");
  }, [question]);

  return (
    <QuestionForm onSubmit={handleSubmit}>
      <QuestionText>
        {question.type === "math" ? (
          <MathEquation equation={decodeMathEquation(question.equation)} />
        ) : (
          question.text
        )}
      </QuestionText>

      {question.type === "multiple_choice" &&
        question.options.map((option, index) => (
          <OptionContainer key={index}>
            <OptionInput
              type="radio"
              id={`option${index}`}
              name="option"
              value={option}
              onChange={handleChange}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </OptionContainer>
        ))}
      {question.type === "fill_in_the_blank" && (
        <OptionInput type="text" onChange={handleChange} />
      )}
      {question.type === "math" &&
        question.options.map((option, index) => (
          <OptionContainer key={index}>
            <OptionInput
              type="radio"
              id={`option${index}`}
              name="option"
              value={option}
              onChange={handleChange}
            />
            <label htmlFor={`option${index}`}>
              {
                <MathEquation
                  equation={decodeMathEquation(option)}
                  displayMode={true}
                />
              }
            </label>
          </OptionContainer>
        ))}
      {/* {question.type === "math" && (
        <MathEquation
          equation={decodeMathEquation(question.equation)}
          displayMode={true}
        />
      )} */}
      {question.type === "true_false" && (
        <div>
          <OptionContainer>
            <OptionInput
              type="radio"
              id="true"
              name="option"
              value="true"
              onChange={handleChange}
            />
            <label htmlFor="true">True</label>
          </OptionContainer>
          <OptionContainer>
            <OptionInput
              type="radio"
              id="false"
              name="option"
              value="false"
              onChange={handleChange}
            />
            <label htmlFor="false">False</label>
          </OptionContainer>
        </div>
      )}

      <SubmitButton type="submit" disabled={!answer || submitting}>
        {submitting ? <FaSpinner /> : "Submit"}
      </SubmitButton>
    </QuestionForm>
  );
};

export default Question;
