import { api } from "../lib/axios";
import { Quiz, QuizAttempt, QuizResult, QuizScore } from "../types/quiz";

export const quizService = {
  getQuiz: async (quizId: string | undefined): Promise<Quiz> => {
    const { data } = await api.get<Quiz>(`/quiz/${quizId}`);
    return data;
  },

  createQuizAttempt: async (quizId: string): Promise<QuizAttempt> => {
    const { data } = await api.post<QuizAttempt>(`/quiz/${quizId}/attempt`);
    return data;
  },

  // submitResponse: async (
  //   attemptId: string,
  //   questionId: string,
  //   response: { answer: string; status: string }
  // ): Promise<QuizResponse> => {
  //   const { data } = await api.post<QuizResponse>(
  //     `/quiz/attempt/${attemptId}/response`,
  //     {
  //       questionId,
  //       ...response,
  //     }
  //   );
  //   return data;
  // },

  submitQuizAnswer: async (
    quizId: string,
    questionId: string,
    answer: string,
    attemptId: string,
    status: string
  ): Promise<QuizResult> => {
    const { data } = await api.post<QuizResult>(
      `/quiz/${quizId}/attempt/${attemptId}`,
      {
        questionId,
        answer,
        status,
      }
    );
    return data;
  },

  calculateScore: async (
    quizId: string,
    answers: { questionId: string; answer: string }[]
  ): Promise<QuizScore> => {
    const { data } = await api.post<QuizScore>(
      `/quiz/${quizId}/calculate-score`,
      {
        answers,
      }
    );
    return data;
  },

  getQuizResults: async (quizId: string): Promise<QuizResult> => {
    const { data } = await api.get<QuizResult>(`/quiz/${quizId}/results`);
    return data;
  },
};
