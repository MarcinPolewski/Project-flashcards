import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import "./Study.css";
import testDecks from "../../../assets/mockData/testDecks";

const Study = () => {
  const { deckId } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null); // Null initially
  const [showBack, setShowBack] = useState(false); // State to toggle card sides

  // Fetch the deck dynamically
  useEffect(() => {
    const fetchedDeck =
      testDecks.find((deck) => deck.id === Number(deckId)) || null;
    if (fetchedDeck) {
      setCurrentDeck(fetchedDeck);
      setCards(fetchedDeck.newCards || []);
    }
  }, [cards, currentCardIndex]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setShowBack((prev) => !prev);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleProgressUpdate = async (interval) => {
    if (!cards[currentCardIndex]) return;

    const currentCard = cards[currentCardIndex];

    const updatedCard = { ...currentCard, progressInterval: interval };

    const updatedCards = cards.map((card, index) =>
      index === currentCardIndex ? updatedCard : card
    );
    setCards(updatedCards);

    try {
      console.log ("sent back results to backend: ", currentCard.id, interval);
      // const response = await ReviewService.sendBackResults(currentCard.id, interval);
      // console.log("Flashcard reviewed:", response);

      if (interval === "Easy") {
        const remainingCards = updatedCards.filter((card) => card.id !== currentCard.id);
        setCards(remainingCards);
      }

      if (currentCardIndex < updatedCards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0);
      }

      setShowBack(false);
    } catch (error) {
      console.error("Error while sending results: ", error);
    }
  };

  if (cards.length === 0) {
    return <div>Loading or no cards available...</div>;
  }

  const handleEditFlashcard = async () => {
    try {
      if (editedCardBack.length === 0 || editedCardFront.length === 0) {
        alert("Front or back should not be empty!");
        return;
      }
      if (currentCard) {
        const response = await FlashcardService.updateFlashcard(currentCard.id, editedCardFront, editedCardBack);
        console.log("Flashcard updated:", response);
        alert("Flashcard updated successfully!");

        const updatedCard = {
          ...currentCard,
          front: editedCardFront,
          back: editedCardBack,
        };

        const updatedCards = cards.map((card, index) =>
          index === currentCardIndex ? updatedCard : card
        );
        setCards(updatedCards);

        setCurrentCardFront(editedCardFront);
        setCurrentCardBack(editedCardBack);

      } else {
        alert("Flashcard doesn't exist!");
      }

    } catch (error) {
      alert("Error occured while editing flashcard..");
      console.error("Error while editing flashcard: ", error);
    } finally {
      closeOverlay();
    }
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="study">
      <Navbar />
      <div className="study-container">
      <p>You're studying: {currentDeck?.title || "Unknown Deck"}</p>
        {currentCard.front && currentCard.back ? (
          <>
            <div className="card">
              {showBack ? (
                <div className="back">{currentCardBack}</div>
              ) : (
                <div className="front">{currentCardFront}</div>
              )}
            </div>
            <div className="progress-buttons">
              <button onClick={() => handleProgressUpdate("Repeat")}>Repeat</button>
              <button onClick={() => handleProgressUpdate("Hard")}>Hard</button>
              <button onClick={() => handleProgressUpdate("Mid")}>Mid</button>
              <button onClick={() => handleProgressUpdate("Easy")}>Easy</button>
            </div>
            <button className="edit-button" onClick={toggleOverlay}>Edit</button>
          </>
        ) : (
          <p>No flashcards to study!</p>
        )}
      </div>
    </div>
  );
};

export default Study;
