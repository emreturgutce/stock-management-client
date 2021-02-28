import { Line } from 'react-chartjs-2';
import { useCarState } from '../hooks';

const LineChart = () => {
	const { sales } = useCarState();

	const data = {
		labels: [...sales.map((sale) => sale.sale_date)],
		datasets: [
			{
				label: 'Satış Adedi',
				data: [...sales.map((sale) => sale.count)],
				fill: false,
				backgroundColor: '#49789c',
				borderColor: '#adcae1',
				pointHoverRadius: 5,
				lineTension: 0.1,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return <Line data={data} options={options} />;
};

export default LineChart;
