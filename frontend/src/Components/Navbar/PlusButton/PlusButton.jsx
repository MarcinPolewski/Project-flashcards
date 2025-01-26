import React, { useEffect, useState } from "react";
import './PlusButton.css';
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import { useNavigate } from "react-router-dom";
import Overlay from "../../Overlay/Overlay";
import FolderService from "../../../services/FolderService";
import DeckService from "../../../services/DeckService";
import FriendshipService from "../../../services/FriendshipService";

import filterRootFolder from "../../../utils/filterRootFolder";
import validateEmail from "../../../utils/validateEmail";

const PlusButton = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [folders, setFolders] = useState([]);
    const { isOverlayOpen, toggleOverlay, closeOverlay, isPlusButtonPopupOpen, togglePlusButtonPopup, closePlusButtonPopup } = useOverlay();
    const [newFolderName, setNewFolderName] = useState("");
    const [newFriendEmail, setNewFriendEmail] = useState("");
    const [deckName, setDeckName] = useState("");
    const [selectedFolderIdForFolders, setSelectedFolderIdForFolders] = useState(null);
    const [selectedFolderIdForDecks, setSelectedFolderIdForDecks] = useState(null);
    const [formType, setFormType] = useState("");

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await FolderService.getAllFolders();
                setFolders(response || []);
                if (response && response.length > 0) {
                    setSelectedFolderIdForFolders(response[0]?.id);
                    setSelectedFolderIdForDecks(response[1]?.id);
                }
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
            const selectedId = formType === 'folder' ? selectedFolderIdForFolders : selectedFolderIdForDecks;
            console.log("Creating folder...", selectedId, newFolderName);
            const response = await FolderService.createFolder(newFolderName, selectedId);
            console.log("Folder created:", response);
            setNewFolderName("");
            window.location.reload();
        } catch (error) {
            console.error("Error creating folder:", error);
        } finally {
            setFormType("");
            closePlusButtonPopup();
        }
    };

    const handleCreateDeck = async () => {
        try {
            const selectedId = formType === 'folder' ? selectedFolderIdForFolders : selectedFolderIdForDecks;
            console.log("Creating deck...", selectedId, deckName);
            const response = await DeckService.createDeck(selectedId, deckName);
            console.log("Deck created:", response);
            window.location.reload();
        } catch (error) {
            console.error("Error creating folder:", error);
        } finally {
            setFormType("");
            closePlusButtonPopup();
        }
    };

    const handleSendFriendRequest = async () => {
        if (!validateEmail(newFriendEmail)) {
            alert("Please enter friend's email in correct form.");
            return;
        }

        if (!newFriendEmail) {
            alert("Please enter friend's email.");
            return;
        }

        try {
            console.log("Sending friend request to: ", newFriendEmail);
            const response = await FriendshipService.sendFriendshipOfferByEmail(newFriendEmail);
            console.log("Friend request sent:", response);
            alert("Friend request sent!");
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert("Error sending friend request.");
        } finally {
            setFormType("");
            closePlusButtonPopup();
        }
    }

    const openCreateForm = (type) => {
        setFormType(type);
        togglePlusButtonPopup();
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
                        <li onClick={() => openCreateForm('friend')}>Add Friend</li>
                    </ul>
                </div>
            )}

            <Overlay isOpen={isPlusButtonPopupOpen} closeOverlay={closePlusButtonPopup}>
                {formType === 'deck' &&
                <div className="plus-button-create-deck">
                    <h3>Create Deck</h3>

                    <select
                        value={selectedFolderIdForDecks}
                        onChange={(e) => {setSelectedFolderIdForDecks(e.target.value); console.log("Selected folder: ", e.target.value)}}
                        required
                    >
                        <option value="" disabled>Select folder</option>
                        {Array.isArray(folders) && folders.length > 0 ? (filterRootFolder(folders).map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))
                        ) : (
                            <option value={null}>No folders available</option>
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
                        value={selectedFolderIdForFolders}
                        onChange={(e) => {setSelectedFolderIdForFolders(e.target.value); console.log("Selected folder: ", e.target.value)}}
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
                {formType === 'friend' &&
                <div className="plus-button-create-folder">
                    <h3>Add Friend</h3>
                    <p>Enter friend's email:</p>
                    <input
                        type="text"
                        placeholder="Friend's email..."
                        value={newFriendEmail}
                        onChange={(e) => setNewFriendEmail(e.target.value)}
                        required
                    />
                    <button type="button" onClick={handleSendFriendRequest}>Add Friend</button>
                </div> }
            </Overlay>
        </div>
    );
};

export default PlusButton;
