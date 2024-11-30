import React from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";

import testDecks from "../../../assets/test/testDecks";

import './Decks.css';

const Decks = (props) => {
    return <div className="decks">
        <Navbar details={props.details}/>
        <div className="decks-container">

            <div className="decks-manipulate">

                <input className="decks-input" type="text" />
                <div className="decks-filter-button">Filter</div>

            </div>

            <div className="decks-list">
                {testDecks
                    .map((deck, idx) => (
                        <Deck key={idx} deckState={deck}/>
                ))}
            </div>

        </div>
    </div>
}

export default Decks;
