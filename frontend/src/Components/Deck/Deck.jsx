import React from "react";

import './Deck.css';

const Deck = (props) => {

    const {title, newCards, learningCards, reviewingCards} = props.deckState;

    return <div className="deck">
        <div className="card-title">{title}</div>

        <div className="deck-state">
            <div className="card-new">{newCards} new</div>
            <div className="card-learning">{learningCards} learning</div>
            <div className="card-reviewing">{reviewingCards} reviewing</div>
        </div>

        <div className="deck-actions">
                <button className="deck-action-button">+</button>
                <div className="deck-dropdown">
                    <div>Add Cards</div>
                    <div>Remove Deck</div>
                </div>
            </div>
    </div>
}

export default Deck;