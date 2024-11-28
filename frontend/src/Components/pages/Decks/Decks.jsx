import React from "react";

import Navbar from "../../Navbar/Navbar";

import './Decks';

const Decks = (props) => {
    return <div className="decks">
        <Navbar details={props.details}/>
        <div>Decks</div>
    </div>
}

export default Decks;

