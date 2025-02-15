import { create } from "zustand";
import { UserAnswer, TestResult, MockTest, Option } from "../types/test";

interface TestState {
  mockTest: MockTest | null;
  currentQuestionIndex: number;
  userAnswers: Record<string, UserAnswer>;
  timeRemaining: number;
  testResult: TestResult | null;
  isTestComplete: boolean;

  setMockTest: (test: MockTest) => void;
  setCurrentQuestion: (index: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  toggleMarkQuestion: (questionId: string) => void;
  setTimeRemaining: (time: number) => void;
  completeTest: (result: TestResult) => void;
}

export const useTestStore = create<TestState>((set) => ({
  mockTest: null,
  currentQuestionIndex: 0,
  userAnswers: {},
  timeRemaining: 0,
  testResult: null,
  isTestComplete: false,

  setMockTest: (test) =>
    set({
      mockTest: test,
      timeRemaining: test.duration * 60,
    }),

  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),

  setAnswer: (questionId, answer) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: {
          ...state.userAnswers[questionId],
          questionId,
          selectedOption: answer as keyof Option,
          isMarked: state.userAnswers[questionId]?.isMarked || false,
        },
      },
    })),

  toggleMarkQuestion: (questionId) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [questionId]: {
          ...state.userAnswers[questionId],
          questionId,
          isMarked: !state.userAnswers[questionId]?.isMarked,
        },
      },
    })),

  setTimeRemaining: (time) => set({ timeRemaining: time }),

  completeTest: (result) =>
    set({
      testResult: result,
      isTestComplete: true,
    }),
}));
