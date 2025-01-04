import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import testDecks from "../../../assets/test/testDecks";

const FolderPage = () => {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);

    useEffect(() => {
        const foundFolder = testDecks.find(deck => deck.id === id);
        setFolder(foundFolder);
    }, [id]);

    if (!folder) return <div>Loading...</div>;

    return (
        <div>
            <h1>{folder.title}</h1>
            <ul>
                {folder.decks.map((deck, index) => (
                    <li key={index}>{deck.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default FolderPage;
