import React, { useEffect, useState } from "react";
import './PlusButton.css';
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { useNavigate } from "react-router-dom";
import Overlay from "../../Overlay/Overlay";
import FolderService from "../../../services/FolderService";
import DeckService from "../../../services/DeckService";

const PlusButton = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [folders, setFolders] = useState([]);
    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();
    const [newFolderName, setNewFolderName] = useState("");
    const [deckName, setDeckName] = useState("");
    const [folderName, setFolderName] = useState("");
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [formType, setFormType] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await FolderService.getAllFolders();
                setFolders(response || []);
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

    const handleCreateFolder = async () => {
        try {
            const response = await FolderService.createFolder(newFolderName, selectedFolderId);
            console.log("Folder created:", response);
            setNewFolderName("");
        } catch (error) {
            console.error("Error creating folder:", error);
        } finally {
            closeOverlay();
        }
    };

    const filterRootFolder = (folders) => {
        if (!folders || folders.length === 0) return [];
        return folders.filter((folder) => folder.name !== "ROOT");
    }

    const handleCreateDeck = async () => {
    try {
        const response = await DeckService.createDeck(selectedFolderId, deckName);
        console.log("Deck created:", response);
    } catch (error) {
        console.error("Error creating folder:", error);
    } finally {
        closeOverlay();
    }
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

                    <select
                        value={selectedFolderId}
                        onChange={(e) => setSelectedFolderId(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select folder</option>
                        {Array.isArray(folders) && folders.length > 0 ? (filterRootFolder(folders).map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))
                        ) : (
                            <option value="">No folders available</option>
                        )}
                    </select>

                    <input
                        type="text"
                        placeholder="Deck name..."
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                        required
                    />

                    <button type="button" onClick={handleCreateDeck}>Create</button>
                </div> }
                {formType === 'folder' &&
                <div className="plus-button-create-folder">
                    <h3>Create Folder</h3>
                    <p>Select parent folder:</p>
                    <select
                        value={selectedFolderId}
                        onChange={(e) => setSelectedFolderId(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select folder</option>
                        {Array.isArray(folders) ? (folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))
                        ) : (
                            <option value="">No folders available</option>
                        )}
                    </select>
                    <input
                        type="text"
                        placeholder="Folder name..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        required
                    />
                    <button type="button" onClick={handleCreateFolder}>Create</button>
                </div> }
            </Overlay>
        </div>
    );
};

export default PlusButton;
