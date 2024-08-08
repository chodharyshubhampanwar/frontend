import axios from "axios";
import { getAuth } from "firebase/auth";

const API_URL =
  "https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCourses = async () => {
  const response = await axiosInstance.get(`/courses`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response.data;
};

export const getUnit = async (id) => {
  const response = await axiosInstance.get(`/unit/${id}`);
  return response.data;
};

export const getTopics = async (id) => {
  const response = await axiosInstance.get(`/topics/${id}`);
  return response.data;
};

export const updateCourses = async (id) => {
  const response = await axiosInstance.put(`/user/${id}/course`);
  return response.data;
};

export const sendTestResults = async (userId, testId, answers) => {
  const response = await axiosInstance.post("/submitAnswer", {
    firebaseId: userId,
    testId: testId,
    answers: answers,
  });
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axiosInstance.get(`/quizzes`);
  return response.data.quizzes;
};

export const getQuiz = async (id) => {
  const response = await axiosInstance.get(`/quiz/${id}`);
  return response.data.quiz;
};

export const submitQuiz = async (userAnswers, userId, quizId) => {
  const response = await axiosInstance.post("/submitquiz", {
    userAnswers,
    userId,
    quizId,
  });
  return response.data;
};

export const getQuizAnalysis = async (id) => {
  const response = await axiosInstance.get(`/quizanalysis/${id}`);
  return response.data;
};

export const getExams = async () => {
  const response = await axiosInstance.get(`/exams`);
  return response.data.exams;
};

export const getExam = async (id) => {
  const response = await axiosInstance.get(`/exam/${id}`);
  return response.data.exam;
};

export const submitAnswer = async (
  userId,
  examId,
  examStartTime,
  allAnswers,
  endTime
) => {
  const userExam = {
    userId: userId,
    examId: examId,
    startTime: examStartTime,
    endTime: endTime,
    answers: Object.values(allAnswers),
  };
  const response = await axiosInstance.post("/exams/new", userExam);

  return response.data._id;
};

export const getExamAnalysis = async (id) => {
  const response = await axiosInstance.get(`/exam/${id}/analysis`);
  return response.data;
};

export const getTests = async () => {
  const response = await axiosInstance.get(`/tests`);
  return response.data.tests;
};

export const getTest = async (id) => {
  const response = await axiosInstance.get(`/test/${id}`);
  return response.data.test;
};

export default axiosInstance;
