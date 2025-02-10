import { QuizContainer } from "../components/QuizContainer";
import { QuizProvider } from "../context/QuizContext";
import { useParams, Navigate } from "react-router-dom";

export default function QuizPage() {
  const { quizId } = useParams();

  if (!quizId) {
    return <Navigate to="/error" />;
  }

  return (
    <QuizProvider quizId={quizId}>
      <QuizContainer />
    </QuizProvider>
  );
}
