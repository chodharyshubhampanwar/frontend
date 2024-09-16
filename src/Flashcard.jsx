import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFlashcards } from "./utils/api";
const FlashcardContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const data = await getFlashcards();
      setFlashcards(data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (flashcards.length === 0) {
    return <div>Loading flashcards...</div>;
  }

  const currentCard = flashcards[currentIndex];

  return (
    <FlashcardContainer>
      <h1>Flashcards</h1>
      <Card>
        <h2>{currentCard.question}</h2>
        {showAnswer && <p>{currentCard.answer}</p>}
      </Card>
      <Button onClick={toggleAnswer}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </Button>
      <Button onClick={handlePrevious}>Previous</Button>
      <Button onClick={handleNext}>Next</Button>
    </FlashcardContainer>
  );
};

export default Flashcard;
