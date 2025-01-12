import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import './CreateFlashcard.css';
import testDecks from "../../../assets/mockData/testDecks";

const CreateFlashcard = (props) => {
    const navigate = useNavigate();

    // State for the selected deck and flashcard input
    const [selectedDeck, setSelectedDeck] = useState(testDecks[0]?.title || "");
    const [frontText, setFrontText] = useState("");
    const [backText, setBackText] = useState("");

    // Function to handle adding a flashcard
    const handleAddFlashcard = () => {
        if (!frontText.trim() || !backText.trim()) {
            alert("Both front and back fields are required!");
            return;
        }

        // Find the deck to update
        const updatedDecks = testDecks.map((deck) => {
            if (deck.title === selectedDeck) {
                return {
                    ...deck,
                    flashcards: [
                        ...(deck.flashcards || []), // Add to existing flashcards
                        { front: frontText, back: backText }, // New flashcard
                    ],
                };
            }
            return deck;
        });

        console.log("Updated Decks:", updatedDecks);

        // Clear the input fields
        setFrontText("");
        setBackText("");
    };

    return (
        <div className="main-container">
            <Navbar details={props.details} />
            <div className="create-flashcard">
                <div className="flashcard-container">
                    <h2>Create Flashcard</h2>

                    <div className="inputs-container">
                        <div className="input-group">
                            <label htmlFor="deck">Choose Deck</label>
                            <select
                                id="deck"
                                className="dropdown"
                                value={selectedDeck}
                                onChange={(e) => setSelectedDeck(e.target.value)}
                            >
                                {testDecks.map((deck, index) => (
                                    <option key={index} value={deck.title}>
                                        {deck.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flashcard-inputs">
                            <textarea
                                placeholder="Front"
                                className="textarea"
                                value={frontText}
                                onChange={(e) => setFrontText(e.target.value)}
                            />
                            <textarea
                                placeholder="Back"
                                className="textarea"
                                value={backText}
                                onChange={(e) => setBackText(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="cancel-button" onClick={() => navigate("/")}>
                            Cancel
                        </button>
                        <button className="add-button" onClick={handleAddFlashcard}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFlashcard;
