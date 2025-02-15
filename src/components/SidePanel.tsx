import React from "react";
import { useTestStore } from "../store/testStore";
import { testService } from "../services/testService";

export const SidePanel: React.FC = () => {
  const {
    mockTest,
    userAnswers,
    currentQuestionIndex,
    setCurrentQuestion,
    completeTest,
  } = useTestStore();

  if (!mockTest) return null;

  const allQuestions = mockTest.sections.flatMap(
    (section) => section.questions
  );

  const getQuestionStatus = (questionId: string) => {
    const answer = userAnswers[questionId];
    if (!answer) return "unanswered";
    if (answer.isMarked) return "marked";
    if (answer.selectedOption) return "answered";
    return "unanswered";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-green-500 hover:bg-green-600";
      case "marked":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-300 hover:bg-gray-400";
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit the test?")) return;

    const answers = Object.entries(userAnswers).reduce(
      (acc, [questionId, answer]) => ({
        ...acc,
        [questionId]: answer.selectedOption,
      }),
      {}
    );

    try {
      const result = await testService.submitTest(mockTest.id, answers);
      completeTest(result);
    } catch (error) {
      console.error("Failed to submit test:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{mockTest.title}</h2>
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Answered</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Marked</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-sm">Unanswered</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mockTest.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <div className="grid grid-cols-5 gap-2">
              {section.questions.map((question) => {
                const globalIndex = allQuestions.findIndex(
                  (q) => q.id === question.id
                );
                const status = getQuestionStatus(question.id);
                return (
                  <button
                    key={question.id}
                    onClick={() => setCurrentQuestion(globalIndex)}
                    className={`
                      w-10 h-10 rounded-lg text-white font-medium
                      ${getStatusColor(status)}
                      ${
                        currentQuestionIndex === globalIndex
                          ? "ring-2 ring-blue-500"
                          : ""
                      }
                    `}
                  >
                    {globalIndex + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700
                 transition-colors duration-200"
      >
        Submit Test
      </button>
    </div>
  );
};

export default SidePanel;
// Rest of the code remains the same
