import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import Navbar from "../../Navbar/Navbar";

import './Home.css';
import 'react-circular-progressbar/dist/styles.css';

import Folder from "../../Folder/Folder";
import { useNavigate } from "react-router-dom";
import DeckService from "../../../services/DeckService";
import FolderService from "../../../services/FolderService";
import NotificationService from "../../../services/NotificationService";
import { useOverlay } from "../../../contexts/OverlayContext/OverlayContext";
import Overlay from "../../Overlay/Overlay";
import { EditFolder, DeleteFolder } from "../../EditFolder/EditFolder";


const Home = () => {

    const [latestDecks, setLatestDecks] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [folders, setFolders] = useState([]);

    const [formType, setFormType] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);


    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

    const navigate = useNavigate();

    const handleEditClick = (id, title) => {
        setSelectedId(id);
        setSelectedTitle(title);
        setFormType('edit');
        toggleOverlay();
    };

    const handleDeleteClick = (id, title) => {
        setSelectedId(id);
        setSelectedTitle(title);
        setFormType('delete');
        toggleOverlay();
    };

    const handleFolderEdit = (updatedFolderId, newTitle) => {
        setFolders(folders.map((folder) =>
            folder.id === updatedFolderId ? { ...folder, name: newTitle } : folder
        ));
    };

    const handleFolderDelete = (deletedFolderId) => {
        setFolders(folders.filter((folder) => folder.id !== deletedFolderId));
    };

    useEffect(() => {
        const fetchDecks = async () => {
            try {
            const lastUsedDecks = await DeckService.getLastUsed();
            const folderStructure = await FolderService.getFolderStructure();
            const notificationsSet = await NotificationService.getAllNotifications();
            setLatestDecks(lastUsedDecks);
            setFolders(folderStructure);
            setNotifications(notificationsSet);
            } catch (error) {
                console.error("Error fetching last used decks:", error);
                setLatestDecks(null);
                setNotifications(null);
                setFolders(null);
            }
        }
        fetchDecks();
        fetchFolders();
        fetchNotifications();
    }, [])

    return <div>

    <Navbar/>

    <div className="home">

        <div className="home-latest-reviews">

            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                {formType === 'edit' &&
                    <EditFolder id={selectedId} title={selectedTitle} closeOverlay={closeOverlay} onFolderEdit={handleFolderEdit}/>
                }
                {formType === 'delete' &&
                    <DeleteFolder id={selectedId} title={selectedTitle} closeOverlay={closeOverlay} onFolderDelete={handleFolderDelete}/>
                }
            </Overlay>

            <div className="latest-reviews-title">My Latest Reviews</div>
            <div className="latest-reviews-decks">
                {Array.isArray(latestDecks) && latestDecks.length > 0 ? (
                    latestDecks.map((deck) => (
                        <div key={deck.id} className="latest-review-deck">
                            <div className="deck-title">{deck.name}</div>
                            <CircularProgressbar
                                className="react-circular-progressbar"
                                value={deck.progress}
                                text={`${deck.progress}%`}
                            />
                            <button
                                className="continue-button"
                                onClick={() => navigate(`/study/${deck.id}`)}
                            >
                                Continue
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No last decks recorded</div>
                )}
            </div>

        </div>

        <div className="home-latest-reviews">

            <div className="home-user-notifications-container">

                <div className="home-notifications-title">Notifications</div>
                {Array.isArray(notifications) && notifications.length > 0 ? notifications.map((notif) => (
                    <div key={notif.id} className="home-user-notifcation">
                        <div className="home-user-notifcation-header">
                            <div className="home-user-notifcation-title">New Notification</div>
                        </div>
                        <div className="home-user-notifcation-text">
                            {notif.text}
                        </div>

                    </div>
                )) :
                    <div className="home-user-notifcation">
                        <div className="home-user-notifcation-header">
                            <div className="home-user-notifcation-title">No notifications</div>
                        </div>
                        <div className="home-user-notifcation-text">
                        </div>

                    </div>
                }
            </div>

        </div>

        <div className="home-my-decks">

            <div className="latest-reviews-title">Root Folder Children</div>
            <div className="my-decks-container">
            {
            Array.isArray(folders) && folders.length > 0 ? folders
                .map((folder) => {
                    return <Folder key={folder.id} id={folder.id} title={folder.name}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                    />
            })
            :
            <div>No folders available</div>
            }
            </div>

        </div>
    </div>

    </div>
}

export default Home;