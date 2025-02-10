// Quiz Component
// import { toast } from "react-hot-toast";
import { cn } from "../lib/utils";
import {
  AiOutlineLoading3Quarters,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { useQuizContext } from "../context/QuizContext";
import { Quiz } from "../types/quiz";

interface QuizComponentProps {
  quiz: Quiz;
}

export const QuizComponent = ({ quiz }: QuizComponentProps) => {
  const {
    state: { currentQuestionIndex, userAnswers },
    isLoading,
    nextQuestion,
    previousQuestion,
    // submitAnswer,
    dispatch,
  } = useQuizContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AiOutlineLoading3Quarters className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  // const handleSubmitAnswer = async (questionId: string, answer: string) => {
  //   try {
  //     await submitAnswer(questionId, answer);
  //     toast.success("Answer submitted successfully!");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error("An unknown error occurred");
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Score: {Object.keys(userAnswers).length} / {quiz.questions.length}
            </span>
          </div>

          <div className="py-4">
            <p className="text-lg text-gray-800">{currentQuestion.content}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                // onClick={() => handleSubmitAnswer(currentQuestion.id, option)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg transition-colors",
                  "hover:bg-blue-50 border border-gray-200",
                  userAnswers[currentQuestion.id] === option
                    ? "bg-blue-100 border-blue-300"
                    : "bg-white"
                )}
              >
                <span className="text-gray-800">{option}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              <AiOutlineLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Next
              <AiOutlineRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full md:relative md:w-80 bg-white shadow-lg">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Question Navigator
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() =>
                  dispatch({ type: "SET_CURRENT_QUESTION", payload: idx })
                }
                className={cn(
                  "h-10 w-10 rounded-md text-sm font-medium",
                  currentQuestionIndex === idx
                    ? "bg-blue-600 text-white"
                    : userAnswers[quiz.questions[idx].id]
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
