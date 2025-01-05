import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Import.css";
import testDecks from "../../../assets/test/testDecks";

const Import = (props) => {
  const [selectedExportDeck, setSelectedExportDeck] = useState(null);
  const [selectedImportDeck, setSelectedImportDeck] = useState(null);
  const [importFile, setImportFile] = useState(null);

  const handleExport = () => {
    if (!selectedExportDeck) {
      alert("Please select a deck to export.");
      return;
    }

    const deckToExport = testDecks.find(
      (deck) => deck.title === selectedExportDeck
    );

    if (deckToExport) {
      const deckData = JSON.stringify(deckToExport, null, 2);
      const blob = new Blob([deckData], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedExportDeck}.json`;
      link.click();
    }
  };

  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!selectedImportDeck || !importFile) {
      alert("Please select a deck to import into and choose a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        console.log(`Data imported into ${selectedImportDeck}:`, importedData);
        alert(`File successfully imported into ${selectedImportDeck}.`);
      } catch (error) {
        alert("Error parsing the imported file. Please make sure it's valid JSON.");
      }
    };

    reader.readAsText(importFile);
  };

  return (
    <div className="import">
      <Navbar details={props.details} />

      <div className="import-container">
        <h1>Deck Management</h1>

        {/* Export Section */}
        <div className="export-section">
          <h2>Export Deck</h2>
          <select
            value={selectedExportDeck || ""}
            onChange={(e) => setSelectedExportDeck(e.target.value)}
          >
            <option value="" disabled>
              Select a deck to export
            </option>
            {testDecks.map((deck, index) => (
              <option key={index} value={deck.title}>
                {deck.title}
              </option>
            ))}
          </select>
          <button onClick={handleExport}>Export</button>
        </div>

        {/* Import Section */}
        <div className="import-section">
          <h2>Import into Deck</h2>
          <select
            value={selectedImportDeck || ""}
            onChange={(e) => setSelectedImportDeck(e.target.value)}
          >
            <option value="" disabled>
              Select a deck to import into
            </option>
            {testDecks.map((deck, index) => (
              <option key={index} value={deck.title}>
                {deck.title}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept=".txt,.json"
            onChange={handleFileChange}
          />
          <button onClick={handleImport}>Import</button>
        </div>
      </div>
    </div>
  );
};

export default Import;
