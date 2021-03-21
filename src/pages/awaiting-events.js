import { useEffect, useCallback, useState } from 'react';
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
	IconButton,
	Dialog,
	DialogTitle,
	Typography,
	DialogActions,
	Button,
} from '@material-ui/core';
import { Delete, ShoppingCart, Check, Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import Page from '../components/page';
import { useCarState } from '../hooks';
import { getAwaitingEvents, getCompletedEvents } from '../actions';
import { BASE_URL } from '../constants';

const AwaitingEvents = () => {
	const dispatch = useDispatch();
	const { awaitingEvents, completedEvents } = useCarState();
	const [openStock, setOpenStock] = useState(false);

	const handleStockClose = () => setOpenStock(false);

	const getAwaitingEventsCb = useCallback(
		() => dispatch(getAwaitingEvents()),
		[dispatch],
	);

	const getCompletedEventsCb = useCallback(
		() => dispatch(getCompletedEvents()),
		[dispatch],
	);

	const handleConfirmAction = async (awaitingListId, type) => {
		const res = await fetch(
			`${BASE_URL}/api/cars/${awaitingListId}/confirm-action`,
			{
				method: 'GET',
				credentials: 'include',
			},
		);

		if (res.ok) {
			toast.success(
				`Araba ${
					type === 'DELETE' ? 'silme' : 'satma'
				} işlemi başarılı bir şekilde onaylandı.`,
				{
					position: 'top-center',
					autoclose: 5000,
					hideprogressbar: false,
					closeonclick: true,
					pauseonhover: true,
					draggable: true,
					progress: undefined,
				},
			);
		} else {
			toast.error('Onaylama işlemi sırasında bir sorun oluştu', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		}

		getAwaitingEventsCb();
		getCompletedEventsCb();

		handleStockClose();
	};
	const handleAbortAction = async (carId) => {
		const res = await fetch(`${BASE_URL}/api/cars/${carId}/abort-action`, {
			method: 'GET',
			credentials: 'include',
		});

		if (res.ok) {
			toast.success('İptal işlemi başarılı', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error('İptal işlemi sırasında bir sorun oluştu', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		}

		getAwaitingEventsCb();
		getCompletedEventsCb();

		handleStockClose();
	};

	useEffect(() => {
		getAwaitingEventsCb();
		getCompletedEventsCb();

		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css'),
		);

		return () => {
			node.parentNode.removeChild(node);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page title='Bekleyen Etkinlikler'>
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
							<CardHeader title='Bekleyen Etkinlikler' />
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
										<TableCell>
											<b>İlan Başlığı</b>
										</TableCell>
										<TableCell>
											<b>Personel Adı</b>
										</TableCell>
										<TableCell>
											<b>İşlem Türü</b>
										</TableCell>
										<TableCell> </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{awaitingEvents.map((event) => (
										<TableRow hover key={event.title}>
											<TableCell>
												<Tooltip
													title={`${event.title}`}
												>
													<Link
														component={RouterLink}
														to={`/${event.car_id}`}
													>
														{event.title}
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
												{`${event.first_name} ${event.last_name}`}
											</TableCell>
											<TableCell>
												{event.type === 'DELETE' ? (
													<Chip
														label='Silme'
														variant='outlined'
														size='small'
														color='secondary'
														icon={
															<Delete
																color='secondary'
																style={{
																	width:
																		'1rem',
																	marginLeft: 10,
																}}
															/>
														}
													/>
												) : (
													<Chip
														label='Satış'
														variant='outlined'
														size='small'
														color='secondary'
														icon={
															<ShoppingCart
																color='secondary'
																style={{
																	width:
																		'1rem',
																	marginLeft: 10,
																}}
															/>
														}
													/>
												)}
											</TableCell>
											<TableCell>
												<Tooltip title='İptal Et'>
													<IconButton
														edge='start'
														color='inherit'
														aria-label='menu'
														onClick={() => {
															handleAbortAction(
																event.car_id,
															);
														}}
													>
														<Close
															style={{
																fill: '#f44336',
															}}
															fontSize='small'
														/>
													</IconButton>
												</Tooltip>
												<Tooltip title='Onayla'>
													<IconButton
														edge='start'
														color='inherit'
														aria-label='menu'
														onClick={() =>
															setOpenStock(true)
														}
													>
														<Check
															style={{
																fill: '#4caf50',
															}}
															fontSize='small'
														/>
													</IconButton>
												</Tooltip>
												<Dialog
													open={openStock}
													onClose={handleStockClose}
													aria-labelledby='alert-dialog-title'
													aria-describedby='alert-dialog-description'
												>
													<DialogTitle id='alert-dialog-title'>
														<Typography variant='p'>
															{
																'Bu işlemi kabul etmek istediğinize emin misiniz ?'
															}
															{'\n'}
															{
																'(Bu işlem geri alınamaz)'
															}
														</Typography>
													</DialogTitle>
													<DialogActions>
														<Button
															onClick={
																handleStockClose
															}
															color='primary'
														>
															Hayır
														</Button>
														<Button
															color='primary'
															autoFocus
															onClick={() => {
																handleConfirmAction(
																	event.awaiting_list_id,
																	event.type,
																);
															}}
														>
															Evet
														</Button>
													</DialogActions>
												</Dialog>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Card>
					<Card
						style={{
							height: '100%',
							width: '100%',
							marginTop: '1rem',
						}}
					>
						<Box>
							<CardHeader title='Tamamlanmış Etkinlikler' />
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
										<TableCell>
											<b>İlan Başlığı</b>
										</TableCell>
										<TableCell>
											<b>Personel Adı</b>
										</TableCell>
										<TableCell>
											<b>İşlem Türü</b>
										</TableCell>
										<TableCell>
											<b>Satış Tarihi</b>
										</TableCell>
										<TableCell> </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{completedEvents.map((event) => (
										<TableRow hover key={event.title}>
											<TableCell>
												<Tooltip
													title={`${event.title}`}
												>
													{event.type !== 'DELETE' ? (
														<Link
															component={
																RouterLink
															}
															to={`/${event.car_id}`}
														>
															{event.title}
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
													) : (
														<>{event.title}</>
													)}
												</Tooltip>
											</TableCell>
											<TableCell>
												{`${event.first_name} ${event.last_name}`}
											</TableCell>
											<TableCell>
												{event.type === 'DELETE' ? (
													<Chip
														label='Silme'
														variant='outlined'
														size='small'
														color='secondary'
														icon={
															<Delete
																color='secondary'
																style={{
																	width:
																		'1rem',
																	marginLeft: 10,
																}}
															/>
														}
													/>
												) : (
													<Chip
														label='Satış'
														variant='outlined'
														size='small'
														color='secondary'
														icon={
															<ShoppingCart
																color='secondary'
																style={{
																	width:
																		'1rem',
																	marginLeft: 10,
																}}
															/>
														}
													/>
												)}
											</TableCell>
											<TableCell>
												{event.sale_date &&
													new Date(
														event.sale_date,
													).toLocaleDateString(
														'tr-TR',
													)}
											</TableCell>
											<TableCell> </TableCell>
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

export default AwaitingEvents;
