import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import './Share.css';
import testDecks from "../../../assets/mockData/testDecks";

const Share = (props) => {
    const [selectedExportDeck, setSelectedExportDeck] = useState("");
    const [selectedImportDeck, setSelectedImportDeck] = useState("");
    const [importFile, setImportFile] = useState(null);

    const handleExport = () => {
        if (!selectedExportDeck) {
            alert("Please select a deck to export.");
            return;
        }
        alert(`Exporting deck: ${selectedExportDeck}`);
    };

    const handleImport = () => {
        if (!selectedImportDeck || !importFile) {
            alert("Please select a deck and a file to import.");
            return;
        }
        alert(`Importing into deck: ${selectedImportDeck}`);
    };

    const handleFileChange = (event) => {
        setImportFile(event.target.files[0]);
    };

    return (
        <div className="main-importcontainer">
        <Navbar details={props.details} />
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
                        {testDecks.map((deck, index) => (
                            <option key={index} value={deck.title}>
                                {deck.title}
                            </option>
                        ))}
                    </select>
                    <button className="btn" onClick={handleExport}>
                        Export
                    </button>
                </div>
            </div>

            {/* Import Section */}
            <div className="section">
                <h3>Import into Deck</h3>
                <div className="field-container">
                    <select
                        className="dropdown"
                        value={selectedImportDeck}
                        onChange={(e) => setSelectedImportDeck(e.target.value)}
                    >
                        <option value="">Select a deck to import into</option>
                        {testDecks.map((deck, index) => (
                            <option key={index} value={deck.title}>
                                {deck.title}
                            </option>
                        ))}
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
