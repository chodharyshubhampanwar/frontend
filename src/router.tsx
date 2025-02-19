import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import QuizPage from "./pages/Quiz";
import DeckPage from "./pages/DeckPage";
import Flashcard from "./components/Flashcard";
import Dashboard from "@/pages/Dashboard";
import ErrorPage from "./pages/Error";
import TestSummary from "./pages/TestSummary";
import TestsList from "./pages/TestList";
import TestAttempt from "./pages/TestAttempt";
import TestResult from "./pages/TestResult";
import QuestionsList from "./pages/QuestionList";
import QuestionView from "./pages/Question";
import Layout from "./layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "deck",
        element: <DeckPage />,
      },
      {
        path: "question",
        element: <QuestionsList />,
      },
      {
        path: "test",
        element: <TestsList />,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/quiz/:quizId",
    element: <QuizPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/deck/:deckId",
    element: <Flashcard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test/:testId",
    element: <TestSummary />,
  },
  {
    path: "/test/:testId/attempt",
    element: <TestAttempt />,
  },
  {
    path: "/test/:testId/result",
    element: <TestResult />,
  },
  {
    path: "/question/:questionId",
    element: <QuestionView />,
  },

  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
