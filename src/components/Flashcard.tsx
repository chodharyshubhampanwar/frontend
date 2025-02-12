import React from "react";
import { useParams } from "react-router-dom";
import { useDeck } from "../hooks/useDeck";
import { useFlashCardStore } from "../store/flashCardStore";
import Flashcard from "../components/Deck";
import LoadingSpinner from "../components/LoadingSpinner";

const DeckPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { data: deck, isLoading, error } = useDeck(deckId!);
  const { studyState, nextCard, previousCard, setCurrentDeck } =
    useFlashCardStore();
  const { currentCardIndex } = studyState;

  React.useEffect(() => {
    if (deckId && deck) {
      setCurrentDeck(deckId);
    }
  }, [deckId, deck, setCurrentDeck]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">
          Error loading deck:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-xl">Deck not found</p>
        </div>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];
  const hasNextCard = currentCardIndex < deck.cards.length - 1;
  const hasPreviousCard = currentCardIndex > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{deck.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{deck.description}</p>
      </div>

      {currentCard ? (
        <Flashcard
          front={currentCard.front}
          back={currentCard.back}
          onNext={hasNextCard ? nextCard : undefined}
          onPrevious={hasPreviousCard ? previousCard : undefined}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-xl">No cards in this deck yet.</p>
        </div>
      )}

      <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
        Card {currentCardIndex + 1} of {deck.cards.length}
      </div>
    </div>
  );
};

export default DeckPage;
