import { useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadCSS } from 'fg-loadcss';
import {
	Container,
	Grid,
	Table,
	Icon,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Chip,
	Divider,
	Card,
	Box,
	CardHeader,
	Link,
	Tooltip,
} from '@material-ui/core';
import Page from '../components/page';
import { formatPrice } from '../utils/format-price';
import { useCarState } from '../hooks';
import { getAllSales } from '../actions';

const AllSales = () => {
	const dispatch = useDispatch();
	const { allSales } = useCarState();

	const getAllSalesCb = useCallback(() => dispatch(getAllSales()), [
		dispatch,
	]);

	useEffect(() => {
		getAllSalesCb();
		// eslint-disable-next-line react-hooks/exhaustive-deps
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css'),
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

	return (
		<Page title='Bütün satışlar'>
			<Container>
				<Grid
					container
					direction='column'
					alignItems='center'
					justify='center'
					style={{ marginTop: '.5rem' }}
				>
					<Card style={{ height: '100%', width: '100%' }}>
						<Box>
							<CardHeader title='Bütün Satışlar' />
							<Divider />
						</Box>
						<Box
							maxWidth='100%'
							style={{
								marginBottom: 'auto',
								overflowX: 'scroll',
							}}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Satış Numarası</TableCell>
										<TableCell>İlan Başlığı</TableCell>
										<TableCell>Satış Fiyatı</TableCell>
										<TableCell>Alış Fiyatı</TableCell>
										<TableCell>Satış Tarihi</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allSales.map((sale) => (
										<TableRow hover key={sale.title}>
											<TableCell>
												{sale.serial_number}
											</TableCell>
											<TableCell>
												<Tooltip
													title={`${sale.title}`}
												>
													<Link
														component={RouterLink}
														to={`/${sale.car_id}`}
													>
														{sale.title}
														<Icon
															color='primary'
															className='fas fa-external-link-alt'
															style={{
																fontSize:
																	'.6rem',
																width: '1rem',
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
														sale.sale_price,
													)}
													size='small'
												/>
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
											<TableCell>
												{new Date(
													sale.sale_date,
												).toLocaleDateString('tr-TR')}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Card>
				</Grid>
			</Container>
		</Page>
	);
};

export default AllSales;
