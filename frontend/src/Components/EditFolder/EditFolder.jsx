import React, { useState } from "react";

export const EditFolder = ( { id, title, closeOverlay, onFolderEdit } ) => {
    const [newFolderName, setNewFolderName] = useState(title);

    const handleSave = (id) => {
        if (newFolderName.length < 3 || newFolderName.length > 20) {
            alert("Folder name must be between 3 and 20 characters!");
            return;
        }

    console.log("Editing folder in EditFolder with id: ", id);
       onFolderEdit(id, newFolderName);
    }

    return <div className="plus-button-create-deck">
        <h3>Edit Folder</h3>
        <input
            type="text"
            placeholder="Folder name..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            required
        />
        <button type="button" onClick={() => handleSave(id)}>Save</button>
    </div>
}

export const DeleteFolder = ( { id, title, closeOverlay, onFolderDelete } ) => {

    const handleCancel = () => {
        closeOverlay();
    };

    return (
        <div className="edit-folder-popup-delete">
            <h3>Delete Folder</h3>
            <div>Do you really want to delete folder "{title}" along with all its contents?</div>
            <div className="edit-folder-reponses">
                <button type="button" onClick={() => onFolderDelete(id)}>Yes</button>
                <button type="button" onClick={handleCancel}>No</button>
            </div>
        </div>
    );
}
