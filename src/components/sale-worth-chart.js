import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/tr';
import { useCarState } from '../hooks';

const SaleWorthChart = () => {
	const { monthlyTotalWorth, monthlyTotalSale } = useCarState();

	const data = {
		labels: [...monthlyTotalSale.map((sale) => moment(sale.sale_date).locale('tr').format('MMMM'))],
		datasets: [
			{
				label: 'Ciro (Bin TL)',
				data: [...monthlyTotalSale.map((sale) => sale.sum / 1000)],
				backgroundColor: 'rgb(255, 99, 132)',
			},
			{
				label: 'Kar (Bin TL)',
				data: [...monthlyTotalWorth.map((sale) => sale.worth / 1000)],
				backgroundColor: 'rgb(54, 162, 235)',
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

	return <Bar data={data} options={options} />;
};

export default SaleWorthChart;
