import React from "react";

import Navbar from "../../Navbar/Navbar";

import './CreateFlashcard.css';

const CreateFlashcard = (props) => {

    return <div className="create-flashcard">
        <Navbar details={props.details}/>
        <div>Create flashcard</div>
    </div>
}

export default CreateFlashcard;