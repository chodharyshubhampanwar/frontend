import { Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Paths from "./Paths.jsx";
import Quizzes from "./Quizzes.jsx";
import Exams from "./Exams.jsx";
import Tests from "./Tests.jsx";
import HomePage from "./Homepage.jsx";
import QuizHome from "./QuizHome.jsx";
import TestHome from "./TestHome.jsx";
import ExamHome from "./ExamHome.jsx";
import ExamAnalysis from "./ExamAnalysis.jsx";
import TestAnalysis from "./TestAnalysis.jsx";
import QuizAnalysis from "./QuizAnalysis.jsx";
import CourseHome from "./CourseHome.jsx";
import Grade from "./Grade.jsx";
import Course from "./Course.jsx";
import Lesson from "./Lesson.jsx";
import Layout from "./Layout.js";
import Flashcards from "./Flashcards.jsx";

const Main = () => {
  return (
    <Routes>
      <Route path="/exam/:id" element={<ExamHome />} />
      <Route path="/exam/:id/analysis" element={<ExamAnalysis />} />
      <Route path="/test/:id" element={<TestHome />} />
      <Route path="/testanalysis/:id" element={<TestAnalysis />} />
      <Route path="/exam/:id" element={<ExamHome />} />
      <Route path="/exam/:id/analysis" element={<ExamAnalysis />} />
      <Route path="/quiz/:id" element={<QuizHome />} />
      <Route path="/quiz/:id/analysis" element={<QuizAnalysis />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/schools" element={<Grade />} />
        <Route path="/schools/:gradeName" element={<Course />} />
        <Route path="/course/:id" element={<CourseHome />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/paths" element={<Paths />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Route>
    </Routes>
  );
};

export default Main;
