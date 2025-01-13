import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import testDecks from '../../../assets/mockData/testDecks';
import testFlashcards from '../../../assets/mockData/testFlashcards';
import './DeckPage.css';

import Navbar from '../../Navbar/Navbar';
import PieChart from '../../Charts/PieChart/PieChart';
import DeckService from '../../../services/DeckService';
import FlashcardService from '../../../services/FlashcardService';

const DeckPage = (props) => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [deckProgress, setDeckProgress] = useState(null);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        console.log("URL Parameter deckId:", deckId);

        // Find the deck
        const foundDeck = testDecks.find(deck => deck.id === Number(deckId));
        console.log("Found Deck:", foundDeck);

        if (foundDeck) {
            setDeck(foundDeck);

            // Filter flashcards belonging to this deck
            const folderFlashcards = testFlashcards.filter(flashcard => flashcard.deckId === Number(deckId));
            console.log("Filtered Flashcards:", folderFlashcards);

            setFlashcards(folderFlashcards);
        }
    }, [deckId]);

    const handleEdit = (flashcardId) => {
        console.log(`Editing flashcard with id ${flashcardId}`);
    };

    const handleDelete = (flashcardId) => {
        const response = FlashcardService.deleteFlashcard(flashcardId)
        setFlashcards(flashcards.filter(flashcard => flashcard.id !== flashcardId));
    };

    useEffect(() => {
        const fetchDeckData = async () => {
            try {
                const foundDeck = await DeckService.getDeck(id);
                setDeck(foundDeck);
    
                const folderFlashcards = await DeckService.getFlashcards(id);
                setFlashcards(folderFlashcards);
    
                const foundDeckProgress = await DeckService.getDeckProgress(id);
                setDeckProgress(foundDeckProgress);
            } catch (error) {
                console.error("Error fetching deck data:", error);
            }
        };
        fetchDeckData();
    }, [id]);

    if (!deck) return <p>Deck not found!</p>;

    return (
        <div>
            <Navbar details={props.details} />
            <div className="deck-page-container">
                <div className="deck-page-content">
                    <h1 className="deck-page-title">{deck.title}</h1>
                    <div className="deck-page-statistics-container">
                        <div className="deck-page-right">
                            <PieChart
                                data={{
                                    newCards: deck.newCards,
                                    learningCards: deck.learningCards,
                                    rememberedCards: deck.reviewingCards,
                                }}
                                className="deck-page-pie-chart"
                            />
                        </div>
                        <div className="deck-page-left">
                            <p>Progress: {deck.progress}%</p>
                            <p>New Cards: {deck.newCards}</p>
                            <p>Learning Cards: {deck.learningCards}</p>
                            <p>Reviewing Cards: {deck.reviewingCards}</p>
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
