import React, { useState } from "react";
import FolderService from "../../services/FolderService";

export const EditFolder = ( { id, title, closeOverlay } ) => {
    const [newFolderName, setNewFolderName] = useState(title);

    const handleSave = () => {
        if (newFolderName.length < 3 || newFolderName.length > 20) {
            alert("Folder name must be between 3 and 20 characters!");
            return;
        }

        try {
            const response = FolderService.updateFolder(id, newFolderName);
        } catch (error) {
            console.log("Error while editing folders", error);
        } finally {
            closeOverlay();
        }
    }

    return <div className="edit-folder-popup-edit">
        <h3>Edit Folder</h3>
        <input
            type="text"
            placeholder="Folder name..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            required
        />
        <button type="button" onClick={handleSave}>Save</button>
    </div>
}

export const DeleteFolder = ( { id, title } ) => {

    const handleDelete = () => {
        try {
            const response = FolderService.deleteFolder(id);
        } catch (error) {
            console.log("Error while deleting folder", error);
        } finally {
            closeOverlay();
        }
    };

    const handleCancel = () => {
        closeOverlay(); // Zamknięcie overlay po anulowaniu
    };

    return (
        <div className="edit-folder-popup-edit">
            <h3>Delete Folder</h3>
            <div>Do you really want to delete folder "{title}" along with all its contents?</div>
            <button type="button" onClick={handleCancel}>No</button>
            <button type="button" onClick={handleDelete}>Yes</button>
        </div>
    );
}

export default EditFolder;