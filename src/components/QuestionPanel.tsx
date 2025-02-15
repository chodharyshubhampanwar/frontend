import React from "react";
import { useTestStore } from "../store/testStore";

export const QuestionPanel: React.FC = () => {
  const {
    mockTest,
    currentQuestionIndex,
    userAnswers,
    setAnswer,
    toggleMarkQuestion,
  } = useTestStore();

  if (!mockTest) return null;

  const currentQuestion = mockTest.sections.flatMap(
    (section) => section.questions
  )[currentQuestionIndex];

  const userAnswer = userAnswers[currentQuestion.id];

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold">
        Question {currentQuestionIndex + 1}
      </div>

      <div className="text-lg">{currentQuestion.content}</div>

      <div className="space-y-4">
        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <label
            key={key}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name={`question-${currentQuestion.id}`}
              value={key}
              checked={userAnswer?.selectedOption === key}
              onChange={() => setAnswer(currentQuestion.id, key)}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">{value}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => toggleMarkQuestion(currentQuestion.id)}
          className={`px-4 py-2 rounded-lg ${
            userAnswer?.isMarked
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {userAnswer?.isMarked ? "Marked for Review" : "Mark for Review"}
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;
