import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Delete, Refresh, Edit } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import { BASE_URL } from '../constants/index';
import Loader from '../components/content-loader';
import CarDetailRow from '../components/car-detail-row';
import { useCarState, useAuthState, useGetCars } from '../hooks';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
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
	const history = useHistory();
	const [car, setCar] = useState(cars.find((car) => car.car_id === id));
	const getCarsCb = useGetCars();

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
				sale_date: new Date(Date.now()),
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

	const formatPrice = (price) =>
		new Intl.NumberFormat('tr-TR', {
			style: 'currency',
			currency: 'TRY',
			minimumFractionDigits: 2,
		}).format(price);

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
								<CloseIcon fontSize='inherit' />
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
								<CloseIcon fontSize='inherit' />
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
		<>
			<Helmet>
				<title>{car.title} - Stok Yönetim Sistemi</title>
			</Helmet>
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
						<Grid item xs={7}>
							<img
								src={car.image_url || '/araba2.jpg'}
								alt='araba'
								width='85%'
							/>
						</Grid>
						<>
							<Grid item xs={5}>
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
											<Grid item>
												<Button
													variant='outlined'
													size='small'
													children={<Edit />}
													onClick={handleEditClick}
												/>
											</Grid>
											<Grid item>
												<Button
													variant='outlined'
													size='small'
													children={<Refresh />}
													onClick={handleRefresh}
												/>
											</Grid>
											<Grid item>
												<Button
													variant='contained'
													color='secondary'
													onClick={() =>
														setOpenStock(true)
													}
													children={<Delete />}
													disabled={
														car.is_sold === 'SOLD'
															? true
															: false
													}
												/>
											</Grid>
											<Dialog
												open={openStock}
												onClose={handleStockClose}
												aria-labelledby='alert-dialog-title'
												aria-describedby='alert-dialog-description'
											>
												<DialogTitle id='alert-dialog-title'>
													{'Emin misiniz?'}
												</DialogTitle>
												<DialogContent>
													<DialogContentText id='alert-dialog-description'>
														Lorem ipsum dolor sit
														amet consectetur
														adipisicing elit. Ea
														tenetur temporibus
														voluptatem aperiam est
														voluptate enim ut
														explicabo quis? Beatae,
														deserunt aperiam!
														Veniam, accusantium
														alias in iusto non
														nostrum esse.
													</DialogContentText>
												</DialogContent>
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
											<Grid item>
												<Button
													variant='contained'
													color='secondary'
													onClick={() =>
														setOpen(true)
													}
													disabled={
														car.is_sold === 'SOLD'
															? true
															: false
													}
												>
													{car.is_sold === 'SOLD'
														? 'Satıldı'
														: 'Sat'}
												</Button>
											</Grid>
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
														label='Soyad'
														fullWidth
														value={lastName}
														onChange={(e) =>
															setLastName(
																e.target.value,
															)
														}
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
														Kaydet
													</Button>
												</DialogActions>
											</Dialog>
										</Grid>
									</Grid>
								</Grid>

								<hr />
								<Grid container spacing={2}>
									<CarDetailRow
										name={'Model'}
										value={car.model}
									/>
									<CarDetailRow
										name={'Yıl'}
										value={car.year}
									/>
									<CarDetailRow
										name={'Yeni mi'}
										value={
											car.is_new === 'NEW'
												? 'Sıfır'
												: 'İkinci el'
										}
									/>
									<CarDetailRow
										name={'Giriş tarihi'}
										value={new Date(car.enter_date)
											.toLocaleString('tr-TR')
											.replace(/03:00:00/, '')}
									/>
									<CarDetailRow
										name='Alış Fiyatı'
										value={formatPrice(car.purchase_price)}
									/>
									<CarDetailRow
										name='Satıldı mı'
										value={
											car.is_sold === 'SOLD'
												? 'Satıldı'
												: 'Satılmadı'
										}
									/>
									<CarDetailRow
										name='Marka'
										value={car.car_brand}
									/>
									<CarDetailRow
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
										<strong>Açıklama</strong>
									</Grid>
									<Grid item xs={12}>
										{car.car_description}
									</Grid>
								</>
							)}
						</>
					</Grid>
				</div>
			</Container>
		</>
	);
};

export default CarDetail;
