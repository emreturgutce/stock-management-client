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
import {
	Grid,
	Button,
	Box,
	Card,
	CardHeader,
	Chip,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Container,
} from '@material-ui/core';
import {
	getSales,
	getTotalProfit,
	getTotalCustomer,
	getLatestSales,
} from '../actions';
import { useCarState } from '../hooks/use-car-state';
import TotalProfit from '../components/total-profit';
import TotalCustomers from '../components/total-customers';
import TotalRevenue from '../components/total-revenue';
import Page from '../components/page';
import { formatPrice } from '../utils/format-price';

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
	// eslint-disable-next-line no-unused-vars
	const [_, setActiveItem] = useState(sales[activeIndex]);

	const handleClick = (data, index) => setActiveIndex(index);

	useEffect(getSalesCb, [getSalesCb]);
	useEffect(getTotalProfitCb, [getTotalProfitCb]);
	useEffect(getTotalCustomerCb, [getTotalCustomerCb]);

	useEffect(() => {
		setActiveItem(sales[activeIndex]);
	}, [activeIndex, sales]);

	const { latestSales } = useCarState();

	const getLatestSalesCb = useCallback(() => dispatch(getLatestSales()), [
		dispatch,
	]);

	useEffect(getLatestSalesCb, [getLatestSalesCb]);

	return (
		<Page title='Satış Grafiği'>
			<Container>
				<Grid
					container
					direction='column'
					alignItems='center'
					justify='center'
					style={{ marginTop: '.5rem' }}
				>
					<Grid item container spacing={1} md={12} xs={12}>
						<Grid item md={4} xs={12}>
							<TotalProfit />
						</Grid>
						<Grid item md={4} xs={12}>
							<TotalCustomers />
						</Grid>

						{/* !TODO CHANGE THIS */}
						<Grid item md={4} xs={12}>
							<TotalRevenue />
						</Grid>
					</Grid>
					<Grid
						item
						container
						justify='center'
						direction='row'
						style={{ marginTop: '1rem' }}
					>
						<Grid item md={6} sm={12}>
							<Card style={{ height: '100%' }}>
								<CardHeader title='Satış Grafiği' />
								<Divider />
								<ResponsiveContainer
									height={400}
									maxWidth='100%'
								>
									<LineChart
										data={sales}
										style={{ left: '-1rem' }}
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
							</Card>
						</Grid>
						<Grid item md={6} sm={12}>
							<Card>
								<CardHeader title='Son Satışlar' />
								<Divider />
								<Box maxWidth='100%'>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													Satış Numarası
												</TableCell>
												<TableCell>
													İlan Başlığı
												</TableCell>
												<TableCell>Fiyat</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{latestSales.map((sale) => (
												<TableRow
													hover
													key={sale.title}
												>
													<TableCell>
														{sale.serial_number}
													</TableCell>
													<TableCell>
														{sale.title}
													</TableCell>
													<TableCell>
														<Chip
															color='primary'
															label={formatPrice(
																sale.purchase_price,
															)}
															size='small'
														/>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Box>
								<Box
									display='flex'
									justifyContent='flex-end'
									p={2}
								>
									<Button variant='outlined' color='primary'>
										Hepsini Gör
									</Button>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

export default Chart;
