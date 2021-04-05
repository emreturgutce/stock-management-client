import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { loadCSS } from 'fg-loadcss';
import {
	Grid,
	Button,
	Box,
	Card,
	CardHeader,
	Chip,
	Icon,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Container,
	Link,
	Tooltip,
} from '@material-ui/core';
import {
	getSales,
	getTotalProfit,
	getTotalCustomer,
	getLatestSales,
	getTotalSaleMonthly,
	getTotalWorthMonthly,
	getTotalCustomerMonthly,
} from '../actions';
import { useCarState } from '../hooks/use-car-state';
import TotalProfit from '../components/total-profit';
import TotalCustomers from '../components/total-customers';
import TotalRevenue from '../components/total-revenue';
import Page from '../components/page';
import { formatPrice } from '../utils/format-price';
import { getTotalRevenue } from '../actions/cars/get-total-revenue';
import LChart from '../components/line-chart';
import SaleWorthChart from '../components/sale-worth-chart';
import CustomerChart from '../components/customer-chart';
import DateRangeSlider from '../components/date-range-slider';

const fromDate = '2020-06-01';
const toDate = '2021-06-01';

const Chart = () => {
	const dispatch = useDispatch();
	const getSalesCb = useCallback((from, to) => dispatch(getSales(from, to)), [
		dispatch,
	]);
	const getTotalProfitCb = useCallback(() => dispatch(getTotalProfit()), [
		dispatch,
	]);

	const getTotalCustomerCb = useCallback(() => dispatch(getTotalCustomer()), [
		dispatch,
	]);
	const getTotalRevenueCb = useCallback(() => dispatch(getTotalRevenue()), [
		dispatch,
	]);
	const getTotalSaleMonthlyCb = useCallback(
		() => dispatch(getTotalSaleMonthly()),
		[dispatch],
	);
	const getTotalWorthMonthlyCb = useCallback(
		() => dispatch(getTotalWorthMonthly()),
		[dispatch],
	);
	const getTotalCustomerMonthlyCb = useCallback(
		() => dispatch(getTotalCustomerMonthly()),
		[dispatch],
	);
	const mediaMatch = window.matchMedia('(min-width: 1200px)');
	const [matches, setMatches] = useState(mediaMatch.matches);

	useEffect(() => {
		const handler = (e) => setMatches(e.matches);
		mediaMatch.addListener(handler);
		return () => mediaMatch.removeListener(handler);
	});
	useEffect(() => {
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css'),
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

	useEffect(() => {
		getSalesCb(fromDate, toDate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getSalesCb]);
	useEffect(getTotalProfitCb, [getTotalProfitCb]);
	useEffect(getTotalCustomerCb, [getTotalCustomerCb]);
	useEffect(getTotalRevenueCb, [getTotalRevenueCb]);
	useEffect(getTotalWorthMonthlyCb, [getTotalWorthMonthlyCb]);
	useEffect(getTotalSaleMonthlyCb, [getTotalSaleMonthlyCb]);
	useEffect(getTotalCustomerMonthlyCb, [getTotalCustomerMonthlyCb]);

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
						<Grid
							item
							md={4}
							xs={12}
							style={{ paddingLeft: matches && 0 }}
						>
							<TotalProfit />
						</Grid>
						<Grid item md={4} xs={12}>
							<TotalCustomers />
						</Grid>
						<Grid
							item
							md={4}
							xs={12}
							style={{ paddingRight: matches && 0 }}
						>
							<TotalRevenue />
						</Grid>
					</Grid>
					<Grid
						item
						container
						justify='center'
						direction='row'
						style={{ marginTop: '1rem' }}
						spacing={1}
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
								<Grid
									container
									direction='column'
									justify='space-between'
									style={{ height: '100%' }}
								>
									<Grid item>
										<Box>
											<CardHeader title='Son Satışlar' />
											<Divider />
										</Box>
										<Box
											maxWidth='100%'
											style={{ marginBottom: 'auto' }}
										>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>
															Satış Numarası
														</TableCell>
														<TableCell>
															İlan Başlığı
														</TableCell>
														<TableCell>
															Fiyat
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{latestSales.map((sale) => (
														<TableRow
															hover
															key={sale.title}
														>
															<TableCell>
																{
																	sale.serial_number
																}
															</TableCell>
															<TableCell>
																<Tooltip
																	title={`${sale.title}`}
																>
																	<Link
																		component={
																			RouterLink
																		}
																		to={`/${sale.car_id}`}
																	>
																		{
																			sale.title
																		}
																		<Icon
																			color='primary'
																			className='fas fa-external-link-alt'
																			style={{
																				fontSize:
																					'.6rem',
																				width:
																					'1rem',
																				marginLeft: 6,
																			}}
																		/>
																	</Link>
																</Tooltip>
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
									</Grid>
									<Grid item>
										<Divider />
										<Box
											display='flex'
											justifyContent='flex-end'
											p={2}
										>
											<Button
												component={RouterLink}
												to='/sales'
												variant='outlined'
												color='primary'
											>
												Hepsini Gör
												<Icon
													color='primary'
													className='fas fa-external-link-alt'
													style={{
														fontSize: '.6rem',
														width: '1rem',
														marginLeft: 6,
													}}
												/>
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Card>
						</Grid>
					</Grid>
					<Grid
						item
						container
						justify='center'
						direction='row'
						style={{ marginTop: '1rem' }}
						spacing={1}
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
										<CardHeader title='Kar/Ciro Grafiği' />

										<Divider />
									</Grid>
									<Grid item>
										<SaleWorthChart />
									</Grid>
									<Grid item style={{ height: 70.8 }}>
										<Divider />
										<Box height='100%' />
									</Grid>
								</Grid>
							</Card>
						</Grid>
						<Grid item md={6} sm={12} style={{ width: '100%' }}>
							<Card style={{ height: '100%' }}>
								<Grid
									container
									direction='column'
									justify='space-between'
									style={{ height: '100%' }}
								>
									<Grid item>
										<CardHeader title='Müşteri Grafiği' />

										<Divider />
									</Grid>
									<Grid item>
										<CustomerChart />
									</Grid>
									<Grid item style={{ height: 70.8 }}>
										<Divider />
										<Box height='100%' />
									</Grid>
								</Grid>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

export default Chart;
