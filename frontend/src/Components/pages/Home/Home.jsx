import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";

import sortDecksByDate from "../../../utils/sortDecksByDate";

import './Home.css';
import 'react-circular-progressbar/dist/styles.css';

import testDecks from "../../../assets/test/testDecks";


const Home = (props) => {
    return <div>

    <Navbar details={props.details}/>

    <div className="home">

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">My Latest Reviews</div>
            <div className="latest-reviews-decks">
                {sortDecksByDate(testDecks)
                    .slice(0, 3)
                    .map((deck, idx) => (
                    <div key={idx} className="latest-review-deck">
                        <div className="deck-title">{deck.title}</div>
                        <CircularProgressbar className="react-circular-progressbar" value={deck.progress} text={`${deck.progress}%`} />
                        <button className="continue-button">Continue</button>
                    </div>
                ))}
            </div>

        </div>

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">Notifications</div>
            <div className="latest-reviews-decks">
                <div>Hello</div>
            </div>

        </div>

        <div className="home-my-decks">

            <div className="latest-reviews-title">Deck Folders</div>
            <div className="my-decks-container">
            {
            testDecks
                .slice(0, 5)
                .map((deck, idx) => (
                    <Deck key={idx} deckState={deck}/>
            ))}
            </div>

        </div>
    </div>

    </div>
}

export default Home;