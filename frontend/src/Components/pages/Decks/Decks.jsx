import React, { useState } from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";
import Overlay from "../../Overlay/Overlay";

import testDecks from "../../../assets/mockData/testDecks";

import './Decks.css';
import sortDecks from "../../../utils/sortDecks";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";

const Decks = () => {

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

    const [sortOptions, setSortOptions] = useState({
        alphabet: false,
        recentUsage: false,
        creationDate: false,
        learningProgress: false,
        lastModified: false,
        reversed: false,
    });

    const [searchTerm, setSearchTerm] = useState("");

    const handleSortChange = (e) => {
        const { name, checked } = e.target;

        if (name === "reversed") {
            setSortOptions((prev) => ({
                ...prev,
                reversed: checked,
            }));
        } else {
            if (checked) {
                setSortOptions((prev) => ({
                    alphabet: false,
                    recentUsage: false,
                    creationDate: false,
                    learningProgress: false,
                    lastModified: false,
                    reversed: prev.reversed,
                    [name]: true,
                }));
            } else {
                setSortOptions((prev) => ({
                    ...prev,
                    [name]: false,
                }));
            }
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredDecks = testDecks.filter((deck) =>
        deck.title && deck.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return <div className="decks">
        <Navbar />
        <div className="decks-container">

            <div className="decks-manipulate">

                <input className="decks-input" type="text" placeholder="Search decks.." value={searchTerm} onChange={handleSearchChange}/>
                <div className="decks-filter-button" onClick={toggleOverlay}>Sort</div>

            </div>

            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                <div
                    className="filter-options"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3>Sort by:</h3>
                <form>
                    <div className="filter-item">
                        <input type="checkbox" id="alphabet" name="alphabet" checked={sortOptions.alphabet} onChange={handleSortChange}/>
                        <label htmlFor="alphabet">Alphabet</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="recent-usage" name="recentUsage" checked={sortOptions.recentUsage} onChange={handleSortChange}/>
                        <label htmlFor="recent-usage">Recent usage</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="creation-date" name="creationDate" checked={sortOptions.creationDate} onChange={handleSortChange}/>
                        <label htmlFor="creation-date">Creation date</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="progress-learning" name="learningProgress" checked={sortOptions.learningProgress} onChange={handleSortChange}/>
                        <label htmlFor="progress-learning">Progress of learning</label>
                    </div>
                    <div className="filter-item">
                        <input type="checkbox" id="last-modified" name="lastModified" checked={sortOptions.lastModified} onChange={handleSortChange}/>
                        <label htmlFor="last-modified">Last modified</label>
                    </div>
                </form>
                <div className="filter-reverse">
                    <input type="checkbox" id="reverse" name="reversed" checked={sortOptions.reversed} onChange={handleSortChange}/>
                    <label htmlFor="reverse">Reversed</label>
                </div>
                </div>
            </Overlay>

            <div className="decks-list">
                {sortDecks(filteredDecks, sortOptions)
                    .map((deck, idx) => (
                        <Deck key={idx} deckState={deck}/>
                ))}
            </div>

        </div>
    </div>
}

export default Decks;
