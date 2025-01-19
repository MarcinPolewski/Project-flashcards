import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import './Share.css';
import DeckService from "../../../services/DeckService";
import ShareService from "../../../services/ShareService";
import FolderService from "../../../services/FolderService";
import filterRootFolder from "../../../utils/filterRootFolder";

const Share = () => {
    const [selectedExportDeck, setSelectedExportDeck] = useState("");
    const [selectedImportFolder, setSelectedImportFolder] = useState("");
    const [importFile, setImportFile] = useState(null);
    const [decksToChoose, setDecksToChoose] = useState([]);
    const [foldersToChoose, setFoldersToChoose] = useState([]);

    const handlePdfExport = async () => {
        if (!selectedExportDeck) {
            alert("Please select a deck to export.");
            return;
        }
        alert(`Exporting deck: ${selectedExportDeck} as pdf`);

        try {
            const pdfBlob = await ShareService.generatePdf(selectedExportDeck);
            const blobUrl = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${selectedExportDeck}-deck.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error while generating PDF: ", error);
            alert("Error while generating PDF. Please try again.");
        }
    };

    const handleTxtExport = async () => {
        if (!selectedExportDeck) {
            alert("Please select a deck to export.");
            return;
        }
        alert(`Exporting deck: ${selectedExportDeck} as txt`);

        try {
            const txtBlob = await ShareService.generateTxt(selectedExportDeck);
            const blobUrl = window.URL.createObjectURL(
                new Blob([txtBlob], { type: "text/plain" })
            );

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${selectedExportDeck}-deck.txt`;
            link.click();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error while generating PDF: ", error);
            alert("Error while generating TXT. Please try again.");
        }
    };

    const handleImport = async () => {
        if (!selectedImportFolder || !importFile) {
            alert("Please select a folder and a file to import.");
            return;
        }
        alert(`Importing into folder: ${selectedImportFolder}`);

        try {
            await ShareService.loadDeck(importFile, selectedImportFolder);
            alert("Deck imported successfully!");
        } catch (error) {
            console.error("Error while generating PDF: ", error);
        }
    };

    const handleFileChange = (event) => {
        setImportFile(event.target.files[0]);
    };

    useEffect(() => {
        const fetchDecksToChoose = async () => {
            try {
                const fetchedDecks = await DeckService.getAllDecks();
                setDecksToChoose(fetchedDecks || []);
                setSelectedExportDeck(fetchedDecks[0]?.id);
            } catch (error) {
                console.log("Error while fetching decks: ", error);
            }
        };

        const fetchFoldersToChoose = async () => {
            try {
                const fetchedDecks = await FolderService.getAllFolders();
                const foldersWithoutRoot = filterRootFolder(fetchedDecks);
                setFoldersToChoose(foldersWithoutRoot || []);
                setSelectedImportFolder(foldersWithoutRoot[0]?.id);
            } catch (error) {
                console.log("Error while fetching folders: ", error);
            }
        };

        fetchDecksToChoose();
        fetchFoldersToChoose();
    }, []);

    return (
        <div className="main-importcontainer">
        <Navbar />
        <div className="import">
            {/* Export Section */}
            <div className="section">
                <h3>Export Deck</h3>
                <div className="field-container">
                    <select
                        className="dropdown"
                        value={selectedExportDeck}
                        onChange={(e) => setSelectedExportDeck(e.target.value)}
                    >
                        <option value="">Select a deck to export</option>
                        {Array.isArray(decksToChoose) ? (
                            decksToChoose.map((deck, index) => (
                                <option key={index} value={deck.id}>
                                    {deck.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No decks available</option>
                        )}
                    </select>
                    <button className="btn" onClick={handlePdfExport}>
                        Export as PDF
                    </button>
                    <button className="btn" onClick={handleTxtExport}>
                        Export as TXT
                    </button>
                </div>
            </div>

            {/* Import Section */}
            <div className="section">
                <h3>Import into Folder</h3>
                <div className="field-container">
                    <select
                        className="dropdown"
                        value={selectedImportFolder}
                        onChange={(e) => setSelectedImportFolder(e.target.value)}
                    >
                        <option value="">Select a folder to import into</option>
                        {Array.isArray(decksToChoose) ? (
                            foldersToChoose.map((folder, index) => (
                                <option key={index} value={folder.id}>
                                    {folder.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No folder available</option>
                        )}
                    </select>
                    <input
                        type="file"
                        className="file-input"
                        onChange={handleFileChange}
                    />
                    <button className="btn" onClick={handleImport}>
                        Import
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Share;
