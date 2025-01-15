import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './FolderPage.css';

import Navbar from "../../Navbar/Navbar";
import Overlay from "../../Overlay/Overlay";
import FolderService from "../../../services/FolderService";
import DeckService from "../../../services/DeckService";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";

const FolderPage = () => {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();

    const [deckIdToDelete, setDeckIdToDelete] = useState(null);

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

    useEffect(() => {
        const fetchFolder = async () => {
            try {
                const response = await FolderService.getFolder(id);
                setFolder(response);
            } catch (error) {
                console.error("Error while fetching folder: ", error);
            }
        }

        const fetchDecksInFolder = async () => {
            try {
                const response = await FolderService.getDecksInfo(id);
                setDecks(response);
            } catch (error) {
                console.error("Error while fetching decks: ", error);
            }
        }

        fetchFolder();
        fetchDecksInFolder();
    }, []);

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
    }

    return (
        <div>
            <Navbar />
            <div className="folder-page">
            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                <div className="filter-options">
                    <div>Do you really want to delete this deck along side with all its contents?</div>
                    <button onClick={handleDeleteYes}>Yes</button>
                    <button onClick={handleDeleteNo}>No</button>
                </div>
            </Overlay>

                {folder ? (
                    <div className="folder-page-content">
                        <h1 className="folder-page-h1">{folder.name}</h1>
                        {decks.length > 0 ? (
                            <div className="folder-page-deck-list">
                                {decks.map(deck => (
                                    <div key={deck.id} className="folder-page-deck-card">
                                        <div className="folder-page-progress">Progress: <strong>{deck.progress}%</strong></div>

                                        <div className="folder-page-deck-title">
                                            {deck.name}
                                        </div>

                                        <p className="folder-page-deck-info"></p>

                                        <div className="folder-page-deck-state">
                                            <p className="folder-page-card-new">
                                                {deck.newCards} new
                                            </p>
                                            <p className="folder-page-card-learning">
                                                {deck.learningCards} learning
                                            </p>
                                            <p className="folder-page-card-reviewing">
                                                {deck.reviewingCards} reviewing
                                            </p>
                                        </div>

                                        <div className="folder-page-deck-actions">
                                            <button onClick={() => navigate(`/study/${deck.id}`)} className="folder-study-btn">
                                                Study
                                            </button>
                                            <button onClick={() => navigate(`/deck/${deck.id}`)} className="folder-edit-btn">
                                                Edit
                                            </button>
                                            <button className="folder-delete-btn" onClick={
                                                () => handleDeleteButton(deck.id)
                                            }>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="folder-page-no-decks">No decks available in this folder</p>
                        )}
                    </div>
                ) : (
                    <p className="folder-page-not-found">No folder found with this ID</p>
                )}
            </div>
        </div>
    );
};

export default FolderPage;
