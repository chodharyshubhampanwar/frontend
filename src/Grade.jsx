import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const Grade = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          "https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/grades",
          {
            params: {
              level: "K-12",
            },
          }
        );

        setGrades(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGrades();
  }, []);

  return (
    <Container>
      <h1>K-12 Grades</h1>
      <Grid>
        {grades.map((grade) => (
          <Card key={grade._id}>
            <div>
              <Link to={`/schools/${grade.grade}`}>{grade.name}</Link>
            </div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Grade;
