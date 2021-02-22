import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
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
import { getTotalRevenue } from '../actions/cars/get-total-revenue';
import LChart from '../components/line-chart';

const Chart = () => {
	const dispatch = useDispatch();
	const getSalesCb = useCallback(() => dispatch(getSales()), [dispatch]);
	const getTotalProfitCb = useCallback(() => dispatch(getTotalProfit()), [
		dispatch,
	]);

	const getTotalCustomerCb = useCallback(() => dispatch(getTotalCustomer()), [
		dispatch,
	]);
	const getTotalRevenueCb = useCallback(() => dispatch(getTotalRevenue()), [
		dispatch,
	]);

	useEffect(getSalesCb, [getSalesCb]);
	useEffect(getTotalProfitCb, [getTotalProfitCb]);
	useEffect(getTotalCustomerCb, [getTotalCustomerCb]);
	useEffect(getTotalRevenueCb, [getTotalRevenueCb]);

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
						<Grid item md={6} sm={12} style={{ width: '100%' }}>
							<Card style={{ height: '100%' }}>
								<Grid
									container
									direction='column'
									justify='space-between'
									style={{ height: '100%' }}
								>
									<Grid item>
										<CardHeader title='Satış Grafiği' />

										<Divider />
									</Grid>
									<Grid item>
										<LChart />
									</Grid>
									<Grid item style={{ height: 70.8 }}>
										<Divider />
										<Box height='100%' />
									</Grid>
								</Grid>
							</Card>
						</Grid>
						<Grid item md={6} sm={12}>
							<Card style={{ height: '100%' }}>
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
														<RouterLink
															to={`/${sale.car_id}`}
														>
															{sale.title}
														</RouterLink>
													</TableCell>
													<TableCell>
														<Chip
															color='primary'
															label={formatPrice(
																sale.price,
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
