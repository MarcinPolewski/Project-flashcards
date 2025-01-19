import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './FolderPage.css';

import Navbar from "../../Navbar/Navbar";
import Overlay from "../../Overlay/Overlay";
import FolderService from "../../../services/FolderService";
import DeckService from "../../../services/DeckService";
import Folder from "../../Folder/Folder";
import { EditFolder, DeleteFolder } from "../../EditFolder/EditFolder";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";

const FolderPage = () => {
    const { id } = useParams();
    const [folder, setFolder] = useState(null);
    const [folderChildren, setFolderChildren] = useState([]);
    const [decks, setDecks] = useState([]);
    const navigate = useNavigate();

    const [deckIdToDelete, setDeckIdToDelete] = useState(null);

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();
    const [formType, setFormType] = useState(null);

    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [selectedFolderTitle, setSelectedFolderTitle] = useState(null);

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

        const fetchFolderChildren = async () => {
            try {
                const response = await FolderService.getFolderChildren(id);
                setFolderChildren(response || folderChildren);
            } catch (error) {
                console.error("Error while fetching child folders: ", error);
            }
        }

        fetchFolder();
        fetchDecksInFolder();
        fetchFolderChildren();
    }, []);

    const handleEditClick = (id, title) => {
        setSelectedFolderId(id);
        setSelectedFolderTitle(title);
        setFormType('edit');
        toggleOverlay();
    };

    const handleDeleteClick = (id, title) => {
        setSelectedFolderId(id);
        setSelectedFolderTitle(title);
        setFormType('delete');
        toggleOverlay();
    };

    const handleFolderEdit = async () => {
        try {
            if (selectedFolderId !== null) {
                const response = await FolderService.updateFolder(selectedFolderId, selectedFolderTitle);
                setFolderChildren(folderChildren.map((child) =>
                    child.id === selectedFolderId ? { ...child, name: selectedFolderTitle } : child
                ));
                alert("Folder edited successfully.");
            }
        } catch (error) {
            console.error("Error while editing folder: ", error);
            alert("Error occurred while editing folder.");
        } finally {
            closeOverlay();
            setSelectedFolderId(null)
        }
    };

    const handleFolderDelete = async () => {
        try {
            if (selectedFolderId !== null) {
                const response = await FolderService.deleteFolder(selectedFolderId);
                setFolderChildren(folderChildren.filter((child) => child.id !== selectedFolderId));
                alert("Folder deleted successfully.");
            }
        } catch (error) {
            console.error("Error while deleting folder: ", error);
            alert("Error occurred while deleting folder.");
        } finally {
            closeOverlay();
            setSelectedFolderId(null)
        }
    };

    const handleDeleteYes = async () => {
        try {
            if (deckIdToDelete !== null) {
                const response = await DeckService.deleteDeck(deckIdToDelete);
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
        setFormType('deck-edit');
        toggleOverlay();
    }

    return (
        <div>
            <Navbar />
            <div className="folder-page">
            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                {formType === 'deck-edit' &&
                <div className="filter-options">
                    <div>Do you really want to delete this deck along side with all its contents?</div>
                    <button onClick={handleDeleteYes}>Yes</button>
                    <button onClick={handleDeleteNo}>No</button>
                </div>
                }
                {formType === 'edit' &&
                    <EditFolder id={selectedFolderId} title={selectedFolderTitle} closeOverlay={closeOverlay} onFolderEdit={handleFolderEdit}/>
                }
                {formType === 'delete' &&
                    <DeleteFolder id={selectedFolderId} title={selectedFolderTitle} closeOverlay={closeOverlay} onFolderDelete={handleFolderDelete}/>
                }
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
                                            <button onClick={() => navigate(`/study/${deck.id}`)} className="folder-page-study-btn">
                                                Study
                                            </button>
                                            <button onClick={() => navigate(`/deck/${deck.id}`)} className="folder-page-edit-btn">
                                                Edit
                                            </button>
                                            <button className="folder-page-delete-btn" onClick={
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
            <div className="folder-page-content">

            <div className="folder-page-h1">Deck Folders</div>
                <div className="folder-page-deck-list">
                {
                Array.isArray(folderChildren) && folderChildren.length > 0 ? folderChildren
                    .map((child) => {
                        return <Folder key={child.id} id={child.id} title={child.name}
                                onEdit={() => handleEditClick(child.id, child.name)}
                                onDelete={() => handleDeleteClick(child.id, child.name)}
                        />
                })
                :
                <div className="folder-page-not-found">No folders available</div>
                }
                </div>

            </div>
            </div>
        </div>
    );
};

export default FolderPage;
