import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import QuizPage from "./pages/Quiz";
import ErrorPage from "./pages/Error";

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
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
