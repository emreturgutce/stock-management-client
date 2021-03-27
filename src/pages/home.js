import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { loadCSS } from 'fg-loadcss';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import {
	createStyles,
	makeStyles,
	Button,
	Icon,
	Grid,
	Container,
	Tooltip,
	Link,
} from '@material-ui/core';
import { Refresh, HighlightOff } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { throttle } from 'lodash';
import { useCarState, useGetCars } from '../hooks';
import { formatPrice } from '../utils/format-price';
import Page from '../components/page';
import SearchInput from '../components/search-input';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexDirection: 'column',
			'& .ant-empty-img-1': {
				fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
			},
			'& .ant-empty-img-2': {
				fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
			},
			'& .ant-empty-img-3': {
				fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
			},
			'& .ant-empty-img-4': {
				fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
			},
			'& .ant-empty-img-5': {
				fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
				fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
			},
		},
		label: {
			marginTop: theme.spacing(1),
		},
	}),
);

function CustomNoRowsOverlay() {
	const classes = useStyles();

	return (
		<GridOverlay className={classes.root}>
			<svg
				width='120'
				height='100'
				viewBox='0 0 184 152'
				aria-hidden
				focusable='false'
			>
				<g fill='none' fillRule='evenodd'>
					<g transform='translate(24 31.67)'>
						<ellipse
							className='ant-empty-img-5'
							cx='67.797'
							cy='106.89'
							rx='67.797'
							ry='12.668'
						/>
						<path
							className='ant-empty-img-1'
							d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
						/>
						<path
							className='ant-empty-img-2'
							d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
						/>
						<path
							className='ant-empty-img-3'
							d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
						/>
					</g>
					<path
						className='ant-empty-img-3'
						d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
					/>
					<g
						className='ant-empty-img-4'
						transform='translate(149.65 15.383)'
					>
						<ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815' />
						<path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' />
					</g>
				</g>
			</svg>
			<div className={classes.label}>No Rows</div>
		</GridOverlay>
	);
}

const Home = () => {
	const getCarsCb = useGetCars();
	const { isLoading, cars } = useCarState();
	const [searchInput, setSearchInput] = useState('');
	const [carsState, setCarsState] = useState(cars);
	const [disableRefresh, setDisableRefresh] = useState(false);

	const data = {
		columns: [
			{ field: 'id', width: 300, hide: true },
			{
				field: 'image_url',
				headerName: 'Resim',
				width: 130,
				renderCell: (params) => (
					<Link
						to={params.getValue('id') || ''}
						style={{ display: 'flex' }}
						component={RouterLink}
					>
						<img
							src={params.value || '/araba2.jpg'}
							height={75}
							alt='araba'
							style={{ margin: 'auto' }}
						/>
					</Link>
				),
			},
			{
				field: 'title',
				headerName: 'Başlık',
				width: 350,
				renderCell: (params) => (
					<Tooltip title={`${params.value}`}>
						<Link
							component={RouterLink}
							to={params.getValue('id') || ''}
						>
							{params.value}
							<Icon
								color='primary'
								className='fas fa-external-link-alt'
								style={{
									fontSize: '.6rem',
									width: '1rem',
									marginLeft: 6,
								}}
							/>
						</Link>
					</Tooltip>
				),
			},
			{ field: 'model', headerName: 'Model', width: 120 },
			{
				field: 'sale_price',
				headerName: 'Satış Fiyatı',
				width: 140,
				valueFormatter: (params) => formatPrice(params.value),
			},
			{
				field: 'purchase_price',
				headerName: 'Alış Fiyatı',
				width: 140,
				valueFormatter: (params) => formatPrice(params.value),
			},
			{ field: 'year', width: 80, headerName: 'Yıl' },
			{
				field: 'is_new',
				headerName: 'Yeni Mi',
				width: 100,
				renderCell: (params) => (
					<span style={{ display: 'block', margin: 'auto' }}>
						{params.value === 'NEW' ? 'Sıfır' : 'İkinci el'}
					</span>
				),
			},
			{
				headerName: 'Satıldı Mı',
				field: 'is_sold',
				width: 100,
				renderCell: (params) =>
					params.value === 'SOLD' ? (
						<Tooltip title='Satıldı'>
							<svg
								focusable='false'
								viewBox='0 0 24 24'
								style={{ margin: 'auto' }}
								aria-hidden='true'
								width='24px'
								height='24px'
								fill='#4caf50'
							>
								<path d='M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z'></path>
							</svg>
						</Tooltip>
					) : (
						<Tooltip title='Satılmadı'>
							<HighlightOff
								style={{ fill: '#f44336', margin: 'auto' }}
							/>
						</Tooltip>
					),
			},
		],
		rows: carsState.map((car) => ({
			...car,
			id: car.car_id,
			image_url: car.image_urls?.split(';')[0],
		})),
	};

	useEffect(() => {
		setCarsState(
			cars.filter((car) => {
				const regex = new RegExp(`\\b${searchInput}`, 'ig');

				return car.title.match(regex);
			}),
		);
	}, [cars, searchInput]);

	useEffect(() => {
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css'),
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleRefresh = useCallback(
		throttle(
			() => {
				setDisableRefresh(true);
				setSearchInput('');
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
			},
			5000,
			{ trailing: false },
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[throttle],
	);

	return (
		<Page title='Anasayfa'>
			<Container style={{marginTop: '.5rem'}}>
				<Grid
					container
					direction='column'
					alignItems='center'
					justify='center'
				>
					<Grid
						item
						container
						direction='row'
						justify='space-between'
					>
						<Grid item>
							<SearchInput
								setSearchInput={setSearchInput}
								cars={cars}
								isLoading={isLoading}
							/>
						</Grid>
						<Grid item>
							<Tooltip title='Araba bilgilerini güncellemek için tıkla'>
								<Button
									variant='outlined'
									style={{
										marginRight: 5,
										width: '100%',
										height: '100%',
									}}
									disabled={disableRefresh}
									onClick={handleRefresh}
									startIcon={<Refresh />}
								>
									Yenile
								</Button>
							</Tooltip>
						</Grid>
					</Grid>
					<Grid
						item
						style={{
							height: 720,
							width: '100%',
							marginTop: '1rem',
						}}
					>
						<DataGrid
							components={{
								noRowsOverlay: CustomNoRowsOverlay,
							}}
							pageSize={5}
							rowHeight={120}
							loading={isLoading}
							{...data}
						/>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

export default Home;
