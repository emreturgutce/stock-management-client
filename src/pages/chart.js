import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Cell,
	ResponsiveContainer,
} from 'recharts';
import { Grid, Typography } from '@material-ui/core';
import { getSales, getTotalProfit, getTotalCustomer } from '../actions';
import { useCarState } from '../hooks/use-car-state';
import TotalProfit from '../components/total-profit';
import TotalCustomers from '../components/total-customers';
import Page from '../components/page';

const Chart = () => {
	const dispatch = useDispatch();
	const { sales } = useCarState();
	const getSalesCb = useCallback(() => dispatch(getSales()), [dispatch]);
	const getTotalProfitCb = useCallback(() => dispatch(getTotalProfit()), [
		dispatch,
	]);

	const getTotalCustomerCb = useCallback(() => dispatch(getTotalCustomer()), [
		dispatch,
	]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeItem, setActiveItem] = useState(sales[activeIndex]);

	const handleClick = (data, index) => setActiveIndex(index);

	useEffect(getSalesCb, [getSalesCb]);
	useEffect(getTotalProfitCb, [getTotalProfitCb]);
	useEffect(getTotalCustomerCb, [getTotalCustomerCb]);

	useEffect(() => {
		setActiveItem(sales[activeIndex]);
	}, [activeIndex, sales]);

	return (
		<Page title='Satış Grafiği'>
			<Grid
				container
				direction='column'
				alignItems='center'
				justify='center'
				style={{ marginTop: '.5rem' }}
			>
				<Grid item container spacing={3} md={8} xs={12}>
					<Grid item md={6} xs={12}>
						<TotalProfit />
					</Grid>
					<Grid item md={6} xs={12}>
						<TotalCustomers />
					</Grid>
				</Grid>
				<Grid item style={{ marginTop: '1rem' }}>
					<Typography variant='h6' align='center'>
						1 Aralık 2020 ve 1 Şubat 2021 Arası Satış Grafiği
					</Typography>
					<ResponsiveContainer height={400} maxWidth='100%'>
						<LineChart
							data={sales}
							margin={{
								top: 5,
								right: 20,
								bottom: 5,
								left: 0,
							}}
						>
							<CartesianGrid strokeDasharray='5 5' />
							<XAxis dataKey='sale_date' />
							<YAxis dateKey='count' />
							<Tooltip />
							<Line
								type='monotone'
								dataKey='count'
								onClick={handleClick}
							>
								{sales.map((entry, index) => (
									<Cell
										cursor='pointer'
										fill={
											index === activeIndex
												? '#82ca9d'
												: '#8884d8'
										}
										key={`cell-${index}`}
									/>
								))}
							</Line>
						</LineChart>
					</ResponsiveContainer>
				</Grid>
			</Grid>
		</Page>
	);
};

export default Chart;
