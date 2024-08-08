import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  margin: 10px;
  padding: 15px;
  border-radius: 4px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const Grade = styled.span`
  font-size: 1em;
  background: #efefef;
  padding: 5px 10px;
  border-radius: 4px;
`;

const CourseCard = ({ course }) => (
  <Card>
    <Link to={`/course/${course._id}`}>
      <Title>{course.title}</Title>
    </Link>
  </Card>
);

export default CourseCard;
