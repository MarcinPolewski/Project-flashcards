import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './PieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = (props) => {

    const {newCards, learningCards, rememberedCards} = props.data;

    const pieData = {
        labels: ["New", "Learning", "Remembered"],
        datasets: [
            {
                data: [newCards, learningCards, rememberedCards],
                backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
                hoverBackgroundColor: ["#ff4d6d", "#3498db", "#26a69a"]
            }
        ]
    };

    const pieOptions = {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return <div className="pie-chart-container">
        <Pie data={pieData} options={pieOptions} />
    </div>
}

export default PieChart;