import React from "react";

import './Folder.css';
import { useNavigate } from "react-router-dom";

const Folder = ( { id, title } ) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/folder/${id}`)
    }

    return <div className="folder">
        <div className="card-title">{title}</div>


        <button className="folder-page-btn folder-page-study-btn" onClick={handleClick}>Open</button>
        <button className="folder-page-btn folder-page-edit-btn">Edit</button>
        <button className="folder-page-btn folder-page-delete-btn">Delete</button>
    </div>
}

export default Folder;