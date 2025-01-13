import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import testDecks from "../../../assets/mockData/testDecks";
import testFolders from "../../../assets/mockData/testFolders";
import './FolderPage.css';

import Navbar from "../../Navbar/Navbar";

const FolderPage = () => {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Find the folder based on the ID from the URL params
        const foundFolder = testFolders.find(fold => fold.id === parseInt(id));

        // If folder is found, fetch the decks
        if (foundFolder) {
            console.log("Found folder:", foundFolder); // Debugging: Check if folder is found

            setFolder(foundFolder);
            // Map deckIds and only include decks that exist in testDecks
            const folderDecks = foundFolder.deckIds
                .map(deckId => {
                    const deck = testDecks.find(deck => deck.id === deckId);
                    if (deck) {
                        return deck; // Return deck if found
                    }
                    console.log(`Deck with ID ${deckId} not found in testDecks`); // Debugging: Log missing decks
                    return null; // Return null if deck not found
                })
                .filter(deck => deck !== null); // Remove null values (decks that weren't found)

            setDecks(folderDecks);
        } else {
            setFolder(null); // Folder not found
            console.log(`Folder with ID ${id} not found.`); // Debugging: Log when folder is not found
        }
    }, [id]); // Run effect when the 'id' parameter changes

    return (
        <div>
            <Navbar />
            <div className="folder-page">
                {folder ? (
                    <div className="folder-page-content">
                        <h1 className="folder-page-h1">{folder.name}</h1>
                        {decks.length > 0 ? (
                            <div className="folder-page-deck-list">
                                {decks.map(deck => (
                                    <div key={deck.id} className="folder-page-deck-card">
                                        {/* Progress in Upper Right Corner */}
                                        <div className="folder-page-progress">Progress: <strong>{deck.progress}%</strong></div>

                                        <div className="folder-page-deck-title">
                                            {deck.title}
                                        </div>

                                        <p className="folder-page-deck-info">{deck.info}</p>

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
                                            <button onClick={() => navigate(`/study/${deck.id}`)} className="folder-page-study-btn">
                                                Study
                                            </button>
                                            <button onClick={() => navigate(`/deck/${deck.id}`)} className="folder-page-edit-btn">
                                                Edit
                                            </button>
                                            <button className="folder-page-delete-btn">Delete</button>
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
