import React, { useState } from "react";
import FolderService from "../../services/FolderService";

export const EditFolder = ( { id, title, closeOverlay } ) => {
    const [newFolderName, setNewFolderName] = useState(title);

    const handleSave = async () => {
        if (newFolderName.length < 3 || newFolderName.length > 20) {
            alert("Folder name must be between 3 and 20 characters!");
            return;
        }

        try {
            const response = await FolderService.updateFolder(id, newFolderName);
            alert("Successfully updated folder");
        } catch (error) {
            console.log("Error while editing folders", error);
            alert("Error occured when updating folder");
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

export const DeleteFolder = ( { id, title, closeOverlay } ) => {

    const handleDelete = async () => {
        try {
            const response = await FolderService.deleteFolder(id);
            alert("Successfully updated folder");
        } catch (error) {
            console.log("Error while deleting folder", error);
            alert("Error occured while deleting folder");
        } finally {
            closeOverlay();
        }
    };

    const handleCancel = () => {
        closeOverlay();
    };

    return (
        <div className="edit-folder-popup-edit">
            <h3>Delete Folder</h3>
            <div>Do you really want to delete folder "{title}" along with all its contents?</div>
            <button type="button" onClick={handleDelete}>Yes</button>
            <button type="button" onClick={handleCancel}>No</button>
        </div>
    );
}
