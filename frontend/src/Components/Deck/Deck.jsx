import React from "react";

import './Deck.css';
import { useNavigate } from "react-router-dom";

const Deck = ({ deckState, handleEditButton, handleDeleteButton }) => {

    const {id, learnedCards, name, newCards, toReview} = deckState;

    const navigate = useNavigate();

    return <div className="deck">
        <div className="deck-title">{name}</div>

        <div className="deck-state">
            <div className="card-new">{newCards} new</div>
            <div className="card-reviewing">{toReview} reviewing</div>
            <div className="card-learning">{learnedCards} learned</div>
        </div>

        <div className="deck-actions">
            <button onClick={() => {navigate(`/study/${id}`); window.location.reload();}} className="decks-page-study-btn">
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