import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import testDecks from "../../../assets/mockData/testDecks";
import testFolders from "../../../assets/mockData/testFolders";
import './FolderPage.css';

import Navbar from "../../Navbar/Navbar";

const FolderPage = (props) => {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [decks, setDecks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const foundFolder = testFolders.find(fold => fold.id === parseInt(id));
        if (foundFolder) {
            setFolder(foundFolder);
            const folderDecks = foundFolder.deckIds.map(deckId => testDecks.find(deck => deck.id === deckId));
            setDecks(folderDecks);
        } else {
            setFolder(null);
        }
    }, [id]);

    return (
        <div>
        <Navbar details={props.details} />
        <div className="folder-page">

            {folder ? (
                <>
                    <h1 className="folder-page-h1">{folder.name}</h1>
                    <p className="folder-page-p">Created: {folder.createdAt}</p>
                    <p className="folder-page-p">Last Modified: {folder.modifiedAt}</p>

                    <h3 className="folder-page-h3">Decks in this folder:</h3>
                    {decks.length > 0 ? (
                        <div className="folder-page-deck-list">
                        {decks.map(deck => (
                            <div key={deck.id} className="folder-page-deck-card">
                                <div className="folder-page-deck-card-content">
                                    <h4>{deck.title}</h4>
                                    <p className="folder-page-deck-progress">Progress: {deck.progress}%</p>
                                    <p className="folder-page-deck-card-info">New Cards: {deck.newCards}</p>
                                    <p className="folder-page-deck-card-info">Learning Cards: {deck.learningCards}</p>
                                    <p className="folder-page-deck-card-info">Reviewing Cards: {deck.reviewingCards}</p>
                                    <p className="folder-page-deck-card-info">Created: {deck.createdAt}</p>
                                    <p className="folder-page-deck-card-info">Last Modified: {deck.lastModified}</p>
                                </div>
                                <div className="folder-page-deck-card-actions">
                                <button onClick={() => navigate(`/deck/study/${deck.id}`)} className="folder-page-study-btn">
                                    Study
                                </button>
                                <button onClick={() => navigate(`/deck/${deck.id}`)} className="folder-page-edit-btn">
                                    Edit
                                </button>
                                    <button className="folder-page-btn folder-page-delete-btn">Delete</button>
                                </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="folder-page-no-decks">No decks available in this folder</p>
                    )}
                </>
            ) : (
                <p className="folder-page-not-found">No folder found with this ID</p>
            )}
        </div>
        </div>
    );
};

export default FolderPage;
