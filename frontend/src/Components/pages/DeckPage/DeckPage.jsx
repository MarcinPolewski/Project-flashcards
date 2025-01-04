import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import testDecks from '../../../assets/test/testDecks';
import testFlashcards from '../../../assets/test/testFlashcards';
import './DeckPage.css';

import Navbar from '../../Navbar/Navbar';

const DeckPage = (props) => {
    const { id } = useParams();
    const [deck, setDeck] = useState(null);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        const foundDeck = testDecks.find(deck => deck.id === parseInt(id));
        if (foundDeck) {
            setDeck(foundDeck);
            const folderFlashcards = testFlashcards.filter(flashcard => flashcard.deckId === foundDeck.id);
            setFlashcards(folderFlashcards);
        }
    }, [id]);

    if (!deck) return <p>Deck not found!</p>;

    return (
        <div className="deck-page">
            <Navbar details = {props.details} />

            {deck ? (
                <>
            <h1>{deck.title}</h1>
            <p>Progress: {deck.progress}%</p>
            <p>New Cards: {deck.newCards}</p>
            <p>Learning Cards: {deck.learningCards}</p>
            <p>Reviewing Cards: {deck.reviewingCards}</p>

            <h3>Flashcards</h3>
            {flashcards.length > 0 ? (
                <ul>
                    {flashcards.map(flashcard => (
                        <li key={flashcard.id}>
                            <p><strong>Front:</strong> {flashcard.front}</p>
                            <p><strong>Back:</strong> {flashcard.back}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No flashcards available in this deck</p>
            )}
            </>) : <p>Deck not found!</p>
            }
        </div>
    );
};

export default DeckPage;
