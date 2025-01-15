import React, { useState } from "react";
import './Folder.css';
import { useNavigate } from "react-router-dom";
import Overlay from "../Overlay/Overlay";
import { EditFolder, DeleteFolder } from "../EditFolder/EditFolder";
import { useOverlay } from "../../contexts/OverlayContext/OverlayContext";

const Folder = ({ id, title }) => {
    const navigate = useNavigate();

    const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlay();
    const [formType, setFormType] = useState("");

    const handleClick = () => {
        navigate(`/folder/${id}`);
    }

    const handleEditClick = () => {
        setFormType('edit');
        toggleOverlay();
    }

    const handleDeleteClick = () => {
        setFormType('delete');
        toggleOverlay();
    };

    return (
        <div className="folder">
            <div className="folder-header">
                <div className="folder-title">{title}</div>
            </div>

            <div className="folder-actions">
                <button className="folder-page-btn folder-page-study-btn" onClick={handleClick}>Open</button>
                <button className="folder-page-btn folder-page-edit-btn" onClick={handleEditClick}>Edit</button>
                <button className="folder-page-btn folder-page-delete-btn" onClick={handleDeleteClick}>Delete</button>
            </div>

            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay}>
                {formType === 'edit' &&
                    <EditFolder id={id} title={title} closeOverlay={closeOverlay}/>
                }
                {formType === 'delete' &&
                    <DeleteFolder id={id} title={title} closeOverlay={closeOverlay}/>
                }
            </Overlay>
        </div>
    );
}

export default Folder;
