import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
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
	Grid,
} from '@material-ui/core';
import Page from '../components/page';
import { useCarState } from '../hooks/use-car-state';
import { getLatestSales } from '../actions';
import { formatPrice } from '../utils/format-price';

const LatestOrders = () => {
	const dispatch = useDispatch();
	const { latestSales } = useCarState();

	const getLatestSalesCb = useCallback(() => dispatch(getLatestSales()), [
		dispatch,
	]);

	useEffect(getLatestSalesCb, [getLatestSalesCb]);

	return (
		<Page title='Anasayfa'>
			<Grid
				container
				alignItems='center'
				justify='center'
				style={{ marginTop: '.5rem' }}
			>
				<Grid item>
					<Card>
						<CardHeader title='Son Satışlar' />
						<Divider />
						<Box maxWidth='100%'>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Satış Numarası</TableCell>
										<TableCell>İlan Başlığı</TableCell>
										<TableCell>Müşteri İsmi</TableCell>
										<TableCell>Satış Tarihi</TableCell>
										<TableCell>Fiyat</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{latestSales.map((sale) => (
										<TableRow hover key={sale.title}>
											<TableCell>
												{sale.serial_number}
											</TableCell>
											<TableCell>{sale.title}</TableCell>
											<TableCell>
												{sale.first_name.toUpperCase()}{' '}
												{sale.last_name.toUpperCase()}
											</TableCell>
											<TableCell>
												{new Date(
													sale.sale_date,
												).toLocaleDateString('tr-TR')}
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
						></Box>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
};

export default LatestOrders;
