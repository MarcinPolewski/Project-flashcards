import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../Navbar/Navbar";
import "./Study.css";
import testDecks from "../../../assets/mockData/testDecks";
import mockDeck from "../../../assets/mockData/mockDeck";

const Study = (props) => {
  const { deckId } = useParams(); // Get the deckId from URL params
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [currentDeck, setCurrentDeck] = useState(null);

  // Fetch the deck dynamically
  useEffect(() => {
    const fetchedDeck =
      testDecks.find((deck) => deck.id === Number(deckId)) || mockDeck;
    setCurrentDeck(fetchedDeck);
    setCards(fetchedDeck?.newCards || []);
  }, [deckId]);

  const handleProgressUpdate = (interval) => {
    if (!currentDeck) return;

    // Update the current card's progress
    const updatedCards = cards.map((card, index) =>
      index === currentCardIndex ? { ...card, progressInterval: interval } : card
    );
    setCards(updatedCards);

    // Update the mock deck
    const updatedDeck = {
      ...currentDeck,
      newCards: updatedCards,
    };
    setCurrentDeck(updatedDeck);

    // Move to the next card or loop back
    if (currentCardIndex < updatedCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0); // Reset to first card
    }
  };

  if (!currentDeck) {
    return <div>Loading...</div>; // Display while loading the deck
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="study-container">
      <Navbar details={props.details}/>
      <h1>Study Page</h1>
      <p>You're studying deck ID: {deckId}</p>
      {currentCard ? (
        <>
          <div className="card">
            <div className="front">{currentCard.front}</div>
            <div className="back">{currentCard.back}</div>
          </div>
          <div className="progress-buttons">
            <button onClick={() => handleProgressUpdate("1min")}>Repeat</button>
            <button onClick={() => handleProgressUpdate("10min")}>Hard</button>
            <button onClick={() => handleProgressUpdate("1day")}>Mid</button>
            <button onClick={() => handleProgressUpdate("5day")}>Easy</button>
          </div>
        </>
      ) : (
        <p>No cards available in this deck.</p>
      )}
      <button className="edit-button">Edit</button>
    </div>
  );
};

export default Study;
