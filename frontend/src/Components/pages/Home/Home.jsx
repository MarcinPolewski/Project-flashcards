import React, { useState } from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";

import './Home.css';

import testDecks from "../../../assets/test/testDecks";

const Home = (props) => {

    const [myDecksClicked, setMyDecksClicked] = useState(false);

    return <div className="home">

        <Navbar details={props.details}/>

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">My Latest Reviews</div>
            <div className="latest-reviews-decks">
                {testDecks.slice(0, 3).map((deck) => {
                    return <Deck deckState={deck}/>
                })}
            </div>

        </div>

        <div className="home-my-decks">

            <div className="my-decks-buttons">
                <div className="my-decks-button">My Decks</div>
                <div className="my-decks-button">Imported Decks</div>
            </div>

            {/* będzie w bazie danych flaga od decków personalnych i importowanych */}

            <div className="my-decks-container">
            {
            testDecks
                .filter(deck => myDecksClicked ? deck.imported === false : deck.imported === true)
                .map(deck => (
                    <Deck deckState={deck}/>
            ))}
            </div>

        </div>
    </div>
}

export default Home;