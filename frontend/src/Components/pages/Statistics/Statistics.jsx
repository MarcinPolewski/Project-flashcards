import React from "react";
import Navbar from "../../Navbar/Navbar";
import PieChart from "../../Charts/PieChart/PieChart";
import StreakChart from "../../Charts/StreakChart/StreakChart";
import './Statistics.css';

const calcPercentage = (part, total) => {
    return ((part / total) * 100).toFixed(2);
};

const StatisticsSection = ({ title, children, className }) => {
    return (
        <div className={`statistics-section-container ${className}`}>
            <h2 className="statistics-section-title">{title}</h2>
            <div className="statistics-section">{children}</div>
        </div>
    );
};

const Statistics = (props) => {
    const { daysLearning, longestStreak, currentStreak } = props.details;
    const pieChartData = { newCards: 57, learningCards: 120, rememberedCards: 217 };
    const totalCards = pieChartData.newCards + pieChartData.learningCards + pieChartData.rememberedCards;

    return (
        <div className="statistics">
            <Navbar details={props.details} />
            <div className="statistics-container">
                <div className="statistics-title">Statistics</div>

                <div className="statistics-grid">
                    {/* Streak Chart and Streak Statistics */}
                    <StatisticsSection title="Streak" className="streak-box">
                        <div className="streak-container">
                            <StreakChart className="streak-section-streak-chart" />
                        </div>
                    </StatisticsSection>

                    <StatisticsSection className="streak-statistics-box">
                        <div className="streak-statistics">
                            <div className="streak-item">
                                <h3>Days Learning</h3>
                                <div>{daysLearning} days</div>
                            </div>
                            <div className="streak-item">
                                <h3>Longest Streak</h3>
                                <div>{longestStreak} days</div>
                            </div>
                            <div className="streak-item">
                                <h3>Current Streak</h3>
                                <div>{currentStreak} days</div>
                            </div>
                        </div>
                    </StatisticsSection>

                    {/* Pie Chart and Card Numbers */}
                    <StatisticsSection className="pie-chart-box">
                        <div className="pie-chart-container">
                            <PieChart className="card-number-pie-chart" data={pieChartData} />
                        </div>
                    </StatisticsSection>

                    <StatisticsSection title="Card Numbers" className="card-number-box">
                        <div className="card-number-statistics">
                            <div className="card-detail">
                                <span>New </span>
                                <span>{pieChartData.newCards} - {calcPercentage(pieChartData.newCards, totalCards)}%</span>
                            </div>
                            <div className="card-detail">
                                <span>Learning</span>
                                <span>{pieChartData.learningCards} - {calcPercentage(pieChartData.learningCards, totalCards)}%</span>
                            </div>
                            <div className="card-detail">
                                <span>Learnt</span>
                                <span>{pieChartData.rememberedCards} - {calcPercentage(pieChartData.rememberedCards, totalCards)}%</span>
                            </div>
                        </div>
                    </StatisticsSection>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
