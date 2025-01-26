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
import FriendshipService from "../../../services/FriendshipService";


const Home = () => {

    const [latestDecks, setLatestDecks] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [receivedFriendships, setReceivedFriendships] = useState([]);
    const [folders, setFolders] = useState([]);

    const [formType, setFormType] = useState(null);

    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [selectedFolderTitle, setSelectedFolderTitle] = useState(null);

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();

    const navigate = useNavigate();

    const handleEditClick = (id, title) => {
        console.log("Edit clicked for folder:", id, title);
        setSelectedFolderId(id);
        setSelectedFolderTitle(title);
        setFormType('edit-folder');
        toggleOverlay();
    };

    const handleDeleteClick = (id, title) => {
        console.log("Delete clicked for folder:", id, title);
        setSelectedFolderId(id);
        setSelectedFolderTitle(title);
        setFormType('delete-folder');
        toggleOverlay();
    };

    const handleFolderEdit = async (selectedFolderId, selectedFolderTitle) => {
        try {
            if (selectedFolderId !== null) {
                console.log("Editing folder with id: ", selectedFolderId);
                const response = await FolderService.updateFolder(selectedFolderId, selectedFolderTitle);
                setFolders(folders.map((child) =>
                    child.id === selectedFolderId ? { ...child, name: selectedFolderTitle } : child
                ));
                alert("Folder edited successfully.");
            }
        } catch (error) {
            console.error("Error while editing folder: ", error);
            alert("Error occurred while editing folder.");
        } finally {
            closeOverlay();
            setFormType("");
            setSelectedFolderId(null)
        }
    };

    const handleFolderDelete = async (selectedFolderId) => {
        try {
            if (selectedFolderId !== null) {
                console.log("Deleting folder with id: ", selectedFolderId);
                const response = await FolderService.deleteFolder(selectedFolderId);
                setFolders(folders.filter((child) => child.id !== selectedFolderId));
                alert("Folder deleted successfully.");
            }
        } catch (error) {
            console.error("Error while deleting folder: ", error);
            alert("Error occurred while deleting folder.");
        } finally {
            closeOverlay();
            setFormType("");
            setSelectedFolderId(null)
        }
    };

    const handleFriendshipAccept = (id) => {
        console.log("Accepting friendship offer with id: ", id);
        try {
            const response = FriendshipService.acceptFriendshipOfferById(id);
            console.log("Friendship accepted:", response);
            setReceivedFriendships(receivedFriendships.filter((friendship) => friendship.id !== id));

        } catch (error) {
            console.error("Error while accepting friendship offer: ", error);
            alert("Error while accepting friendship offer: ", error);
        }
    }

    const handleFriendshipDecline = (id) => {
        console.log("Declining friendship offer with id: ", id);
        try {
            const response = FriendshipService.deleteFriendship(id);
            console.log("deleted friendship: ", response);
            setReceivedFriendships(receivedFriendships.filter((friendship) => friendship.id !== id));
        }catch (error) {
            console.error("Error while declining friendship offer: ", error);
            alert("Error while declining friendship offer: ", error);
        }
    }

    const handleNotificationDelete = (id) => {
        console.log("Deleting notification with id: ", id);
        try {
            const response = NotificationService.deleteNotification(id);
            console.log("deleted notification: ", response);
            setNotifications(notifications.filter((notif) => notif.id !== id));
        }catch (error) {
            console.error("Error while deleting notification offer: ", error);
            alert("Error while deleting notification offer: ", error);
        }
    }

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const lastUsedDecks = await DeckService.getLastUsed();
                console.log("Latest decks fetched: ", lastUsedDecks);
                setLatestDecks(lastUsedDecks || []);
            } catch (error) {
                console.error("Error fetching last used decks:", error);
                setLatestDecks(null);
            }
        }
        const fetchFolders = async () => {
            try {
                const folderStructure = await FolderService.getRootFolder();
                setFolders(folderStructure.children || []);
            } catch (error) {
                console.error("Error while fetching folders: ", error);
                setFolders(null);
            }
        }

        const fetchNotifications = async () => {
            try {
                const notificationsSet = await NotificationService.getAllNotifications();
                console.log("Received notifications: ", notifications);
                setNotifications(notificationsSet || []);
            } catch (error) {
                console.error("Error while fetching notifications: ", error);
                setNotifications(null);
            }
        }

        const fetchReveivedFriendships = async () => {
            try {
                const friendships = await FriendshipService.getReceivedFriendships();
                console.log("Received friendships: ", friendships);
                setReceivedFriendships(friendships || []);
            } catch (error) {
                console.error("Error while fetching received friendships: ", error);
                setReceivedFriendships(null);
            }
        }

        fetchDecks();
        fetchFolders();
        fetchNotifications();
        fetchReveivedFriendships();
    }, [])

    return <div>

    <Navbar/>

    <div className="home">

        <div className="home-latest-reviews">

            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                {formType === 'edit-folder' &&
                    <EditFolder id={selectedFolderId} title={selectedFolderTitle} closeOverlay={closeOverlay} onFolderEdit={handleFolderEdit}/>
                }
                {formType === 'delete-folder' &&
                    <DeleteFolder id={selectedFolderId} title={selectedFolderTitle} closeOverlay={closeOverlay} onFolderDelete={handleFolderDelete}/>
                }
            </Overlay>

            <div className="latest-reviews-title">My Latest Reviews</div>
                {Array.isArray(latestDecks) && latestDecks.length > 0 ? (
                    latestDecks.map((deck) => (
                    <div className="latest-reviews-decks">
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
                    </div>
                    ))
                ) : (

                <div className="home-user-notifications-container">
                    <div className="home-user-notifcation">
                        <div className="home-user-notifcation-header">
                            <div className="home-user-notifcation-title">No last decks recorded</div>
                        </div>
                        <div className="home-user-notifcation-text">
                        </div>

                    </div>
                </div>
                )}

        </div>

        <div className="home-latest-reviews">

            <div className="home-user-notifications-container">

                <div className="home-notifications-title">Notifications</div>
                {Array.isArray(receivedFriendships) && receivedFriendships.length > 0 && receivedFriendships.map((friendship) => (
                    <div key={friendship.id} className="home-user-notifcation">
                        <div className="home-user-notifcation-header">
                            <div className="home-user-notifcation-title">New Friendship Offer</div>
                        </div>
                        <div className="home-user-notifcation-text">
                            User with id {friendship.id} sent you a message
                        </div>
                        <button onClick={() => handleFriendshipAccept(friendship.id)} className="btn">
                            Accept
                        </button>
                        <button onClick={() => handleFriendshipDecline(friendship.id)} className="btn">
                            Decline
                        </button>

                    </div>
                ))}
                {Array.isArray(notifications) && notifications.length > 0 ? notifications.map((notif) => (
                    <div key={notif.id} className="home-user-notifcation">
                        <div className="home-user-notifcation-header">
                            <div className="home-user-notifcation-title">New Notification</div>
                        </div>
                        <div className="home-user-notifcation-text">
                            {notif.text}
                        </div>
                        <button onClick={() => handleNotificationDelete(notif.id)} className="btn">
                            Delete
                        </button>

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
            <div className="home-user-notifcation">
                <div className="home-user-notifcation-header">
                    <div className="home-user-notifcation-title">No root folder children recorded</div>
                </div>
                <div className="home-user-notifcation-text">
                </div>

            </div>
            }
            </div>

        </div>
    </div>

    </div>
}

export default Home;