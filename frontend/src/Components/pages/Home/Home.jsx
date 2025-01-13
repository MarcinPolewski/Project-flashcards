import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import Navbar from "../../Navbar/Navbar";

import sortDecksByDate from "../../../utils/sortDecksByDate";

import './Home.css';
import 'react-circular-progressbar/dist/styles.css';

import testDecks from "../../../assets/mockData/testDecks";
import Folder from "../../Folder/Folder";
import Notification from "../../Notification/Notification";
import testFolders from "../../../assets/mockData/testFolders";
import { useNavigate } from "react-router-dom";
import DeckService from "../../../services/DeckService";
import FolderService from "../../../services/FolderService";
import NotificationService from "../../../services/NotificationService";


const Home = (props) => {

    const [latestDecks, setLatestDecks] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [folders, setFolders] = useState([]);

    const navigate = useNavigate();

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
    }, [])

    return <div>

    <Navbar/>

    <div className="home">

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">My Latest Reviews</div>
            <div className="latest-reviews-decks">
                {latestDecks
                    .map((deck) => (
                    <div key={deck.id} className="latest-review-deck">
                        <div className="deck-title">{deck.name}</div>
                        <CircularProgressbar className="react-circular-progressbar" value={deck.progress} text={`${deck.progress}%`} />
                        <button className="continue-button" onClick={() => navigate(`/study/${deck.id}`)}>Continue</button>
                    </div>
                ))}
            </div>

        </div>

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">Notifications</div>
            <div className="latest-reviews-decks">
                {
                    notifications.map(notif => (
                        <div className="home-notification">
                            <Notification key={notif.id} data={{
                                text: notif.text,
                                receivedDate: notif.receivedDate
                            }} />
                        </div>
                    ))
                }
            </div>

        </div>

        <div className="home-my-decks">

            <div className="latest-reviews-title">Deck Folders</div>
            <div className="my-decks-container">
            {
            folders
                .map((folder) => {
                    const { folderId, folderName } = folder;
                    return <Folder key={folderId} id={folderId} title={folderName}/>
            })}
            </div>

        </div>
    </div>

    </div>
}

export default Home;