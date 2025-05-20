import { Line } from 'react-chartjs-2';
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
import type { CarInstance } from '../../types';
import { chartCalculations } from '../../utils/chartCalculations';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface FuelingChartProps {
    car: CarInstance;
    chartType: keyof typeof chartCalculations;
}

export function FuelingChart({ car, chartType }: FuelingChartProps) {
    const sortedFuelings = [...car.fuelings].sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    const helper = chartCalculations[chartType];

    const data = {
        labels: helper.getLabels(sortedFuelings),
        datasets: [
            {
                label: helper.title,
                data: helper.getDataSet(sortedFuelings),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'bottom' as const,
            },
            title: {
                display: false,
                text: 'Fuel Consumption Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: false,
                    text: 'L/100km'
                }
            },
            x: {
                title: {
                    display: false,
                    text: 'Date'
                }
            }
        },
    };

    return (
        <div className="h-[300px] w-full">
            <Line data={data} options={options} />
        </div>
    );
} 