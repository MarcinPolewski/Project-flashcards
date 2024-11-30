import React, { useState } from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";
import Overlay from "../../Overlay/Overlay";

import testDecks from "../../../assets/test/testDecks";

import './Decks.css';

const Decks = (props) => {

    const [isFilterOpen, setFilterOpen] = useState(false);

    const [isAlphabetSorted, setAlphapetSorted] = useState(false);

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
                <form>
                    <div className="filter-item">
                        <input type="checkbox" id="alphabet" name="alphabet" />
                        <label htmlFor="alphabet">Alphabet</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="recent-usage" name="recent-usage" />
                        <label htmlFor="recent-usage">Recent usage</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="creation-date" name="creation-date" />
                        <label htmlFor="creation-date">Creation date</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="progress-learning" name="progress-learning" />
                        <label htmlFor="progress-learning">Progress of learning</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="last-modified" name="last-modified" />
                        <label htmlFor="last-modified">Last modified</label>
                    </div>
                </form>
                <div className="filter-reverse">
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
