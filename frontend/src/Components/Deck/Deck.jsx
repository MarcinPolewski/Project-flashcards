import React from "react";

import './Deck.css';
import { useNavigate } from "react-router-dom";

const Deck = (props) => {

    const {id, title, newCards, learningCards, reviewingCards} = props.deckState;

    const navigate = useNavigate();

    return <div className="deck">
        <div className="deck-title">{title}</div>

        <div className="deck-state">
            <div className="card-new">{newCards} new</div>
            <div className="card-learning">{learningCards} learning</div>
            <div className="card-reviewing">{reviewingCards} reviewing</div>
        </div>

        <div className="deck-actions">
            <button onClick={() => navigate(`/study/${id}`)} className="decks-page-study-btn">
                Study
            </button>
            <button onClick={() => navigate(`/deck/${id}`)} className="decks-page-edit-btn">
                Edit
            </button>
            <button className="decks-page-delete-btn">Delete</button>
        </div>
    </div>
}

export default Deck;