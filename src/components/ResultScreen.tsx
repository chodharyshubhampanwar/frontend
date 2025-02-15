import React from "react";
import { useTestStore } from "../store/testStore";
import { Option } from "../types/test";

export const ResultScreen: React.FC = () => {
  const { mockTest, examResult, userAnswers } = useTestStore();

  if (!mockTest || !examResult) return null;

  const allQuestions = mockTest.sections.flatMap(
    (section) => section.questions
  );

  const getOptionLabel = (option: keyof Option) => {
    return option.toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Result Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Exam Results</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="text-green-800 text-lg font-semibold">Correct</div>
            <div className="text-2xl font-bold">{examResult.correct}</div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <div className="text-red-800 text-lg font-semibold">Incorrect</div>
            <div className="text-2xl font-bold">{examResult.incorrect}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-gray-800 text-lg font-semibold">
              Unanswered
            </div>
            <div className="text-2xl font-bold">{examResult.unanswered}</div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <div className="text-blue-800 text-lg font-semibold">
              Total Marks
            </div>
            <div className="text-2xl font-bold">{examResult.totalMarks}</div>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg">
            <div className="text-orange-800 text-lg font-semibold">
              Negative Marks
            </div>
            <div className="text-2xl font-bold">{examResult.negativeMarks}</div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <div className="text-purple-800 text-lg font-semibold">
              Final Score
            </div>
            <div className="text-2xl font-bold">{examResult.finalScore}</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Question-wise Analysis</h3>
        <div className="space-y-6">
          {allQuestions.map((question, index) => {
            const userAnswer = userAnswers[question.id]?.selectedOption;
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Q{index + 1}.</span>
                  <span>{question.content}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 ml-6">
                  {Object.entries(question.options).map(([key, value]) => (
                    <div
                      key={key}
                      className={`p-2 rounded ${
                        key === question.correctAnswer
                          ? "bg-green-100"
                          : key === userAnswer
                          ? "bg-red-100"
                          : "bg-gray-50"
                      }`}
                    >
                      {getOptionLabel(key as keyof Option)}. {value}
                    </div>
                  ))}
                </div>

                <div className="mt-2 ml-6">
                  <div
                    className={`font-medium ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {userAnswer
                      ? `Your answer: ${getOptionLabel(userAnswer)} ${
                          isCorrect ? "(Correct)" : "(Incorrect)"
                        }`
                      : "Not attempted"}
                  </div>
                  <div className="text-gray-600 mt-1">
                    <span className="font-medium">Explanation:</span>{" "}
                    {question.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
