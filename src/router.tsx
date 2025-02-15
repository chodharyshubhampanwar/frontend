import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import QuizPage from "./pages/Quiz";
import DeckPage from "./pages/DeckPage";
import Flashcard from "./components/Flashcard";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import TestContainer from "./components/TestContainer";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/quiz/:quizId",
    element: <QuizPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/decks",
    element: <DeckPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/deck/:deckId",
    element: <Flashcard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test/:testId",
    element: <TestContainer />,
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
