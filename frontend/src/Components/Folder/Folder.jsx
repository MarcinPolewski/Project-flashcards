import React from "react";

import './Folder.css';
import { useNavigate } from "react-router-dom";

const Folder = ( { id, title } ) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/folder/${id}`)
    }

    return <div className="folder" onClick={handleClick}>
        <div className="card-title">{title}</div>
    </div>
}

export default Folder;