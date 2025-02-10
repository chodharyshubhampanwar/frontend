import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import QuizPage from "./pages/Quiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/quiz/:quizId",
    element: <QuizPage />,
  },
]);

export default router;
