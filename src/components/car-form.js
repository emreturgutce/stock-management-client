import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	Grid,
	Typography,
	TextField,
	Paper,
	Button,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
	Select,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { DropzoneArea } from 'material-ui-dropzone';
import { Save, Cancel } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useCarState, useAuthState } from '../hooks';
import { BASE_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 750,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

export default function CarForm({ car }) {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState(
		car ? car.enter_date : new Date(Date.now()),
	);
	const history = useHistory();
	const [title, setTitle] = useState(car ? car.title : '');
	const [description, setDescription] = useState(car ? car.description : '');
	const [salePrice, setSalePrice] = useState(
		car ? parseInt(car.sale_price, 10) : 0,
	);
	const [purchasePrice, setPurchasePrice] = useState(
		car ? parseInt(car.purchase_price, 10) : 0,
	);
	const [year, setYear] = useState(car ? car.year : 2020);
	const [model, setModel] = useState(car ? car.model : '');
	const [color, setColor] = useState(car ? car.car_color_code : '');
	const [is_new, setIs_new] = useState(car ? car.is_new === 'NEW' : '');
	const [manufacturer, setManufacturer] = useState(
		car ? car.car_manufacturer_id : '',
	);
	const [supplier, setSupplier] = useState(car ? car.supplier_id : '');
	const [files, setFiles] = useState([]);
	const { manufacturers, suppliers, colors } = useCarState();

	const {
		user: { id },
	} = useAuthState();

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const onSubmit = async () => {
		const formData = new FormData();
		formData.append('avatar', files[0]);

		const data = {
			title,
			sale_price: salePrice,
			purchase_price: purchasePrice,
			is_sold: 'NOT SOLD',
			description,
			model,
			year,
			is_new: is_new ? 'NEW' : 'NOT NEW',
			enter_date: selectedDate,
			supplier_id: supplier,
			car_manufacturer_id: manufacturer,
			car_color_code: color,
		};

		if (!car) {
			const res = await fetch(`${BASE_URL}/api/cars`, {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					...data,
					personel_id: id,
				}),
				method: 'POST',
			});

			const dataJson = await res.json();

			history.push('/');

			await axios.post(
				`${BASE_URL}/api/cars/${dataJson.data[0].id}/images`,
				formData,
				{
					headers: {
						'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
					},
					withCredentials: true,
				},
			);

			if (res.ok) {
				toast.success('Araba başarılı bir şekilde eklendi.', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.error(
					'Araba ekleme işlemi başarısız lütfen tekrar deneyiniz.',
					{
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					},
				);
			}
		} else {
			const res = await fetch(`${BASE_URL}/api/cars/${car.car_id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
				method: 'PUT',
			});

			if (res.ok) {
				toast.success('Araba başarılı bir şekilde güncellendi.', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				history.push('/');
			} else {
				toast.error(
					'Araba güncelleme işlemi başarısız lütfen tekrar deneyiniz.',
					{
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					},
				);
			}
		}
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Typography component='h1' variant='h4' align='center'>
					{car ? 'Araba Güncelle' : 'Araba Ekle'}
				</Typography>
				<Typography variant='h6' gutterBottom>
					Araba Bilgileri
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<TextField
							required
							id='title'
							name='title'
							label='Başlık'
							fullWidth
							autoComplete='title'
							variant='outlined'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id='outlined-description-static'
							label='Açıklama'
							multiline
							required
							rows={4}
							variant='outlined'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-amount'>
								Satış Fiyatı
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-amount'
								value={salePrice}
								required
								onChange={(e) => setSalePrice(e.target.value)}
								endAdornment={
									<InputAdornment position='end'>
										₺
									</InputAdornment>
								}
								labelWidth={60}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-amount'>
								Alış Fiyatı
							</InputLabel>
							<OutlinedInput
								required
								id='outlined-adornment-amount'
								value={purchasePrice}
								onChange={(e) =>
									setPurchasePrice(e.target.value)
								}
								endAdornment={
									<InputAdornment position='end'>
										₺
									</InputAdornment>
								}
								labelWidth={60}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={12}>
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
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							required
							id='outlined-basic'
							label='Yıl'
							variant='outlined'
							value={year}
							onChange={(e) => setYear(e.target.value)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							required
							id='outlined-basic'
							label='Model'
							variant='outlined'
							value={model}
							onChange={(e) => setModel(e.target.value)}
						/>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel htmlFor='filled-age-native-simple'>
								Yeni Mi?
							</InputLabel>
							<Select
								native
								required
								value={is_new}
								onChange={(e) => setIs_new(e.target.value)}
								inputProps={{
									name: 'is_new',
									id: 'filled-is_new-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								<option value={true}>Sıfır</option>
								<option value={false}>İkinci El</option>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel htmlFor='filled-age-native-simple'>
								Renk
							</InputLabel>
							<Select
								native
								required
								value={color}
								onChange={(e) => setColor(e.target.value)}
								inputProps={{
									name: 'color',
									id: 'filled-color-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								{colors.map((color) => (
									<option key={color.id} value={color.id}>
										{color.name}
									</option>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel htmlFor='filled-age-native-simple'>
								Üretici Firma
							</InputLabel>
							<Select
								fullWidth
								native
								required
								value={manufacturer}
								onChange={(e) =>
									setManufacturer(e.target.value)
								}
								inputProps={{
									name: 'manufacturer',
									id: 'filled-manufacturer-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								{manufacturers &&
									manufacturers.map((manufacturer) => (
										<option
											key={manufacturer.id}
											value={manufacturer.id}
										>
											{manufacturer.name}
										</option>
									))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth>
							<InputLabel htmlFor='filled-supplier-native-simple'>
								Tedarikçi
							</InputLabel>
							<Select
								variant='outlined'
								native
								required
								value={supplier}
								onChange={(e) => setSupplier(e.target.value)}
								inputProps={{
									name: 'supplier',
									id: 'filled-supplier-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								{suppliers &&
									suppliers.map((supplier) => (
										<option
											key={supplier.id}
											value={supplier.id}
										>
											{`${supplier.first_name} ${supplier.last_name}`}
										</option>
									))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<DropzoneArea
							acceptedFiles={[
								'image/jpg',
								'image/jpeg',
								'image/png',
							]}
							showFileNames
							onChange={(f) => setFiles(f)}
							dropzoneText='Resimleri buraya sürükleyin veya seçmek için tıklayın'
							showAlerts={false}
							filesLimit={20}
						/>
					</Grid>
				</Grid>

				<div className={classes.buttons}>
					<Button
						variant='outlined'
						color='primary'
						startIcon={<Cancel />}
						className={classes.button}
						onClick={handleCancel}
					>
						İptal et
					</Button>
					<Button
						variant='contained'
						color='secondary'
						startIcon={<Save />}
						className={classes.button}
						onClick={onSubmit}
					>
						Kaydet
					</Button>
				</div>
			</Paper>
		</main>
	);
}
