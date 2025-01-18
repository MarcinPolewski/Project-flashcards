import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import './Share.css';
import DeckService from "../../../services/DeckService";
import PdfGeneratorService from "../../../services/PdfGeneratorService";

const Share = () => {
    const [selectedExportDeck, setSelectedExportDeck] = useState("");
    const [selectedImportDeck, setSelectedImportDeck] = useState("");
    const [importFile, setImportFile] = useState(null);
    const [decksToChoose, setDecksToChoose] = useState([]);

    const handleExport = async () => {
        if (!selectedExportDeck) {
            alert("Please select a deck to export.");
            return;
        }
        alert(`Exporting deck: ${selectedExportDeck}`);

        try {
            const response = await PdfGeneratorService.generatePdf();
        } catch (error) {
            console.error("Error while generating PDF: ", error);
        }
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

    useEffect(() => {
        const fetchDecksToChoose = async () => {
            try {
                const fetchedDecks = await DeckService.getAllDecks();
                setDecksToChoose(fetchedDecks || []);
            } catch (error) {
                console.log("Error while fetching decks: ", error);
            }
        };

        fetchDecksToChoose();
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
                                <option key={index} value={deck.name}>
                                    {deck.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No decks available</option>
                        )}
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
                        {Array.isArray(decksToChoose) ? (
                            decksToChoose.map((deck, index) => (
                                <option key={index} value={deck.name}>
                                    {deck.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No decks available</option>
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
