import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOverlay } from '../../../contexts/OverlayContext/OverlayContext';
import './DeckPage.css';

import Overlay from '../../Overlay/Overlay';
import Navbar from '../../Navbar/Navbar';
import PieChart from '../../Charts/PieChart/PieChart';
import DeckService from '../../../services/DeckService';
import FlashcardService from '../../../services/FlashcardService';

const DeckPage = () => {
    const { deckId } = useParams();
    const [deckProgress, setDeckProgress] = useState(null);
    const [flashcards, setFlashcards] = useState([]);

    const {isOverlayOpen, toggleOverlay, closeOverlay} = useOverlay();
    const [formType, setFormType] = useState("");

    const [editedCardId, setEditedCardId] = useState(null);
    const [editedCardFront, setEditedCardFront] = useState("");
    const [editedCardBack, setEditedCardBack] = useState("");

    const handleEditFlashcard = async (flashcardId) => {
        if (editedCardFront.length < 1 || editedCardBack.length < 1) {
            alert ("Flashcards front and back must not be empty!");
            return;
        }
        try {
            const response = await FlashcardService.updateFlashcard(flashcardId, editedCardFront, editedCardBack);
            setFlashcards(flashcards.map(flashcard =>
                flashcard.id === editedCardId
                    ? { ...flashcard, front: editedCardFront, back: editedCardBack }
                    : flashcard
            ));
            alert("Flashcard edited successfully!");
        } catch (error) {
            alert("Error occured while editing flashcard!");
        } finally {
            closeOverlay();
        }
    };

    const handleDeleteYes = async (flashcardId) => {
        try {
            const response = await FlashcardService.deleteFlashcard(flashcardId)
            setFlashcards(flashcards.filter(flashcard => flashcard.id !== flashcardId));
            alert("Flashcard deleted successfully!");
        } catch(error) {
            alert("Error occured while deleting flashcard!");
        } finally {
            closeOverlay();
        }
    };

    const handleDeleteNo = () => {
        closeOverlay();
    }

    useEffect(() => {
        const fetchDeckProgress = async () => {
            try {
                const foundDeckProgress = await DeckService.getDeckInfo(deckId);
                setDeckProgress(foundDeckProgress);
                console.log("deck page deck: ", foundDeckProgress);
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

                <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                    {formType === 'edit' &&
                        <div className="plus-button-create-deck">
                        <h3>Edit Flashcard</h3>

                        <input
                            type="text"
                            placeholder="Front.."
                            value={editedCardFront}
                            onChange={(e) => setEditedCardFront(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Back.."
                            value={editedCardBack}
                            onChange={(e) => setEditedCardBack(e.target.value)}
                            required
                        />

                        <button type="button" onClick={handleEditFlashcard}>Save</button>
                    </div>
                    }
                    {formType === 'delete' &&
                        <div className="filter-options">
                            <div>Do you really want to delete this flashcard?</div>
                            <button onClick={handleDeleteYes}>Yes</button>
                            <button onClick={handleDeleteNo}>No</button>
                        </div>
                    }
                </Overlay>

                <div className="deck-page-content">
                    <h1 className="deck-page-title">{deckProgress.name}</h1>
                    <div className="deck-page-statistics-container">
                        <div className="deck-page-right">
                            <PieChart
                                data={{
                                    newCards: deckProgress.newCards,
                                    toReview: deckProgress.toReview,
                                    learnedCards: deckProgress.learnedCards,
                                }}
                                className="deck-page-pie-chart"
                            />
                        </div>
                        <div className="deck-page-left">
                            <p>Progress: {deckProgress.progress}%</p>
                            <p>New Cards: {deckProgress.newCards}</p>
                            <p>To Review Cards: {deckProgress.toReview}</p>
                            <p>Learned Cards: {deckProgress.learnedCards}</p>
                        </div>
                    </div>
                    <h3 className="deck-page-subtitle">Flashcards</h3>
                    {flashcards.length > 0 ? (
                        <ul className="deck-page-ul">
                            {Array.isArray(flashcards) && flashcards ? (flashcards.map(flashcard => (
                                <li key={flashcard.id} className="deck-page-flashcard-item">
                                    <div className="deck-page-flashcard">
                                        <div className="deck-page-front">{flashcard.front}</div>
                                        <div className="deck-page-back">{flashcard.back}</div>
                                    </div>
                                    <div className="deck-page-flashcard-actions">
                                        <button
                                            onClick={() => {
                                                setFormType('edit');
                                                setEditedCardId(flashcard.id);
                                                setEditedCardFront(flashcard.front);
                                                setEditedCardBack(flashcard.back);
                                                toggleOverlay();
                                            }}
                                            className="deck-page-edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormType('delete');
                                                setEditedCardId(flashcard.id);
                                                toggleOverlay();
                                            }}
                                            className="deck-page-delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            )))
                            :
                            <p>No flashcards available in this deck</p>
                            }

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
