import { useEffect, useCallback, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
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
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import {
	Delete,
	ShoppingCart,
	Check,
	Close,
	HighlightOff,
} from '@material-ui/icons';
import { toast } from 'react-toastify';
import Page from '../components/page';
import { useCarState, useAuthState } from '../hooks';
import { getAwaitingEvents, getCompletedEvents } from '../actions';
import { BASE_URL } from '../constants';

const AwaitingEvents = () => {
	const dispatch = useDispatch();
	const { awaitingEvents, completedEvents } = useCarState();
	const {
		user: { role },
	} = useAuthState();

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
		<>
			{role === 'ADMIN' ? (
				<Page title="Etkinlikler">
					<Container>
						<Grid
							container
							direction="column"
							alignItems="center"
							justify="center"
							style={{ marginTop: '.5rem' }}
						>
							<Card style={{ height: '100%', width: '100%' }}>
								<Box>
									<CardHeader
										title="Onay Bekleyen Etkinlikler"
										subheader="Stok yönetim sisteminde bulunan personellerin admin onayı göndermiş olduğu etkinlikler."
										subheaderTypographyProps={{
											variant: 'subtitle',
										}}
									/>
									<Divider />
								</Box>
								<Box
									maxWidth="100%"
									style={{
										marginBottom: 'auto',
										overflowX: 'scroll',
									}}
								>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													İlan Başlığı
												</TableCell>
												<TableCell>
													Personel Adı
												</TableCell>
												<TableCell>
													İşlem Türü
												</TableCell>
												<TableCell>
													Müşteri Adı
												</TableCell>
												<TableCell>
													Aksiyonlar
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{awaitingEvents.map((event) => (
												<TableRow
													hover
													key={event.title}
												>
													<TableCell>
														<Tooltip
															title={`${event.title}`}
														>
															<Link
																component={
																	RouterLink
																}
																to={`/${event.car_id}`}
															>
																{event.title}
																<Icon
																	color="primary"
																	className="fas fa-external-link-alt"
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
														{`${event.first_name} ${event.last_name}`}
													</TableCell>
													<TableCell>
														{event.type ===
														'DELETE' ? (
															<Chip
																label="Silme"
																variant="outlined"
																size="small"
																color="secondary"
																icon={
																	<Delete
																		color="secondary"
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
																label="Satış"
																variant="outlined"
																size="small"
																color="secondary"
																icon={
																	<ShoppingCart
																		color="secondary"
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
														{event.type ===
															'SELL' &&
															event.customer_first_name +
																' ' +
																event.customer_last_name}
													</TableCell>
													<TableCell>
														<Tooltip title="İptal Et">
															<IconButton
																edge="start"
																color="inherit"
																aria-label="menu"
																onClick={() => {
																	handleAbortAction(
																		event.car_id,
																	);
																}}
															>
																<Close
																	style={{
																		fill:
																			'#f44336',
																	}}
																	fontSize="small"
																/>
															</IconButton>
														</Tooltip>
														<Tooltip title="Onayla">
															<IconButton
																edge="start"
																color="inherit"
																aria-label="menu"
																onClick={() =>
																	setOpenStock(
																		true,
																	)
																}
															>
																<Check
																	style={{
																		fill:
																			'#4caf50',
																	}}
																	fontSize="small"
																/>
															</IconButton>
														</Tooltip>
														<Dialog
															open={openStock}
															onClose={
																handleStockClose
															}
															aria-labelledby="alert-dialog-title"
															aria-describedby="alert-dialog-description"
														>
															<DialogTitle id="alert-dialog-title">
																<Typography variant="p">
																	{`${
																		event.type ===
																		'DELETE'
																			? 'Silme'
																			: 'Satma'
																	} işlemini onaylamak istiyor musun ?`}
																</Typography>
															</DialogTitle>
															<DialogContent>
																<DialogContentText id="alert-dialog-description">
																	{event.type ===
																	'DELETE'
																		? 'Araç bilgileri tamamen kaldırılacak ve bir daha ulaşılamayacak.'
																		: 'Araç satma işlemi gerçekleştikten sonra araç bilgileri bir daha değiştirilemez.'}
																</DialogContentText>
															</DialogContent>
															<DialogActions>
																<Button
																	onClick={
																		handleStockClose
																	}
																	color="primary"
																>
																	Reddet
																</Button>
																<Button
																	color="primary"
																	autoFocus
																	onClick={() => {
																		handleConfirmAction(
																			event.awaiting_list_id,
																			event.type,
																		);
																	}}
																>
																	Kabul Et
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
									<CardHeader
										title="Onaylanmış Etkinlikler"
										subheader="Adminlerin onaylamış olduğu etkinlikler"
										subheaderTypographyProps={{
											variant: 'subtitle',
										}}
									/>
									<Divider />
								</Box>
								<Box
									maxWidth="100%"
									style={{
										marginBottom: 'auto',
										overflowX: 'scroll',
									}}
								>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													İlan Başlığı
												</TableCell>
												<TableCell>
													Personel Adı
												</TableCell>
												<TableCell>
													İşlem Türü
												</TableCell>
												<TableCell>
													Satış Tarihi
												</TableCell>
												<TableCell>
													Gerçekleşti Mi
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{completedEvents.map((event) => (
												<TableRow
													hover
													key={event.title}
												>
													<TableCell>
														<Tooltip
															title={`${event.title}`}
														>
															{event.type !==
																'DELETE' ||
															(event.type ===
																'DELETE' &&
																event.is_aborted) ? (
																<Link
																	component={
																		RouterLink
																	}
																	to={`/${event.car_id}`}
																>
																	{
																		event.title
																	}
																	<Icon
																		color="primary"
																		className="fas fa-external-link-alt"
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
																<>
																	{
																		event.title
																	}
																</>
															)}
														</Tooltip>
													</TableCell>
													<TableCell>
														{`${event.first_name} ${event.last_name}`}
													</TableCell>
													<TableCell>
														{event.type ===
														'DELETE' ? (
															<Chip
																label="Silme"
																variant="outlined"
																size="small"
																color="secondary"
																icon={
																	<Delete
																		color="secondary"
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
																label="Satış"
																variant="outlined"
																size="small"
																color="secondary"
																icon={
																	<ShoppingCart
																		color="secondary"
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
													<TableCell>
														{!event.is_aborted ? (
															<Tooltip title="Gerçekleşti">
																<svg
																	focusable="false"
																	viewBox="0 0 24 24"
																	style={{
																		margin:
																			'auto',
																	}}
																	aria-hidden="true"
																	width="24px"
																	height="24px"
																	fill="#4caf50"
																>
																	<path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
																</svg>
															</Tooltip>
														) : (
															<Tooltip title="Gerçekleşmedi">
																<HighlightOff
																	style={{
																		fill:
																			'#f44336',
																		margin:
																			'auto',
																	}}
																/>
															</Tooltip>
														)}
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
			) : (
				<Redirect to="/" />
			)}
		</>
	);
};

export default AwaitingEvents;
