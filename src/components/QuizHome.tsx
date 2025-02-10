import { useQuizContext } from "../context/QuizContext";
import { quizService } from "../services/quizService";
import { Quiz } from "../types/quiz";
import { showToast, ToastType } from "../lib/toast";

interface QuizHomeProps {
  quiz: Quiz;
}

export const QuizHome = ({ quiz }: QuizHomeProps) => {
  const { dispatch, isLoading } = useQuizContext();

  if (!quiz) return null;

  const handleStartQuiz = async () => {
    const loadingToastId = "startQuizToast";
    try {
      showToast({
        message: "Starting quiz...",
        type: ToastType.LOADING,
        position: "top-center",
        id: loadingToastId,
      });
      const attempt = await quizService.createQuizAttempt(quiz.id);
      dispatch({ type: "SET_QUIZ", payload: quiz });
      dispatch({ type: "SET_CURRENT_QUESTION", payload: 0 });
      dispatch({ type: "SET_IS_STARTED", payload: true });
      dispatch({ type: "SET_ATTEMPT", payload: attempt });
      showToast({
        message: "Quiz started!",
        type: ToastType.SUCCESS,
        position: "top-center",
      });
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          message: error.message,
          type: ToastType.ERROR,
          position: "top-center",
        });
      } else {
        showToast({
          message: "An unknown error occurred",
          type: ToastType.ERROR,
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <div className="space-y-4">
        <p className="text-gray-600">{quiz.description}</p>
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Quiz Details</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Duration: {quiz.duration} minutes</li>
            <li>Total Questions: {quiz.questions.length}</li>
          </ul>
        </div>
        <button
          onClick={handleStartQuiz}
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};
