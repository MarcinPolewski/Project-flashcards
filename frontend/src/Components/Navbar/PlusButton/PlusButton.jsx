import React, { useEffect, useState } from "react";
import './PlusButton.css';
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { useNavigate } from "react-router-dom";
import Overlay from "../../Overlay/Overlay";
import testFolders from "../../../assets/mockData/testFolders";
import FolderService from "../../../services/FolderService";
import DeckService from "../../../services/DeckService";

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
                const response = await FolderService.getFolderStructure();
                setFolders(response);
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

    const handleCreateFolder = async (folderName, parentFolderId) => {
        try {
        const result = await FolderService.createFolder(folderName, parentFolderId);
        setNewFolderName("");
        } catch (error) {
            console.error("Error creating folder:", error);
        } finally {
            closeOverlay();
        }
    };

    const handleCreateDeck = (parentFolderId, deckName) => {
    try {
        const result = DeckService.createDeck(parentFolderId, deckName);
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
                        <option value="" disabled>Select parent folder</option>
                        {folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))}
                    </select>

                    <button type="button" onClick={handleCreateDeck}>Create Deck</button>
                </div> }
                {formType === 'folder' &&
                <div className="plus-button-create-folder">
                    <h3>Create Folder</h3>
                    <option value="" disabled>Select parent folder</option>
                        {folders.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                    ))}
                    <input
                        type="text"
                        placeholder="Folder name..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        required
                    />
                    <button type="button" onClick={handleCreateFolder}>Add Folder</button>
                </div> }
            </Overlay>
        </div>
    );
};

export default PlusButton;
