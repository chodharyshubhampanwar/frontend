import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CourseCard from "../src/components/CourseCard.jsx";
import { TbLoader } from "react-icons/tb";
import { useParams } from "react-router-dom";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

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

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const { gradeName } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: coursesPerPage,
          grade: gradeName,
        };
        const { data } = await axios.get(
          "https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/courses",
          {
            params,
          }
        );
        setCourses(data.courses);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [currentPage, coursesPerPage]);

  return (
    <>
      {loading && (
        <Modal>
          <LoadingIcon size="3em" />
        </Modal>
      )}
      <Grid>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </Grid>
    </>
  );
};

export default Course;
