import React from "react";

import './Deck.css';
import { useNavigate } from "react-router-dom";

const Deck = ({ deckState, handleEditButton, handleDeleteButton }) => {

    const {id, name, newCards, toReviewCards, learnedCards} = deckState;

    const navigate = useNavigate();

    return <div className="deck">
        <div className="deck-title">{name}</div>

        <div className="deck-state">
            <div className="card-new">{newCards} new</div>
            <div className="card-learning">{toReviewCards} to review</div>
            <div className="card-reviewing">{learnedCards} learned</div>
        </div>

        <div className="deck-actions">
            <button onClick={() => navigate(`/study/${id}`)} className="decks-page-study-btn">
                Study
            </button>
            <button onClick={() => handleEditButton('edit')} className="decks-page-edit-btn">
                Edit
            </button>
            <button onClick={() => {
                navigate(`/deck/${id}`);
                window.location.reload(); }
                } className="decks-page-edit-btn">
                Open
            </button>
            <button className="decks-page-delete-btn" onClick={() => handleDeleteButton('delete')}>Delete</button>
        </div>
    </div>
}

export default Deck;