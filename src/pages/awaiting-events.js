import { useEffect, useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Container,
	Grid,
	Table,
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
import { Check, Close } from '@material-ui/icons';
import { toast } from 'react-toastify';
import Page from '../components/page';
import { useCarState } from '../hooks';
import { getAwaitingEvents } from '../actions';
import { BASE_URL } from '../constants';

const AwaitingEvents = () => {
	const dispatch = useDispatch();
	const { awaitingEvents } = useCarState();
	const [openStock, setOpenStock] = useState(false);

	const handleStockClose = () => setOpenStock(false);

	const getAwaitingEventsCb = useCallback(
		() => dispatch(getAwaitingEvents()),
		[dispatch],
	);

	const handleConfirmAction = async (awaitingListId, type) => {
		// TODO Confirm action
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

		handleStockClose();
	};
	const handleAbortAction = async (carId) => {
		// TODO Confirm action
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

		handleStockClose();
	};

	useEffect(() => {
		getAwaitingEventsCb();
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
										<TableCell>İlan Başlığı</TableCell>
										<TableCell>Personel Adı</TableCell>
										<TableCell>İşlem Türü</TableCell>
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
													</Link>
												</Tooltip>
											</TableCell>
											<TableCell>
												{`${event.first_name} ${event.last_name}`}
											</TableCell>
											<TableCell>
												<Chip
													color='secondary'
													label={
														event.type === 'DELETE'
															? 'Silme'
															: 'Satış'
													}
													size='small'
												/>
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
				</Grid>
			</Container>
		</Page>
	);
};

export default AwaitingEvents;
