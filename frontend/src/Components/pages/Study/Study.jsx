import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { useParams } from 'react-router-dom';
import './Study.css';


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
