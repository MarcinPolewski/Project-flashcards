import React, { useEffect } from "react";

import Navbar from "../../Navbar/Navbar";
import PieChart from "../../Charts/PieChart/PieChart";
import StreakChart from "../../Charts/StreakChart/StreakChart";

import './Statistics.css';
import UserStatisticsService from "../../../services/UserStatisticsService";

const calcPercentage = (part, total) => {
    return ((part / total) * 100).toFixed(2);
};

const StatisticsSection = ({title, children}) => {
    return <div>
        <h2 className="statistics-section-title">{title}</h2>
        <div className="statistics-section">
            <div className="statistics-section-content">{children}</div>
        </div>
    </div>
}

const Statistics = (props) => {

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
                const response = UserStatisticsService.getUserStatistics();
                setStatisticData(response);
            } catch (error) {
                console.error("Error fetching user statistics:", error);
            }
        }

        fetchData();
    }, []);

    const { daysLearning, longestStreak, currentStreak } = statisticData || {};

    const pieChartData = {
        newCards: statisticData?.allNewCards || 0,
        learningCards: statisticData?.allLearningCards || 0,
        rememberedCards: statisticData?.allRememberedCards || 0,
    };
    
    const totalCards = pieChartData.newCards + pieChartData.learningCards + pieChartData.rememberedCards;

    if (!statisticData) {
        return  <div className="statistics">
            <Navbar details={props.details}/>
            <div>Loading... </div>
        </div>;
    }

    return <div className="statistics">
        <Navbar details={props.details}/>
        <div className="statistics-container">

            <div className="statistics-title">Statistics</div>

            <StatisticsSection className="streak-section" title="Streak">
                <StreakChart className="streak-section-streak-chart" loginDates={loginDates}/>

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

            <StatisticsSection className="card-number-section" title="Card number">
                <div className="card-number-section-content">
                    <PieChart className="card-number-pie-chart" data={pieChartData} />
                    <div className="card-details">
                        <div className="card-detail">
                            <span>⬦ New </span>
                            <span>
                                {pieChartData.newCards} - {calcPercentage(pieChartData.newCards, totalCards)} %
                            </span>
                        </div>
                        <div className="card-detail">
                            <span>⬦ Learning </span>
                            <span>
                                {pieChartData.learningCards} - {calcPercentage(pieChartData.learningCards, totalCards)} %
                            </span>
                        </div>
                        <div className="card-detail">
                            <span>⬦ Remember </span>
                            <span>
                                {pieChartData.rememberedCards} - {calcPercentage(pieChartData.rememberedCards, totalCards)} %
                            </span>
                        </div>
                    </div>
                 </div>
            </StatisticsSection>

        </div>
    </div>
}

export default Statistics;