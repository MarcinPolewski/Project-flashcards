import React from "react";
import './StreakChart.css';

const generateSampleData = () => {
    const MONTHS = 12;
    const DAYS = 7;

    const data = Array(MONTHS * DAYS).fill(false).map(() => {
        Math.random() > 0.7
    });

    return data;
}

const StreakChart = () => {
    return <div className="streak-chart"></div>
}

export default StreakChart;