import React, { useEffect, useState } from "react";
import './PlusButton.css';
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { useNavigate } from "react-router-dom";
import Overlay from "../../Overlay/Overlay";

const PlusButton = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [folders, setFolders] = useState([]);
    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();
    const [newFolderName, setNewFolderName] = useState("");
    const [deckName, setDeckName] = useState("");
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [formType, setFormType] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch("/api/folders");
                const data = await response.json();
                setFolders(data);
            } catch (error) {
                console.error("Error fetching folders:", error);
            }
        };
        fetchFolders();
    }, []);

    const handleTogglePopup = () => {
        setPopupOpen(!isPopupOpen);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.plus-button-container')) {
            setPopupOpen(false);
        }
    };

    const handleCreateFolder = () => {
        console.log("Creating folder:", newFolderName);
        setFolders([...folders, { name: newFolderName }]);
        setNewFolderName("");
        closeOverlay();
    };

    const handleCreateDeck = () => {
        console.log("Creating deck:", deckName, "in folder:", selectedFolder);
        closeOverlay();
    };

    const openCreateForm = (type) => {
        setFormType(type);
        toggleOverlay();
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="plus-button-container">
            <div className="plus-button" onClick={handleTogglePopup}>
                <div className="plus-button-img">+</div>
            </div>

            {isPopupOpen && (
                <div className="plus-button-popup popup">
                    <ul>
                    <li onClick={() => navigate("/create-flashcard")}>Create Flashcard</li>
                        <li onClick={() => openCreateForm('deck')}>Create Deck</li>
                        <li onClick={() => openCreateForm('folder')}>Create Folder</li>
                    </ul>
                </div>
            )}

            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                {formType === 'deck' &&
                <div className="plus-button-create-deck">
                    <h3>Create Deck</h3>
                    <input
                        type="text"
                        placeholder="Deck name..."
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                    />
                    <select
                        value={selectedFolder}
                        onChange={(e) => setSelectedFolder(e.target.value)}
                        required
                    >
                        {folders.map((folder, index) => (
                            <option key={index} value={folder.name}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" onClick={handleCreateDeck}>Create Deck</button>
                </div> }
                {formType === 'folder' &&
                <div className="plus-button-create-folder">
                    <h3>Create Folder</h3>
                    <input
                        type="text"
                        placeholder="Folder name..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={handleCreateFolder}>Add Folder</button>
                </div> }
            </Overlay>
        </div>
    );
};

export default PlusButton;
