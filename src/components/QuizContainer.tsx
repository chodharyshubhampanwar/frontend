import { useQuizContext } from "../context/QuizContext";
import { QuizHome } from "./QuizHome";
import { QuizComponent } from "./Quiz";

export const QuizContainer = () => {
  const { state, isLoading, quiz } = useQuizContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div
      className={`min-h-screen ${state.isStarted ? "bg-gray-50" : "bg-white"}`}
    >
      {!state.isStarted ? (
        <QuizHome quiz={quiz} />
      ) : (
        <QuizComponent quiz={quiz} />
      )}
    </div>
  );
};
