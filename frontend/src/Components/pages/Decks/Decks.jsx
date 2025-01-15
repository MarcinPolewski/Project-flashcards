import React, { useEffect, useState } from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";
import Overlay from "../../Overlay/Overlay";

import testDecks from "../../../assets/mockData/testDecks";

import './Decks.css';
import sortDecks from "../../../utils/sortDecks";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import DeckService from "../../../services/DeckService";

const Decks = () => {

    const [decks, setDecks] = useState([]);

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

    const [formType, setFormType] = useState("");
    const [deckIdToDelete, setDeckIdToDelete] = useState(null);

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

    const handleDeleteYes = async () => {
        try {
            if (deckIdToDelete !== null) {
                await DeckService.deleteDeck(deckIdToDelete);
                setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckIdToDelete));
                alert("Deck deleted successfully.");
            }
        } catch (error) {
            console.error("Error while deleting deck: ", error);
            alert("Error occurred while deleting deck.");
        } finally {
            closeOverlay();
            setDeckIdToDelete(null);
        }
    }

    const handleDeleteNo = () => {
        closeOverlay();
    }

    const handleDeleteButton = (id) => {
        setDeckIdToDelete(id);
        toggleOverlay();
        setFormType('delete');
    }

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await DeckService.getAllDecksInfo();
                console.log(response);
                setDecks(response);
            } catch (error) {
                console.error("Error while fetching decks: ", error);
            }
        };

        fetchDecks();
    }, []);

    const filterDecks = (decksToFilter) => (
        decksToFilter.filter((deck) =>
            deck.name && deck.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    return <div className="decks">
        <Navbar />
        <div className="decks-container">

            <div className="decks-manipulate">

                <input className="decks-input" type="text" placeholder="Search decks.." value={searchTerm} onChange={handleSearchChange}/>
                <div className="decks-filter-button" onClick={() => {toggleOverlay(); setFormType('sort')}}>Sort</div>

            </div>

            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                {formType === 'sort' &&
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
                }
                {formType === 'delete' &&
                    <div className="filter-options">
                        <div>Do you really want to delete this deck along side with all its contents?</div>
                        <button onClick={handleDeleteYes}>Yes</button>
                        <button onClick={handleDeleteNo}>No</button>
                    </div>
                }
            </Overlay>

            <div className="decks-list">
                {sortDecks(filterDecks(decks), sortOptions)
                    .map((deck, idx) => (
                        <Deck key={idx} deckState={deck} handleDeleteButton={() => handleDeleteButton(deck.id)}/>
                ))}
            </div>

        </div>
    </div>
}

export default Decks;
