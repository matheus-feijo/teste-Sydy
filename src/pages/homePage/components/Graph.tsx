import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import "../styles/graph.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type GraphProps = {
    dataGraph: Number[] | undefined;
    labelsGraph: String[] | undefined;
}


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Historico do Bitcoin nos ultimos 7 dias',
        },
    },
};


export function Graph({ dataGraph, labelsGraph }: GraphProps) {

    const data = {
        labels: labelsGraph,
        datasets: [{
            label: 'Bitcoin',
            backgroundColor: '#595959',
            borderColor: '#595959',
            data: dataGraph,
        }]
    };

    return <Line data={data} options={options} className="line-graph" />
}