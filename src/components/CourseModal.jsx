import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { TbLoader } from "react-icons/tb";
import {
  ModalOverlay,
  ModalContent,
  FilterSection,
  FilterSelect,
  ApplyButton,
  ClearButton,
} from "../styles/FilterModal.js";

const LoadingIcon = styled(TbLoader)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CourseModal = ({ isOpen, onRequestClose, onApply, onReset }) => {
  const [levels, setLevels] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLevelsAndCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/courses"
        );
        const coursesData = response.data.courses;
        const uniqueLevels = [
          ...new Set(coursesData.map((item) => item.level)),
        ];
        setLevels(uniqueLevels);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching levels and courses:", error);
      }
      setLoading(false);
    };

    fetchLevelsAndCourses();
  }, []);

  const handleApply = () => {
    onApply(selectedLevel, selectedCourse);
    onRequestClose();
  };

  const handleReset = () => {
    setSelectedLevel("");
    setSelectedCourse("");
    onReset();
  };

  const filteredCourses = courses.filter(
    (course) => course.level === selectedLevel
  );

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <LoadingIcon size="3em" />
        ) : (
          <FilterSection>
            <h3>Board</h3>
            <FilterSelect
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Select your board</option>
              {levels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </FilterSelect>
            <h3>Class</h3>
            <FilterSelect
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={!selectedLevel}
            >
              <option value="">Select your class</option>
              {filteredCourses.map((course) => (
                <option key={course._id} value={course.year}>
                  {course.year}
                </option>
              ))}
            </FilterSelect>
          </FilterSection>
        )}
        <ClearButton onClick={handleReset}>Reset</ClearButton>
        <ApplyButton onClick={handleApply}>Save</ApplyButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CourseModal;
