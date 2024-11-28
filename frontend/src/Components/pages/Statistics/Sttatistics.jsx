import React from "react";

import Navbar from "../../Navbar/Navbar";

import './Statistics.css';

const Statistics = (props) => {
    return <div className="statistics">
        <Navbar details={props.details}/>
        <div>Statistics</div>
    </div>
}

export default Statistics;