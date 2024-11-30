import React, { useState } from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";
import Overlay from "../../Overlay/Overlay";

import testDecks from "../../../assets/test/testDecks";

import './Decks.css';

const Decks = (props) => {

    const [isFilterOpen, setFilterOpen] = useState(false);

    const toggleFilter = () => {
        setFilterOpen(!isFilterOpen);
    }

    const closeFilter = () => {
        setFilterOpen(false);
    }

    return <div className="decks">
        <Navbar details={props.details}/>
        <div className="decks-container">

            <div className="decks-manipulate">

                <input className="decks-input" type="text" />
                <div className="decks-filter-button" onClick={toggleFilter}>Filter</div>

            </div>

            <Overlay isOpen={isFilterOpen} closeOverlay={closeFilter}>
                <div
                    className="filter-options"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3>Sort by:</h3>
                    <ul>
                        <li>Alphabet</li>
                        <li>Recent usage</li>
                        <li>Creation date</li>
                        <li>Progress of learning</li>
                        <li>Last modified</li>
                    </ul>
                    <div>
                        <input type="checkbox" id="reverse" />
                        <label htmlFor="reverse">Reversed checkbox</label>
                    </div>
                </div>
            </Overlay>

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
