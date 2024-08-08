import React, { useState } from "react";
import data from "./paths.json";
import styled from "styled-components";
import SocialLogin from "./SocialLogin";

const Paths = () => {
  const [path, setPath] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);

  const handlePathChange = (option) => {
    setPath(option);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubOptionChange = (option) => {
    setSelectedSubOption(option);
  };

  const handleBack = () => {
    if (selectedSubOption) {
      setSelectedSubOption(null);
    } else if (selectedOption) {
      setSelectedOption(null);
    } else if (path) {
      setPath(null);
    }
  };

  const handleReset = () => {
    setPath(null);
    setSelectedOption(null);
    setSelectedSubOption(null);
  };

  return (
    <Container>
      {!path && (
        <>
          <Heading>{data.path.question}</Heading>
          <OptionsContainer>
            {data.path.options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handlePathChange(option)}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
        </>
      )}
      {path && !selectedOption && (
        <>
          <Heading>{data[path].question}</Heading>
          <OptionsContainer>
            {Object.keys(data[path].options).map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleOptionChange(option)}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
        </>
      )}
      {selectedOption && !selectedSubOption && (
        <>
          <Heading>Select a sub-option</Heading>
          <OptionsContainer>
            {Object.keys(data[path].options[selectedOption]).map(
              (option, index) => (
                <OptionButton
                  key={index}
                  onClick={() => handleSubOptionChange(option)}
                >
                  {option}
                </OptionButton>
              )
            )}
          </OptionsContainer>
        </>
      )}
      {selectedSubOption && (
        <>
          <Heading>You selected: {selectedSubOption}</Heading>
        </>
      )}
      {selectedSubOption && (
        <SocialLogin selectedSubOption={selectedSubOption} />
      )}
      {(path || selectedOption || selectedSubOption) && (
        <OptionButton onClick={handleBack}>Back</OptionButton>
      )}
      <OptionButton onClick={handleReset}>Reset</OptionButton>
    </Container>
  );
};

export default Paths;

const Container = styled.div`
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f6f9;
`;

const Heading = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const OptionButton = styled.button`
  font-size: 1.5em;
  margin: 0.5em;
  padding: 0.5em 1em;
  border-radius: 30px;
  border: none;
  background-color: #ffffff;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
`;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "./AuthProvider";

// const HomePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [showCourses, setShowCourses] = useState(false); // New state to control the visibility of courses
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/courses");
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCourseClick = async (courseId) => {
//     setSelectedCourse(courseId);
//   };

//   const handleEnrollClick = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/users/${currentUser.uid}/courses/${selectedCourse}`
//       );
//       console.log(response.data);
//       alert("Enrollment successful!");
//       setShowCourses(false);
//     } catch (error) {
//       console.error("Error enrolling user in course: ", error);
//       alert("Enrollment failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Course Enrollment</h1>
//       <button onClick={() => setShowCourses(true)}>Edit Courses</button>{" "}
//       {/* This button shows the courses */}
//       {showCourses &&
//         courses.map((course) => (
//           <div key={course._id} onClick={() => handleCourseClick(course._id)}>
//             <p>{course.board}</p>
//             <p>{course.name}</p>
//           </div>
//         ))}
//       {selectedCourse && (
//         <button onClick={handleEnrollClick}>Enroll in selected course</button>
//       )}
//     </div>
//   );
// };

// export default HomePage;
