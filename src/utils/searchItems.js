// import axios from "axios";

// const searchItems = async (searchTerm, type) => {
//   const [courses, exams, quizzes, tests] = await Promise.all([
//     axios.get(`/api/courses?search=${searchTerm}&type=${type}`),
//     // axios.get(`/api/exams?search=${searchTerm}&type=${type}`),
//     // axios.get(`/api/quizzes?search=${searchTerm}&type=${type}`),
//     // axios.get(`/api/tests?search=${searchTerm}&type=${type}`),
//   ]);

//   const results = [
//     ...courses.data.map((course) => ({ ...course, type: "course" })),
//     // ...exams.data.map((exam) => ({ ...exam, type: "exam" })),
//     // ...quizzes.data.map((quiz) => ({ ...quiz, type: "quiz" })),
//     // ...tests.data.map((test) => ({ ...test, type: "test" })),
//   ];

//   return results;
// };

// export default searchItems;
