import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import PieChart from "../../Charts/PieChart/PieChart";
import StreakChart from "../../Charts/StreakChart/StreakChart";
import './Statistics.css';
import UserStatisticsService from "../../../services/UserStatisticsService";

const calcPercentage = (part, total) => {
    if (total === 0) return "0.00";
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

const Statistics = () => {

    const [statisticData, setStatisticData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserStatisticsService.getUserStatistics();
                console.log(response);
                setStatisticData(response);
            } catch (error) {
                console.error("Error fetching user statistics:", error);
            }
        }

        fetchData();
    }, []);

    if (!statisticData) {
        return (
            <div className="statistics">
                <Navbar />
                <div>Loading...</div>
            </div>
        );
    }

    const pieChartData = {
        newCards: statisticData.allNewCards || 0,
        learningCards: statisticData.allLearningCards || 0,
        rememberedCards: statisticData.allRememberedCards || 0,
    };

    const totalCards = pieChartData.newCards + pieChartData.learningCards + pieChartData.rememberedCards;

    return (
        <div className="statistics">
            <Navbar />
            <div className="statistics-container">
                <div className="statistics-title">Statistics</div>
                <div className="statistics-grid">
                    {/* Streak Box */}
                    <StatisticsSection title="Streak" className="streak-box">
                        <div className="streak-container">
                            <StreakChart
                                className="streak-section-streak-chart"
                                loginDates={Array.isArray(statisticData.loginDates) ? statisticData.loginDates : []}
                            />
                        </div>
                    </StatisticsSection>


                    {/* Streak Statistics */}
                    <StatisticsSection className="streak-statistics-box">
                        <div className="streak-statistics">
                            <div className="streak-item">
                                <h3>Days Learning</h3>
                                <div>{statisticData.daysLearning} days</div>
                            </div>
                            <div className="streak-item">
                                <h3>Longest Streak</h3>
                                <div>{statisticData.longestStreak} days</div>
                            </div>
                            <div className="streak-item">
                                <h3>Current Streak</h3>
                                <div>{statisticData.currentStreak} days</div>
                            </div>
                        </div>
                    </StatisticsSection>
                    {/* Pie Chart */}
                    <StatisticsSection className="pie-chart-box">
                        <div className="pie-chart-container">
                            <PieChart
                                className="card-number-pie-chart"
                                data={{
                                    newCards: statisticData.allNewCards,
                                    learningCards: statisticData.allLearningCards,
                                    rememberedCards: statisticData.allRememberedCards,
                                }}
                            />
                        </div>
                    </StatisticsSection>
                    {/* Card Numbers */}
                    <StatisticsSection title="Card Numbers" className="card-number-box">
                        <div className="card-number-statistics">
                            <div className="card-detail">
                                <span>New </span>
                                <span>
                                    {pieChartData.newCards === 0 ? 0 : pieChartData.newCards} - {calcPercentage(statisticData.allNewCards, totalCards)}%
                                </span>
                            </div>
                            <div className="card-detail">
                                <span>Learning</span>
                                <span>
                                    {pieChartData.learningCards === 0 ? 0 : pieChartData.learningCards} - {calcPercentage(statisticData.allLearningCards, totalCards)}%
                                </span>
                            </div>
                            <div className="card-detail">
                                <span>Learnt</span>
                                <span>
                                    {pieChartData.rememberedCards === 0 ? 0 : pieChartData.rememberedCards} - {calcPercentage(statisticData.allRememberedCards, totalCards)}%
                                </span>
                            </div>
                        </div>
                    </StatisticsSection>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
