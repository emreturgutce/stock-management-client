import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
	Modal,
	makeStyles,
	createStyles,
	Grid,
	Typography,
	Container,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	IconButton,
	Collapse,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Delete, Refresh, Edit, Close } from '@material-ui/icons';
import { BASE_URL } from '../constants';
import Loader from '../components/content-loader';
import CarDetailRow from '../components/car-detail-row';
import Page from '../components/page';
import { useCarState, useAuthState, useGetCars } from '../hooks';
import { formatPrice } from '../utils/format-price';
import PDFIcon from '../assets/document.svg';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			position: 'absolute',
		},
	}),
);

const CarDetail = () => {
	const { cars, isLoading } = useCarState();
	const { user } = useAuthState();
	const { id } = useParams();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [openStock, setOpenStock] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const history = useHistory();
	const [car, setCar] = useState(cars.find((car) => car.car_id === id));
	const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
	const getCarsCb = useGetCars();

	const handleDateChange = (date) => {
		setSelectedDate(new Date(date).toISOString().split('T')[0]);
	};

	const handleClose = () => setOpen(false);

	const handleStockClose = () => setOpenStock(false);

	const handleRefresh = () => {
		getCarsCb();
		setCar(cars.find((car) => car.car_id === id));
	};

	const onSubmit = async () => {
		const saleRes = await fetch(`${BASE_URL}/api/sales`, {
			method: 'POST',
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				birth_date: new Date(Date.now()),
				serial_number: Math.floor(Math.random() * 10000),
				price: car.sale_price,
				personel_id: user.id,
				car_id: car.car_id,
				sale_date: selectedDate,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		handleClose();

		if (saleRes.ok) {
			setIsSuccess(true);
			setTimeout(handleRefresh, 5000);
			setTimeout(() => setIsSuccess(false), 5000);
		} else {
			setIsError(true);
		}
	};

	const handleRemoveStock = async () => {
		await fetch(`${BASE_URL}/api/cars/${car.car_id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		handleStockClose();
		history.push('/');
	};

	const renderSuccessAlert = () => {
		if (isSuccess) {
			return (
				<Collapse in={isSuccess}>
					<Alert
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => setIsSuccess(false)}
							>
								<Close fontSize='inherit' />
							</IconButton>
						}
					>
						Satış İşlemi Başarılı !
					</Alert>
				</Collapse>
			);
		} else if (isError) {
			return (
				<Collapse in={isError}>
					<Alert
						severity='error'
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => setIsError(false)}
							>
								<Close fontSize='inherit' />
							</IconButton>
						}
					>
						Bir Hata oluştu !
					</Alert>
				</Collapse>
			);
		}
	};

	const handleEditClick = () => history.push(`/${car.id}/edit`, { car });

	return (
		<Page title={car.title}>
			<Container maxWidth='lg'>
				<div className={classes.root}>
					<Grid container spacing={2}>
						<Grid item xs={12} style={{ marginTop: 12 }}>
							{isSuccess && renderSuccessAlert()}
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h5' component='h5'>
								{car.title}
							</Typography>
						</Grid>
						<Grid item md={7} xs={12}>
							<img
								onClick={() => setOpenModal(true)}
								src={car.image_url || '/araba2.jpg'}
								alt='araba'
								width='85%'
								style={{
									cursor: 'pointer',
									'&hover': { opacity: 0.8 },
								}}
							/>
							<Modal
								open={openModal}
								onClose={() => setOpenModal(false)}
								disableAutoFocus={true}
								aria-labelledby='simple-modal-title'
								aria-describedby='simple-modal-description'
							>
								<div
									className={classes.paper}
									style={{
										borderRadius: 4,
										width: '50%',
										top: `50%`,
										left: `50%`,
										transform: `translate(-50%, -50%)`,
									}}
								>
									<img
										src={car.image_url || '/araba2.jpg'}
										alt='araba modal'
										width='100%'
									/>
								</div>
							</Modal>
						</Grid>
						<>
							<Grid item md={5} xs={12}>
								<Grid container>
									<Grid item xs={4}>
										<Typography variant='h6' component='h6'>
											{formatPrice(car.sale_price)}
										</Typography>
									</Grid>
									<Grid item xs={8}>
										<Grid
											container
											justify='flex-end'
											alignItems='center'
											spacing={1}
										>
											{car.is_sold === 'SOLD' && (
												<Grid item>
													<a
														target='_blank'
														rel='noreferrer'
														href={`${BASE_URL}/api/sales/${car.car_id}/pdf`}
													>
														<Button
															variant='outlined'
															size='small'
															children={
																<img
																	width={24}
																	src={
																		PDFIcon
																	}
																	alt='pdf'
																/>
															}
														/>
													</a>
												</Grid>
											)}
											{car.is_sold !== 'SOLD' && (
												<Grid item>
													<Button
														variant='outlined'
														size='small'
														children={<Edit />}
														onClick={
															handleEditClick
														}
													/>
												</Grid>
											)}
											<Grid item>
												<Button
													variant='outlined'
													size='small'
													children={<Refresh />}
													onClick={handleRefresh}
												/>
											</Grid>
											{car.is_sold !== 'SOLD' && (
												<Grid item>
													<Button
														variant='contained'
														color='secondary'
														onClick={() =>
															setOpenStock(true)
														}
														children={<Delete />}
														disabled={
															car.is_sold ===
															'SOLD'
																? true
																: false
														}
													/>
												</Grid>
											)}

											<Dialog
												open={openStock}
												onClose={handleStockClose}
												aria-labelledby='alert-dialog-title'
												aria-describedby='alert-dialog-description'
											>
												<DialogTitle id='alert-dialog-title'>
													<Typography variant='p'>
														{
															'Arabanın bilgileri tamamen silinecek bu işlemi gerçekleştirmek istediğinize emin misiniz?'
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
														Reddet
													</Button>
													<Button
														onClick={
															handleRemoveStock
														}
														color='primary'
														autoFocus
													>
														Kabul et
													</Button>
												</DialogActions>
											</Dialog>
											{/* SELL BUTTON */}
											{car.is_sold !== 'SOLD' && (
												<Grid item>
													<Button
														variant='contained'
														color='secondary'
														onClick={() =>
															setOpen(true)
														}
														disabled={
															car.is_sold ===
															'SOLD'
																? true
																: false
														}
													>
														{car.is_sold === 'SOLD'
															? 'Satıldı'
															: 'Sat'}
													</Button>
												</Grid>
											)}

											<Dialog
												open={open}
												onClose={handleClose}
												aria-labelledby='form-dialog-title'
											>
												<DialogTitle id='form-dialog-title'>
													Müşteri Bilgileri
												</DialogTitle>
												<DialogContent>
													<TextField
														autoFocus
														margin='dense'
														id='first_name'
														label='Ad'
														fullWidth
														variant='outlined'
														value={firstName}
														onChange={(e) =>
															setFirstName(
																e.target.value,
															)
														}
													/>
													<TextField
														margin='dense'
														id='last_name'
														variant='outlined'
														label='Soyad'
														fullWidth
														value={lastName}
														onChange={(e) =>
															setLastName(
																e.target.value,
															)
														}
													/>
													<KeyboardDatePicker
														fullWidth
														required
														disableToolbar
														inputVariant='outlined'
														format='MM/dd/yyyy'
														margin='normal'
														id='enter_date'
														label='Giriş Tarihi'
														value={selectedDate}
														onChange={
															handleDateChange
														}
														KeyboardButtonProps={{
															'aria-label':
																'change date',
														}}
													/>
												</DialogContent>
												<DialogActions>
													<Button
														onClick={handleClose}
														color='primary'
													>
														İptal
													</Button>
													<Button
														onClick={onSubmit}
														color='primary'
													>
														Onayla
													</Button>
												</DialogActions>
											</Dialog>
										</Grid>
									</Grid>
								</Grid>

								<hr />
								<Grid container spacing={2}>
									<CarDetailRow
										key={car.model}
										name={'Model'}
										value={car.model}
									/>
									<CarDetailRow
										key={car.year}
										name={'Yıl'}
										value={car.year}
									/>
									<CarDetailRow
										key={car.is_new}
										name={'Yeni mi'}
										value={
											car.is_new === 'NEW'
												? 'Sıfır'
												: 'İkinci el'
										}
									/>
									<CarDetailRow
										key={car.enter_date}
										name={'Giriş tarihi'}
										value={new Date(car.enter_date)
											.toLocaleString('tr-TR')
											.replace(/03:00:00/, '')}
									/>
									<CarDetailRow
										key={car.purchase_price}
										name='Alış Fiyatı'
										value={formatPrice(car.purchase_price)}
									/>
									<CarDetailRow
										key={car.is_sold}
										name='Satıldı mı'
										value={
											car.is_sold === 'SOLD'
												? 'Satıldı'
												: 'Satılmadı'
										}
									/>
									<CarDetailRow
										key={car.car_brand}
										name='Marka'
										value={car.car_brand}
									/>
									<CarDetailRow
										key={car.car_color}
										name='Renk'
										value={car.car_color}
									/>
								</Grid>
							</Grid>

							{isLoading ? (
								<Loader
									header={true}
									rowCount={2}
									rowWidth='100%'
									rowHeight={8}
								/>
							) : (
								<>
									<Grid item xs={12}>
										<Typography variant='h6'>
											Açıklama
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography variant='body1'>
											{car.car_description}
										</Typography>
									</Grid>
								</>
							)}
						</>
					</Grid>
				</div>
			</Container>
		</Page>
	);
};

export default CarDetail;
