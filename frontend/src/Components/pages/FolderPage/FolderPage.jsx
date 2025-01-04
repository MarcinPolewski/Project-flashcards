import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import testDecks from "../../../assets/test/testDecks";
import testFolders from "../../../assets/test/testFolders";
import './FolderPage.css';

import Navbar from "../../Navbar/Navbar";

const FolderPage = (props) => {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [decks, setDecks] = useState([]);

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
        <div className="folder-page">
            <Navbar details = {props.details} />

            {folder ? (
                <>
                    <h1>{folder.name}</h1>
                    <p>Created: {folder.createdAt}</p>
                    <p>Last Modified: {folder.modifiedAt}</p>

                    <h3>Decks in this folder:</h3>
                    {decks.length > 0 ? (
                        <ul>
                            {decks.map(deck => (
                                <li key={deck.id}>
                                    <Link to={`/deck/${deck.id}`}>
                                        {deck.title} - Progress: {deck.progress}%
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No decks available in this folder</p>
                    )}
                </>
            ) : (
                <p>No folder found with this ID</p>
            )}
        </div>
    );
};

export default FolderPage;
