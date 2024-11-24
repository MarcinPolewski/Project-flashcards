import React from "react";

import PlusButton from "./PlusButton/PlusButton";

const Navbar = () => {
    return <div className="navbar">

        <div className="navbar-logo">Logo</div>

        <div className="navbar-item">Browse</div>

        <div className="navbar-item">Decks</div>

        <div className="navbar-item">Import</div>

        <div className="navbar-item">Statistics</div>

        <PlusButton/>

    </div>
}

export default Navbar;