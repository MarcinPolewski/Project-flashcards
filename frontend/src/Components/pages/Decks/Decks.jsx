import React, { useEffect, useState } from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";
import Overlay from "../../Overlay/Overlay";
import './Decks.css';
import sortDecks from "../../../utils/sortDecks";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import DeckService from "../../../services/DeckService";

const Decks = () => {

    const [decks, setDecks] = useState([]);

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

    const [formType, setFormType] = useState("");
    const [deckIdToDelete, setDeckIdToDelete] = useState(null);
    const [deckIdToEdit, setDeckIdToEdit] = useState(null);
    const [newDeckName, setNewDeckName] = useState("");

    const [sortOptions, setSortOptions] = useState({
        alphabet: false,
        recentUsage: false,
        learningProgress: false,
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
                    learningProgress: false,
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

    const handleSubmitEdit = async () => {
        try {
            if (deckIdToEdit !== null) {
                if (newDeckName.length < 3 || newDeckName.length > 20) {
                    alert("Deck name must be between 3 and 20 characters!");
                    return;
                }
                const response = await DeckService.updateDeck(deckIdToEdit, newDeckName);
                setDecks((prevDecks) => prevDecks.map((deck) => deck.id === deckIdToEdit ? response : deck));
                alert("Deck name changed successfully.");
            }
        } catch(error) {
            alert("Error occurred while changing deck name.");
        } finally {
            closeOverlay();
            setDeckIdToEdit(null);
            setNewDeckName("");
        }
    }

    const handleDeleteNo = () => {
        closeOverlay();
    }

    const handleEditButton = (id) => {
        setDeckIdToDelete(id);
        setFormType('edit');
        toggleOverlay();
    }

    const handleDeleteButton = (id) => {
        setDeckIdToEdit(id);
        setFormType('delete');
        toggleOverlay();
    }

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const response = await DeckService.getAllDecksInfo();
                console.log(response);
                setDecks(response || []);
            } catch (error) {
                console.error("Error while fetching decks: ", error);
            }
        };

        fetchDecks();
    }, []);

    useEffect(() => {
        setDecks((prevDecks) => sortDecks(prevDecks, sortOptions));
    }, [sortOptions, decks]);

    const filterDecks = (decksToFilter) => {
        if (!Array.isArray(decksToFilter)) {
            console.error("filterDecks: decksToFilter is not an array", decksToFilter);
            return [];
        }
        return decksToFilter.filter((deck) =>
            deck?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )};

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
                        <input type="checkbox" id="progress-learning" name="learningProgress" checked={sortOptions.learningProgress} onChange={handleSortChange}/>
                        <label htmlFor="progress-learning">Progress of learning</label>
                    </div>
                </form>
                <div className="filter-reverse">
                    <input type="checkbox" id="reverse" name="reversed" checked={sortOptions.reversed} onChange={handleSortChange}/>
                    <label htmlFor="reverse">Reversed</label>
                </div>
                </div>
                }
                {formType === 'edit' &&
                    <div className="plus-button-create-deck">
                        <div>Edit deck name</div>

                        <input
                            type="text"
                            placeholder="Deck name..."
                            value={newDeckName}
                            onChange={(e) => setNewDeckName(e.target.value)}
                            required
                        />

                        <button onClick={handleSubmitEdit}>Save</button>
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
                {sortDecks(Array.isArray(decks) ? filterDecks(decks) : [], sortOptions)
                    .map((deck, idx) => (
                        <Deck key={idx} deckState={deck}
                        handleEditButton={() => handleEditButton(deck.id)}
                        handleDeleteButton={() => handleDeleteButton(deck.id)}/>
                ))}
            </div>

        </div>
    </div>
}

export default Decks;
