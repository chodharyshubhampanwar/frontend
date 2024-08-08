import React, { useState, useEffect } from "react";
import CourseModal from "../src/components/CourseModal.jsx";
import axios from "axios";
import styled from "styled-components";
import { FaBook } from "react-icons/fa";

const CourseCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CourseIcon = styled(FaBook)`
  font-size: 2em;
  margin-bottom: 8px;
`;

const CourseTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);

  const handleApply = (level, course) => {
    setSelectedCourse(course);
  };

  const handleReset = () => {
    setSelectedCourse("");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/courses"
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Select Course</button>
      <CourseModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onApply={handleApply}
        onReset={handleReset}
      />
      {selectedCourse && (
        <div>
          <h2>Available Courses for {selectedCourse}:</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {courses
              .filter((course) => course.grade === selectedCourse)
              .map((course) => (
                <CourseCard key={course._id}>
                  <CourseIcon />
                  <CourseTitle>{course.name}</CourseTitle>
                </CourseCard>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
