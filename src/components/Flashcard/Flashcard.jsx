import React, { useState } from "react";
import {
  CardContainer,
  Card,
  CardFront,
  CardBack,
} from "../../styles/Flashcard.js";

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer onClick={handleFlip}>
      <Card isFlipped={isFlipped}>
        <CardFront>{front}</CardFront>
        <CardBack>{back}</CardBack>
      </Card>
    </CardContainer>
  );
};

export default Flashcard;
