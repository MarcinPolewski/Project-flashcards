import React from "react";
import './StreakChart.css';

// const leapYear = (year) =>
// (
//   ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
// );

const getPastYearDates = () => {
    const today = new Date();
    const pastYearDates = [];
    for (let i = 0; i < 364; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      pastYearDates.unshift(date.toISOString().split("T")[0]);
    }
    return pastYearDates;
  };

  const generateStreakData = (loginDates) => {
    const pastYearDates = getPastYearDates();
    const formattedLoginDates = loginDates.map(date => {
        const [day, month, year] = date.split("-");
        return `${year}-${month}-${day}`;
    });

    const data = pastYearDates.map(date => formattedLoginDates.includes(date));
    return data;
  };

  const StreakChart = ({ loginDates }) => {
    const streakData = generateStreakData(loginDates);
    const weeks = Array.from({ length: 52 }, (_, weekIndex) =>
        streakData.slice(weekIndex * 7, weekIndex * 7 + 7)
    );

    return (
        <div className="streak-chart">
            {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="streak-column">
                    {week.map((active, dayIdx) => (
                        <div
                            key={dayIdx}
                            className={`streak-cell ${active ? "active" : ""}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};


export default StreakChart;