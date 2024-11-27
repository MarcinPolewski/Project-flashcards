import React from "react";

import Navbar from "../../Navbar/Navbar";
import Deck from "../../Deck/Deck";

import './Home.css';

import testDecks from "../../../assets/test/testDecks";

const Home = (props) => {
    return <div className="home">
        <Navbar details={props.details}/>

        <div className="home-latest-reviews">

            <div className="latest-reviews-title">My Latest Reviews</div>

            {/* when data is fetched, it will be needed to map those using map() */}

            {testDecks.map((deck) => {
                return <Deck deckState={deck}/>
            })}


        </div>

        <div className="home-my-decks">

        </div>
    </div>
}

export default Home;