import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { QuizState, QuizAction, QuizContextType } from "../types/quiz";
import { useQuiz } from "../hooks/useQuiz";

const initialState: QuizState = {
  quiz: null,
  currentQuestionIndex: 0,
  userAnswers: {},
  loading: false,
  isStarted: false,
  currentAttempt: null,
  timeRemaining: 0,
};

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined
);

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case "SET_QUIZ":
      return {
        ...state,
        quiz: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ANSWER":
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answer,
        },
      };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    case "SET_IS_STARTED":
      return {
        ...state,
        isStarted: action.payload,
      };
    case "SET_ATTEMPT":
      return {
        ...state,
        currentAttempt: action.payload,
      };
    default:
      return state;
  }
};

interface QuizProviderProps {
  children: ReactNode;
  quizId: string;
}

export const QuizProvider = ({ children, quizId }: QuizProviderProps) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    quiz = null,
    isLoading,
    error,
    // submitAnswer: submitQuizAnswer,
    createQuizAttempt,
  } = useQuiz(quizId);

  useEffect(() => {
    if (quiz) {
      dispatch({ type: "SET_QUIZ", payload: quiz });
    }
  }, [quiz]);

  // const submitAnswer = async (questionId: string, answer: string) => {
  //   dispatch({
  //     type: "SET_ANSWER",
  //     payload: { questionId, answer },
  //   });
  //   return submitQuizAnswer({ questionId, answer });
  // };

  const nextQuestion = () => {
    if (
      state.quiz &&
      state.currentQuestionIndex < state.quiz.questions.length - 1
    ) {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: state.currentQuestionIndex + 1,
      });
    }
  };

  const previousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({
        type: "SET_CURRENT_QUESTION",
        payload: state.currentQuestionIndex - 1,
      });
    }
  };

  const startQuiz = async () => {
    createQuizAttempt(undefined, {
      onSuccess: (attempt) => {
        dispatch({ type: "SET_IS_STARTED", payload: true });
        dispatch({ type: "SET_ATTEMPT", payload: attempt });
      },
    });
  };

  const value = {
    state,
    isLoading,
    error,
    // submitAnswer,
    createQuizAttempt,
    nextQuestion,
    previousQuestion,
    dispatch,
    quiz,
    startQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
