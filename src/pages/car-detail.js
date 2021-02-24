import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
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
	Box,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import ContentLoader from 'react-content-loader';
import { BASE_URL } from '../constants';
import Loader from '../components/content-loader';
import CarDetailRow from '../components/car-detail-row';
import Page from '../components/page';
import { useCarState, useAuthState, useGetCars } from '../hooks';
import { formatPrice } from '../utils/format-price';
import DetailDropdown from '../components/detail-dropdown';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			paddingTop: '1rem',
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
	const history = useHistory();
	const [car, setCar] = useState(null);
	const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
	const getCarsCb = useGetCars();
	const [disableRefresh, setDisableRefresh] = useState(false);

	useEffect(() => {
		setCar(cars.find((car) => car?.car_id === id));
	}, [cars, setCar, id]);

	const handleDateChange = (date) => {
		setSelectedDate(new Date(date).toISOString().split('T')[0]);
	};

	const handleClose = () => setOpen(false);

	const handleStockClose = () => setOpenStock(false);

	const handleRefresh = () => {
		setDisableRefresh(true);
		getCarsCb();
		toast.info('Araba bilgileri güncellendi.', {
			position: 'top-center',
			autoclose: 5000,
			hideprogressbar: false,
			closeonclick: true,
			pauseonhover: true,
			draggable: true,
			progress: undefined,
		});
		setTimeout(() => {
			setDisableRefresh(false);
		}, 1000);
	};

	const onSubmit = async () => {
		const res = await fetch(`${BASE_URL}/api/sales`, {
			method: 'POST',
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				birth_date: new Date(Date.now()),
				serial_number: Math.floor(Math.random() * 10000),
				price: car?.sale_price,
				personel_id: user?.id,
				car_id: car?.car_id,
				sale_date: selectedDate,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		handleClose();

		if (res.ok) {
			toast.success('Araba satış işlemi başarılı.', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(
				'Araba satış işlemi başarısız lütfen tekrar deneyiniz.',
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
		}

		getCarsCb();
	};

	const handleRemoveStock = async () => {
		const res = await fetch(`${BASE_URL}/api/cars/${car?.car_id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		handleStockClose();

		if (res.ok) {
			toast.success('Araba stoktan başarılı bir şekilde kaldırıldı.', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(
				'Araba stoktan kaldırılırken bir hata oluştu lütfen tekrar deneyiniz.',
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
		}

		history.push('/');
	};

	const handleEditClick = () => history.push(`/${car?.id}/edit`, { car });

	const handleDelete = () => setOpenStock(true);

	const handleSell = () => setOpen(true);

	return (
		<Page title={car?.title || ''}>
			<Container maxWidth='lg'>
				<div className={classes.root}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{isLoading ? (
								<ContentLoader
									speed={2}
									width={350}
									height={30}
									viewBox='0 0 350 30'
									backgroundColor='#f3f3f3'
									foregroundColor='#ecebeb'
								>
									<rect
										x='0'
										y='0'
										rx='3'
										ry='3'
										width='350'
										height='30'
									/>
								</ContentLoader>
							) : (
								<Typography variant='h5' component='h5'>
									{car?.title}
								</Typography>
							)}
						</Grid>
						<Grid item md={7} xs={12}>
							<Box component='div' paddingRight='1rem'>
								{isLoading ? (
									<ContentLoader
										speed={2}
										width='100%'
										height='100%'
										viewBox='0 0 680 650'
										backgroundColor='#f3f3f3'
										foregroundColor='#ecebeb'
									>
										<rect
											x='0'
											y='0'
											rx='3'
											ry='3'
											width='680'
											height='480'
										/>
										<rect
											x='50'
											y='500'
											rx='3'
											ry='3'
											width='80'
											height='80'
										/>
										<rect
											x='170'
											y='500'
											rx='3'
											ry='3'
											width='80'
											height='80'
										/>
										<rect
											x='290'
											y='500'
											rx='3'
											ry='3'
											width='80'
											height='80'
										/>
									</ContentLoader>
								) : (
									<Carousel>
										{car?.image_urls
											?.split(';')
											.map((image) => (
												<div>
													<img
														src={`${image}`}
														key={image}
														width='100%'
														alt={`${car?.title}`}
													/>
												</div>
											)) || (
											<div>
												<img
													src={'/araba2.jpg'}
													width='100%'
													alt={`${car?.title}`}
												/>
											</div>
										)}
									</Carousel>
								)}
							</Box>
						</Grid>
						<>
							<Grid item md={5} xs={12}>
								<Grid container>
									<Grid item xs={4}>
										{isLoading ? (
											<ContentLoader
												speed={2}
												width={150}
												height={20}
												viewBox='0 0 150 20'
												backgroundColor='#f3f3f3'
												foregroundColor='#ecebeb'
											>
												<rect
													x='0'
													y='0'
													rx='3'
													ry='3'
													width='150'
													height='20'
												/>
											</ContentLoader>
										) : (
											<Typography
												variant='h6'
												component='h6'
											>
												{formatPrice(car?.sale_price)}
											</Typography>
										)}
									</Grid>
									<Grid item xs={8}>
										<Grid
											container
											justify='flex-end'
											alignItems='center'
											spacing={1}
										>
											<DetailDropdown
												isSold={car?.is_sold}
												handleRefresh={handleRefresh}
												handleEdit={handleEditClick}
												handleDelete={handleDelete}
												handleSell={handleSell}
												carId={car?.car_id}
												disableRefresh={disableRefresh}
											/>

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
										key={car?.enter_date}
										name={'Giriş tarihi'}
										value={
											car &&
											new Date(
												car.enter_date,
											).toLocaleDateString('tr-TR')
										}
									/>
									<CarDetailRow
										key={car?.car_brand}
										name='Marka'
										value={car?.car_brand}
									/>
									<CarDetailRow
										key={car?.model}
										name={'Model'}
										value={car?.model}
									/>
									<CarDetailRow
										key={car?.year}
										name={'Yıl'}
										value={car?.year}
									/>
									<CarDetailRow
										key={car?.car_color}
										name='Renk'
										value={car?.car_color}
									/>
									<CarDetailRow
										key={car?.is_new}
										name={'Yeni mi'}
										value={
											car?.is_new === 'NEW'
												? 'Sıfır'
												: 'İkinci el'
										}
									/>
									<CarDetailRow
										key={car?.purchase_price}
										name='Stoğa Giriş Fiyatı'
										value={formatPrice(car?.purchase_price)}
									/>
									<CarDetailRow
										key={car?.is_sold}
										name='Satıldı mı'
										value={
											car?.is_sold === 'SOLD'
												? 'Satıldı'
												: 'Satılmadı'
										}
									/>
									<CarDetailRow
										key={car?.first_name}
										name='Personel İsmi'
										value={`${car?.first_name} ${car?.last_name}`}
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
											{car?.car_description}
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
