import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from 'recharts';
import { getSales } from '../actions/cars/get-sales';
import { useCarState } from '../hooks/use-car-state';

const Chart = () => {
	const dispatch = useDispatch();
	const { sales } = useCarState();
	const getSalesCb = useCallback(() => dispatch(getSales()), [dispatch]);

	useEffect(getSalesCb, [getSalesCb]);

	return (
		<>
			<Helmet>
				<title>Satış Grafiği - Stok Yönetim Sistemi</title>
			</Helmet>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '90%',
					margin: '60px auto',
				}}
			>
				<h3>Satış Grafiği</h3>
				<LineChart
					width={800}
					height={400}
					data={sales}
					margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
				>
					<Line type='monotone' dataKey='count' stroke='#8884d8' />
					<CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
					<XAxis dataKey='sale_date' />
					<YAxis dateKey='count' />
					<Tooltip />
					<Legend />
				</LineChart>
			</div>
		</>
	);
};

export default Chart;
