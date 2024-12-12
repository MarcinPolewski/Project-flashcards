import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import './CreateFlashcard.css';

const CreateFlashcard = (props) => {
    const navigate = useNavigate();
    
    return (
        <div className = "create-flashcard">
            <Navbar details = {props.details} />
    
            <div className = "flashcard-container">
    
                <h2> Create Flashcard </h2>

                <div className = "inputs-container">
                    <div className = "input-group">
                        <label htmlFor = "deck"> Choose Deck </label>
                        <select id = "deck" className = "dropdown">
                            <option value = "deck1"> Owoce </option>
                            <option value = "deck2"> Japoński N3 </option>
                            <option value = "deck3"> Francuski A1 </option>
                        </select>
                    </div>
    
                    <div className = "flashcard-inputs">
                        <textarea placeholder = "Front" className = "textarea"></textarea>
                        <textarea placeholder = "Back" className = "textarea"></textarea>
                    </div>
                </div>

                <div className = "button-group">
                    <button className = "cancel-button" onClick={() => navigate("/")}> Cancel </button>
                    <button className = "add-button"> Add </button>
                </div>
    
            </div>
        </div>
    );
}

export default CreateFlashcard;