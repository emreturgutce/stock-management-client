import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/tr';
import { useCarState } from '../hooks';

const CustomerChart = () => {
	const { monthlyTotalCustomer } = useCarState();

	const data = {
		labels: [...monthlyTotalCustomer.map((sale) => moment(sale.created_at).locale('tr').format('MMMM'))],
		datasets: [
			{
				label: 'Aylık Müşteri',
				data: [...monthlyTotalCustomer.map((sale) => sale.count)],
				backgroundColor: '#cc73a5',
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
						stepSize: 1,
					},
				},
			],
			xAxes: [{
				categoryPercentage: .2,	
				barPercentage: .5,
			}]
		},
	};

	return <Bar data={data} options={options} />;
};

export default CustomerChart;
