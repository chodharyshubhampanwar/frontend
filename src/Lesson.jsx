// ChapterDetails.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { TbLoader } from "react-icons/tb";

const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LoadingIcon = styled(TbLoader)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ChapterCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h2`
  color: #333;
`;

const TopicList = styled.ul`
  list-style-type: none;
`;

const TopicItem = styled.li`
  padding: 5px 0;
  color: #666;
`;

const Lesson = () => {
  const { id } = useParams(); // Using React Router's hook to get the chapter ID from the URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChapterDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/lesson/${id}`
        );
        setLesson(response.data.lesson);
      } catch (err) {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
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
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container>
      {lesson ? (
        <ChapterCard>
          <Title>{lesson.name}</Title>
          <TopicList>
            {lesson.topics.map((topic) => (
              <>
                <TopicItem key={topic._id}>{topic.name}</TopicItem>
                <p>{topic.content}</p>
              </>
            ))}
          </TopicList>
        </ChapterCard>
      ) : (
        <p>No chapter information available.</p>
      )}
    </Container>
  );
};

export default Lesson;
