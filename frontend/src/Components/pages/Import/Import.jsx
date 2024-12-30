import React from "react";

import Navbar from "../../Navbar/Navbar";

import './Import.css';

const Import = (props) => {
    return <div className="import">
        <Navbar details={props.details}/>
        <div>Import</div>
    </div>
}

export default Import;