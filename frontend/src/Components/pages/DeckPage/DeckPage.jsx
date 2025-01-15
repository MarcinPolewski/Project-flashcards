import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DeckPage.css';

import Navbar from '../../Navbar/Navbar';
import PieChart from '../../Charts/PieChart/PieChart';
import DeckService from '../../../services/DeckService';
import FlashcardService from '../../../services/FlashcardService';

const DeckPage = () => {
    const { deckId } = useParams();
    const [deckProgress, setDeckProgress] = useState(null);
    const [flashcards, setFlashcards] = useState([]);

    const handleEdit = async (flashcardId) => {
        try {

        } catch (error) {
            alert("Error occured while editing flashcard!");
        } finally {
            // closeOverlay();
        }
    };

    const handleDelete = async (flashcardId) => {
        try {
            const response = await FlashcardService.deleteFlashcard(flashcardId)
            setFlashcards(flashcards.filter(flashcard => flashcard.id !== flashcardId));
            alert("Flashcard deleted successfully!");
        } catch(error) {
            alert("Error occured while deleting flashcard!");
        } finally {
            // closeOverlay();
        }
    };

    useEffect(() => {
        const fetchDeckProgress = async () => {
            try {
                const foundDeckProgress = await DeckService.getDeckProgress(deckId);
                setDeckProgress(foundDeckProgress);
            } catch (error) {
                console.error("Error fetching deck data:", error);
            }
        };

        const fetchDeckFlashcards = async () => {
            try {
                const deckFlashcards = await DeckService.getFlashcards(deckId);
                setFlashcards(deckFlashcards);
                console.log("flashcards: ", deckFlashcards);
            } catch (error) {
                console.error("Error fetching flashcards data:", error);
            }
        };

        fetchDeckProgress();
        fetchDeckFlashcards();
    }, []);

    if (!deckProgress) return <p>Deck not found!</p>;

    return (
        <div>
            <Navbar />
            <div className="deck-page-container">
                <div className="deck-page-content">
                    <h1 className="deck-page-title">{deckProgress.name}</h1>
                    <div className="deck-page-statistics-container">
                        <div className="deck-page-right">
                            <PieChart
                                data={{
                                    newCards: deckProgress.newCards,
                                    learningCards: deckProgress.learningCards,
                                    rememberedCards: deckProgress.reviewingCards,
                                }}
                                className="deck-page-pie-chart"
                            />
                        </div>
                        <div className="deck-page-left">
                            <p>Progress: {deckProgress.progress}%</p>
                            <p>New Cards: {deckProgress.newCards}</p>
                            <p>Learning Cards: {deckProgress.learningCards}</p>
                            <p>Reviewing Cards: {deckProgress.reviewingCards}</p>
                        </div>
                    </div>
                    <h3 className="deck-page-subtitle">Flashcards</h3>
                    {flashcards.length > 0 ? (
                        <ul className="deck-page-ul">
                            {flashcards.map(flashcard => (
                                <li key={flashcard.id} className="deck-page-flashcard-item">
                                    <div className="deck-page-flashcard">
                                        <div className="deck-page-front">{flashcard.front}</div>
                                        <div className="deck-page-back">{flashcard.back}</div>
                                    </div>
                                    <div className="deck-page-flashcard-actions">
                                        <button
                                            onClick={() => handleEdit(flashcard.id)}
                                            className="deck-page-edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(flashcard.id)}
                                            className="deck-page-delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No flashcards available in this deck</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeckPage;
