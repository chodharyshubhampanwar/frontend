import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import LoadingIcon from "./components/Loading.jsx";
import { useParams, Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f7f7f7; // Update these styles as per your design preferences
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h2`
  color: #333;
`;

const Description = styled.p`
  color: #666;
`;

const CourseDetails = ({ match }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/course/${id}`
        );
        setCourse(response.data.course);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <LoadingIcon size="3em" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>There was an error loading the course details.</p>
      </Container>
    );
  }

  return (
    <Container>
      {course ? (
        <CourseCard>
          <Title>{course.title}</Title>
          <Description>{course.description}</Description>
          {course.units && (
            <div>
              {course.units.map((unit) => (
                <div key={unit._id}>
                  <h3>{unit.name}</h3>
                  <p>{unit.description}</p>
                  {unit.chapters && (
                    <div>
                      {unit.chapters.map((chapter) => (
                        <div key={chapter._id}>
                          <Link to={`/lesson/${chapter._id}`}>
                            {chapter.name}
                          </Link>
                          <p>{chapter.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CourseCard>
      ) : (
        <p>Course not found or doesn't exist.</p>
      )}
    </Container>
  );
};

export default CourseDetails;
