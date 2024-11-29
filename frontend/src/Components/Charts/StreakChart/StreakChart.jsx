import React from "react";
import './StreakChart.css';

const leapYear = (year) =>
(
  ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
);

const generateSampleData = () => {
    const DAYS = !leapYear(new Date().getFullYear()) ? 365 :364;

    /* initialize with "user-was-active" booleans */
    const data = Array(DAYS).fill(false).map(() => 
        Math.random() > 0.7
    );

    return data;
}

const StreakChart = () => {

    const streakData = generateSampleData();

    return <div className="streak-chart">
        {streakData.map((active, idx) => 
            <div key={idx}
            className={`streak-cell ${active ? "active" : ""}`}
            />
        )}
    </div>
}

export default StreakChart;