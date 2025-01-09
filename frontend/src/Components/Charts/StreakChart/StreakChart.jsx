import React from "react";
import './StreakChart.css';

// const leapYear = (year) =>
// (
//   ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
// );

const getPastYearDates = () => {
    const today = new Date();
    const pastYearDates = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      pastYearDates.unshift(date.toISOString().split("T")[0]);
    }
    return pastYearDates;
  };
  
  const generateStreakData = (loginDates) => {
    const pastYearDates = getPastYearDates();
    const data = pastYearDates.map((date) => loginDates.includes(date));
    return data;
  };

const StreakChart = ({ loginDates }) => {
    const streakData = generateStreakData(loginDates);

    return <div className="streak-chart">
        {streakData.map((active, idx) =>
            <div key={idx}
            className={`streak-cell ${active ? "active" : ""}`}
            />
        )}
    </div>
}

export default StreakChart;