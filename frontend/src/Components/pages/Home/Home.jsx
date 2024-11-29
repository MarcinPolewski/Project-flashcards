import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";

import './Home.css';

import testDecks from "../../../assets/test/testDecks";

const Home = (props) => {

    const [myDecksClicked, setMyDecksClicked] = useState(true);

    return <div className="home">

        <Navbar details={props.details}/>

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">My Latest Reviews</div>
            <div className="latest-reviews-decks">
                {
                /* TODO sortujemy je po dacie i bierzemy pierwsze trzy */

                testDecks.slice(0, 3).map((deck, idx) => {
                    <div key={idx} className="latest-review-deck">
                        <div className="deck-title">{deck.title}</div>
                        <CircularProgressbar value={deck.progress} text={`${deck.progress}%`} />
                        <button className="continue-button">Continue</button>
                    </div>
                })

                }
            </div>

        </div>

        <div className="home-my-decks">

            <div className="my-decks-buttons">
                <div className={myDecksClicked ? "active-tab" : ""} onClick={() => {
                    setMyDecksClicked(true);
                }}>
                    My Decks
                </div>
                <div className={!myDecksClicked ? "active-tab" : ""} onClick={() => {
                    setMyDecksClicked(false);
                }}>
                    Imported Decks
                </div>
            </div>

            {/* będzie w bazie danych flaga od decków personalnych i importowanych */}

            <div className="my-decks-container">
            {
            testDecks
                .filter(deck => myDecksClicked ? deck.imported === false : deck.imported === true)
                .map((deck, idx) => (
                    <Deck key={idx} deckState={deck}/>
            ))}
            </div>

        </div>
    </div>
}

export default Home;