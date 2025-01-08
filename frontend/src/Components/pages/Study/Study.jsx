import React, { useState } from "react";
import { useParams } from 'react-router-dom';

import Navbar from "../../Navbar/Navbar";
import './Study.css';
import testDecks from "../../../assets/mockData/testDecks";
import testDecks from "../../../assets/mockData/mockDeck";


const Study = (props) => {
    const { deckId } = useParams();

    return (
    <div>
        <Navbar details={props.details}/>
        <h1>Study Page</h1>
        <p>You're studying deck ID: {deckId} </p>
    </div>
  );
};

export default Study;
