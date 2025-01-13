import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import './CreateFlashcard.css';


import FlashcardService from '../../../services/FlashcardService';
import FolderService from "../../../services/FolderService";

const CreateFlashcard = (props) => {

    const [deckId, setDeckId] = useState(null);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const [folders, setFolders] = useState([]);
    const [decks, setDecks] = useState([]);

    const [pickedFolder, setPickedFolder] = useState(null);
    const [pickedDeck, setPickedDeck] = useState(null);

    const navigate = useNavigate();

    const handleAddFlashcard = async () => {
        if (!front.trim() || !back.trim()) {
            alert("Both 'Front' and 'Back' fields must be filled.");
            return;
        }
        
        try {
            await FlashcardService.createFlashcard(deckId, front, back);
            navigate("/");
        } catch (error) {
            console.error("Error creating flashcard:", error);
        }
    };

    const handleFolderChange = async (folderId) => {
        setPickedFolder(folderId);
        setPickedDeck(null);
        setDeckId(null);
        const newDecks = await FolderService.getDecksInFolder(folderId);
        setDecks(newDecks);
    }

    const handleDeckChange = (deckId) => {
        setPickedDeck(deckId);
        setDeckId(deckId);
    }

    useEffect(() => {
        const fetchFolders = async () => {
            const folderStructure = await FolderService.getFolderStructure();
            setFolders(folderStructure);
        };
        fetchFolders();
    }, []);

    return (
        <div>
            <Navbar details={props.details} />
            <div className="create-flashcard">

                <div className="flashcard-container">

                        <div className="inputs-container">
                            <div className="input-group">
                                <label htmlFor="deck">Choose Deck</label>
                                <select
                                    id="deck"
                                    className="dropdown"
                                    value={pickedDeck}
                                    onChange={(e) => setPickedDeck(e.target.value)}
                                >
                                    {decks.map((deck) => (
                                        <option key={deck.id} value={deck.name}>
                                            {deck.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    <div className="inputs-container">
                        <div className="input-group">
                            <label htmlFor="deck"> Choose Folder </label>
                            <select
                                id="deck"
                                className="dropdown"
                                onChange={(e) => handleFolderChange(e.target.value)}
                                value={pickedFolder || ''}
                            >
                                <option value="" disabled>Select a folder</option>
                                {folders.map((folder) => (
                                    <option key={folder.id} value={folder.id}>
                                        {folder.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="deck"> Choose Deck </label>
                            <select
                                id="deck"
                                className="dropdown"
                                onChange={(e) => handleDeckChange(e.target.value)}
                                value={pickedDeck || ''}
                                disabled={!pickedFolder}
                            >
                                <option value="" disabled>Select a deck</option>
                                {decks.map((deck) => (
                                    <option key={deck.id} value={deck.id}>
                                        {deck.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flashcard-inputs">
                            <textarea
                                placeholder="Front"
                                className="textarea"
                                value={front}
                                onChange={(e) => setFront(e.target.value)}
                            />
                            <textarea
                                placeholder="Back"
                                className="textarea"
                                value={back}
                                onChange={(e) => setBack(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="cancel-button" onClick={() => navigate("/")}> Cancel </button>
                        <button
                            className="add-button"
                            onClick={handleAddFlashcard}
                            disabled={!pickedDeck || !front.trim() || !back.trim()}
                        >
                            Add
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateFlashcard;
