import { useQuery, useMutation, useQueryClient } from "react-query";
import { quizService } from "../services/quizService";
import { Quiz, QuizAttempt } from "../types/quiz";

export const useQuiz = (quizId: string) => {
  const queryClient = useQueryClient();

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery<Quiz | null>(["quiz", quizId], () =>
    quizId ? quizService.getQuiz(quizId) : Promise.resolve(null)
  );

  const createQuizAttempt = useMutation<QuizAttempt, Error, void>(
    () => quizService.createQuizAttempt(quizId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["quiz", quizId]);
      },
    }
  );

  return {
    quiz,
    isLoading,
    error,
    createQuizAttempt: createQuizAttempt.mutate,
  };
};
