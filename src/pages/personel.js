import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCSS } from 'fg-loadcss';
import {
	Container,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Icon,
	Chip,
	Divider,
	Card,
	Box,
	CardHeader,
	Tooltip,
	IconButton,
	Dialog,
	DialogTitle,
	Typography,
	DialogActions,
	Button,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { ImportExport, Delete } from '@material-ui/icons';
import Page from '../components/page';
import { useCarState } from '../hooks';
import { getPersonnels } from '../actions';
import { BASE_URL } from '../constants';

const Personel = () => {
	const dispatch = useDispatch();
	const { personnels } = useCarState();
	const [openStock, setOpenStock] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const getPersonnelsCb = useCallback(() => dispatch(getPersonnels()), [
		dispatch,
	]);

	const handleStockClose = () => setOpenStock(false);
	const handleDeleteClose = () => setOpenDelete(false);

	useEffect(() => {
		getPersonnelsCb();

		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css'),
		);

		return () => {
			node.parentNode.removeChild(node);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleConfirmAction = async (type, personnelId) => {
		let res;

		if (type === 'ENHANCE') {
			res = await fetch(
				`${BASE_URL}/api/personels/${personnelId}/role-enhance`,
				{
					credentials: 'include',
					method: 'GET',
				},
			);
		} else {
			res = await fetch(
				`${BASE_URL}/api/personels/${personnelId}/role-drop`,
				{
					credentials: 'include',
					method: 'GET',
				},
			);
		}

		if (res.ok) {
			toast.success(
				`Personelin rolü başarılı bir şekilde ${
					type === 'ENHANCE' ? 'yükseltildi' : 'düşürüldü'
				}`,
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
			toast.error(
				`Personel rol ${
					type === 'ENHANCE' ? 'yükseltme' : 'düşürme'
				} işlemi sırasında bir hata oluştu`,
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

		getPersonnelsCb();
		handleStockClose();
	};

	const handleDeleteAction = async (personnelId) => {
		const res = await fetch(`${BASE_URL}/api/personels/${personnelId}`, {
			credentials: 'include',
			method: 'DELETE',
		});

		if (res.ok) {
			toast.success('Personel başarılı bir şekilde silindi', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error('Personel silme işlemi sırasında bir hata oluştu', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		}

		getPersonnelsCb();
		handleStockClose();
	};

	return (
		<Page title='Personeller'>
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
							<CardHeader title='Personeller' />
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
											<b>Adı</b>
										</TableCell>
										<TableCell>
											<b>Maili</b>
										</TableCell>
										<TableCell>
											<b>Rolü</b>
										</TableCell>
										<TableCell>
											<b>İşe Başlama Tarihi</b>
										</TableCell>
										<TableCell> </TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{personnels.map((personnel) => (
										<TableRow hover key={personnel.title}>
											<TableCell>
												{`${personnel.first_name} ${personnel.last_name}`}
											</TableCell>
											<TableCell>
												{personnel.email}
											</TableCell>
											<TableCell>
												{personnel.role === 'ADMIN' ? (
													<Chip
														label='Admin'
														variant='outlined'
														size='small'
														color='primary'
														icon={
															<Icon
																color='primary'
																className='fas fa-user-shield'
																style={{
																	fontSize:
																		'.8rem',
																	width:
																		'1.2rem',
																	marginLeft: 10,
																}}
															/>
														}
													/>
												) : (
													<Chip
														label='Personel'
														variant='outlined'
														size='small'
														color='primary'
														icon={
															<Icon
																className='fas fa-user'
																style={{
																	fontSize:
																		'.8rem',
																	width:
																		'1.2rem',
																	marginLeft: 10,
																}}
															/>
														}
													/>
												)}
											</TableCell>
											<TableCell>
												{new Date(
													personnel.hire_date,
												).toLocaleDateString('tr-TR')}
											</TableCell>
											<TableCell>
												{personnel.role === 'ADMIN' ? (
													<>
														<Tooltip title='Personelin rolünü düşür'>
															<IconButton
																edge='start'
																color='inherit'
																aria-label='menu'
																onClick={() =>
																	setOpenStock(
																		true,
																	)
																}
															>
																<ImportExport
																	style={{
																		fill:
																			'#4caf50',
																	}}
																	fontSize='small'
																/>
															</IconButton>
														</Tooltip>
														<Dialog
															open={openStock}
															onClose={
																handleStockClose
															}
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
																			'DROP',
																			personnel.id,
																		);
																	}}
																>
																	Evet
																</Button>
															</DialogActions>
														</Dialog>
													</>
												) : (
													<>
														<Tooltip title='Personelin rolünü arttır'>
															<IconButton
																edge='start'
																color='inherit'
																aria-label='menu'
																onClick={() =>
																	setOpenStock(
																		true,
																	)
																}
															>
																<ImportExport
																	style={{
																		fill:
																			'#4caf50',
																	}}
																	fontSize='small'
																/>
															</IconButton>
														</Tooltip>
														<Dialog
															open={openStock}
															onClose={
																handleStockClose
															}
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
																			'ENHANCE',
																			personnel.id,
																		);
																	}}
																>
																	Evet
																</Button>
															</DialogActions>
														</Dialog>
													</>
												)}

												<Tooltip title='Personeli sil'>
													<IconButton
														edge='start'
														color='inherit'
														aria-label='menu'
														onClick={() => {
															setOpenDelete(true);
														}}
													>
														<Delete
															style={{
																fill: '#f44336',
															}}
															fontSize='small'
														/>
													</IconButton>
												</Tooltip>
												<Dialog
													open={openDelete}
													onClose={handleDeleteClose}
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
														<Button color='primary'>
															Hayır
														</Button>
														<Button
															color='primary'
															autoFocus
															onClick={() => {
																handleDeleteAction(
																	personnel.id,
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

export default Personel;
