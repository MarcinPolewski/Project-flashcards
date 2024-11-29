import React from "react";
import './StreakChart.css';

const generateSampleData = () => {
    const MONTHS = 12;
    const DAYS = 7;

    /* initialize with "user-was-active" booleans */
    const data = Array(MONTHS * DAYS).fill(false).map(() => 
        Math.random() > 0.7
    );

    return data;
}

const StreakChart = () => {

    const streakData = generateSampleData();

    return <div className="streak-chart">
        {streakData.map((active, idx) => {
            <div key={idx}
            className={`streak-cell ${active ? "active" : ""}`}
            />
        })}
    </div>
}

export default StreakChart;