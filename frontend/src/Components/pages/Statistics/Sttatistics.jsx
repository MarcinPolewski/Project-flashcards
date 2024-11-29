import React from "react";

import Navbar from "../../Navbar/Navbar";
import PieChart from "../../Charts/PieChart/PieChart";
import StreakChart from "../../Charts/StreakChart/StreakChart";

import './Statistics.css';

const StatisticsSection = ({title, children}) => {
    return <div>
        <h2 className="statistics-section-title">{title}</h2>
        <div className="statistics-section">
            <div className="statistics-section-content">{children}</div>
        </div>
    </div>
}

const Statistics = (props) => {
    return <div className="statistics">
        <Navbar details={props.details}/>
        <div className="statistics-container">
        
            <div className="statistics-title">Statistics</div>

            <StatisticsSection title="Streak">
                <StreakChart/>
            </StatisticsSection>

            <StatisticsSection title="Card number">
                <PieChart/>
            </StatisticsSection>

        </div>
    </div>
}

export default Statistics;