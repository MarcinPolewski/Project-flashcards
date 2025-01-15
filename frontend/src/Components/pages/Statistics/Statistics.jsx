import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import PieChart from "../../Charts/PieChart/PieChart";
import StreakChart from "../../Charts/StreakChart/StreakChart";
import './Statistics.css';
import UserStatisticsService from "../../../services/UserStatisticsService";

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

const Statistics = () => {

    const [statisticData, setStatisticData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            //     daysLearning: 15,
            //     longestStreak: 15,
            //     currentStreak: 15,
            //     allNewCards: 57,
            //     allLearningCards: 120,
            //     allRememberedCards: 217,
            //     loginDates: [
            //         '10-12-2024', '11-12-2024', '14-12-2024'
            //     ]
            // }
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

    const pieChartData = {
        newCards: statisticData.allNewCards || 0,
        learningCards: statisticData.allLearningCards || 0,
        rememberedCards: statisticData.allRememberedCards || 0,
    };

    const totalCards = pieChartData.newCards + pieChartData.learningCards + pieChartData.rememberedCards;

    if (!statisticData) {
        return  <div className="statistics">
            <Navbar/>
            <div>Loading... </div>
        </div>;
    }

    return <div className="statistics">
        <Navbar/>
        <div className="statistics-container">

            <div className="statistics-title">Statistics</div>

            <StatisticsSection className="streak-section" title="Streak">
                <StreakChart className="streak-section-streak-chart" loginDates={Array.isArray(statisticData.loginDates) ? statisticData.loginDates : []}/>

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

                    {/* Pie Chart and Card Numbers */}
                    <StatisticsSection className="pie-chart-box">
                        <div className="pie-chart-container">
                        <PieChart className="card-number-pie-chart" data={{
                            newCards: statisticData.allNewCards,
                            learningCards: statisticData.allLearningCards,
                            rememberedCards: statisticData.allRememberedCards,
                        }} />
                        </div>
                    </StatisticsSection>

                    <StatisticsSection title="Card Numbers" className="card-number-box">
                        <div className="card-number-statistics">
                            <div className="card-detail">
                                <span>New </span>
                                <span>{pieChartData.newCards} - {calcPercentage(statisticData.allNewCards, totalCards)}%</span>
                            </div>
                            <div className="card-detail">
                                <span>Learning</span>
                                <span>{pieChartData.learningCards} - {calcPercentage(statisticData.allLearningCards, totalCards)}%</span>
                            </div>
                            <div className="card-detail">
                                <span>Learnt</span>
                                <span>{pieChartData.rememberedCards} - {calcPercentage(statisticData.allRememberedCards, totalCards)}%</span>
                            </div>
                        </div>
                    </StatisticsSection>

                </StatisticsSection>
            </div>
        </div>
};

export default Statistics;
