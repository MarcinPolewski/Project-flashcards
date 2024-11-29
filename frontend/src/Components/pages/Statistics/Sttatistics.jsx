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

    const {daysLearning, longestStreak, currentStreak} = props.details;

    return <div className="statistics">
        <Navbar details={props.details}/>
        <div className="statistics-container">
        
            <div className="statistics-title">Statistics</div>

            <StatisticsSection className="streak-section" title="Streak">
                <StreakChart/>

                <div className="streak-container">
                    <div className="streak-days-learning">
                        <h2>Days learning</h2>
                        <div>{daysLearning} days</div>
                    </div>
                    <div className="streak-longest-streak">
                        <h2>Longest streak</h2>
                        <div>{longestStreak} days</div>
                    </div>
                    <div className="streak-current-streak">
                        <h2>Current streak</h2>
                        <div>{currentStreak} days</div>
                    </div>
                </div>
            </StatisticsSection>

            <StatisticsSection title="Card number">
                <PieChart/>
            </StatisticsSection>

        </div>
    </div>
}

export default Statistics;