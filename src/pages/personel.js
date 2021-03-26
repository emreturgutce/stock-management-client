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
	DialogContent,
	DialogContentText,
	TextField,
	FormControl,
	InputLabel,
	Select,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { ImportExport, Delete, ExitToApp } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Page from '../components/page';
import { useCarState } from '../hooks';
import { getPersonnels } from '../actions';
import { BASE_URL } from '../constants';
import moment from 'moment';

const Personel = () => {
	const dispatch = useDispatch();
	const { personnels } = useCarState();
	const [openStock, setOpenStock] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openExpire, setOpenExpire] = useState(false);
	const [first_name, setFirstname] = useState('');
	const [last_name, setLastname] = useState('');
	const [birth_date, setBirthDate] = useState(new Date(Date.now()));
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [gender, setGender] = useState('');
	const [hire_date, setHireDate] = useState(new Date(Date.now()));
	const [role, setRole] = useState('');
	const [openPersonel, setOpenPersonel] = useState(false);
	const [step, setStep] = useState(0);
	const getPersonnelsCb = useCallback(() => dispatch(getPersonnels()), [
		dispatch,
	]);

	const handleStockClose = () => setOpenStock(false);
	const handleDeleteClose = () => setOpenDelete(false);
	const handleExpireClose = () => setOpenExpire(false);
	const handlePersonelClose = () => setOpenPersonel(false);
	const handleHireDateChange = (date) =>
		setHireDate(new Date(date).toISOString().split('T')[0]);
	const handleDateChange = (date) =>
		setBirthDate(new Date(date).toISOString().split('T')[0]);

	const handleNext = () => {
		if (step < 1) {
			setStep(step + 1);
		}
	};

	const handlePrevious = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

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

	const getLastLogin = (lastLogins) => {
		return lastLogins.length > 0
			? moment(+lastLogins[lastLogins.length - 1]?.lastLogin).fromNow()
			: 'Yok';
	};

	const submitPersonel = async (e) => {
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/personels`, {
			method: 'POST',
			body: JSON.stringify({
				first_name,
				last_name,
				birth_date,
				email,
				password,
				gender,
				hire_date,
				role,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (res.ok) {
			toast.success('Personel başarılı bir şekilde eklendi.', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});

			setOpenPersonel(false);
		} else {
			toast.error('Personel ekleme işlemi sırasında bir hata oluştu.', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const handleExpireAction = async (personnelId) => {
		const res = await fetch(
			`${BASE_URL}/api/personels/expire-session/${personnelId}`,
			{
				credentials: 'include',
				method: 'GET',
			},
		);

		if (res.ok) {
			toast.success(
				'Kullanıcının bütün oturumları başarılı bir şekilde kapatıldı',
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
			toast.error('Oturum sonlandırma işlemi sırasında bir hata oluştu', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});
		}

		handleExpireClose();
	};

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
		<Page title="Personeller">
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
								id="personel-header"
								title="Personeller"
								action={
									<Button
										style={{ textTransform: 'none' }}
										disableElevation
										color="primary"
										variant="outlined"
										onClick={() => setOpenPersonel(true)}
									>
										Personel Ekle
									</Button>
								}
							/>
							<Dialog
								open={openPersonel}
								onClose={handlePersonelClose}
								aria-labelledby="form-dialog-title"
							>
								<DialogTitle id="form-dialog-title">
									Personel Ekleme
								</DialogTitle>
								<DialogContent>
									{step === 0 && (
										<>
											<TextField
												autoFocus
												margin="dense"
												id="personel"
												label="Ad"
												fullWidth
												variant="outlined"
												value={first_name}
												onChange={(e) =>
													setFirstname(e.target.value)
												}
											/>
											<TextField
												margin="dense"
												id="personel"
												label="Soyad"
												fullWidth
												variant="outlined"
												value={last_name}
												onChange={(e) =>
													setLastname(e.target.value)
												}
											/>
											<FormControl
												variant="outlined"
												fullWidth
												className="personel-select"
											>
												<InputLabel>
													Cinsiyet
												</InputLabel>
												<Select
													native
													required
													value={gender}
													onChange={(e) =>
														setGender(
															e.target.value,
														)
													}
												>
													<option
														aria-label="None"
														value=""
													/>
													<option value="MALE">
														Erkek
													</option>
													<option value="FEMALE">
														Kadın
													</option>
												</Select>
											</FormControl>
											<KeyboardDatePicker
												fullWidth
												required
												disableToolbar
												inputVariant="outlined"
												format="MM/dd/yyyy"
												margin="normal"
												id="enter_date"
												label="Doğum Tarihi"
												value={birth_date}
												className="personel-date"
												onChange={handleDateChange}
												KeyboardButtonProps={{
													'aria-label': 'change date',
												}}
											/>
										</>
									)}
									{step === 1 && (
										<>
											<TextField
												autoFocus
												margin="dense"
												id="personel"
												label="Email"
												type="email"
												fullWidth
												variant="outlined"
												value={email}
												onChange={(e) =>
													setEmail(e.target.value)
												}
											/>
											<TextField
												margin="dense"
												id="personel"
												label="Şifre"
												fullWidth
												type="password"
												variant="outlined"
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
											/>
											<FormControl
												variant="outlined"
												fullWidth
												className="personel-select"
											>
												<InputLabel>Rol</InputLabel>
												<Select
													native
													required
													value={role}
													onChange={(e) =>
														setRole(e.target.value)
													}
												>
													<option
														aria-label="None"
														value=""
													/>
													<option value="PERSONNEL">
														Personel
													</option>
													<option value="ADMIN">
														Admin
													</option>
												</Select>
											</FormControl>
											<KeyboardDatePicker
												fullWidth
												required
												disableToolbar
												inputVariant="outlined"
												format="MM/dd/yyyy"
												className="personel-date"
												margin="normal"
												id="enter_date"
												label="İşe Başlama Tarihi"
												value={hire_date}
												onChange={handleHireDateChange}
												KeyboardButtonProps={{
													'aria-label': 'change date',
												}}
											/>
										</>
									)}
								</DialogContent>
								<DialogActions
									style={{
										marginRight: '24px',
										marginLeft: '24px',
										padding: '16px 0'
									}}
								>
									{step === 1 && (
										<Button
											onClick={handlePrevious}
											color="primary"
											variant="outlined"
										>
											Geri
										</Button>
									)}
									{step === 0 && (
										<Button
											onClick={handleNext}
											color="primary"
											variant="outlined"
										>
											Sonraki
										</Button>
									)}
									{step === 1 && (
										<Button
											onClick={submitPersonel}
											color="primary"
											variant="contained"
										>
											Kabul Et
										</Button>
									)}
								</DialogActions>
							</Dialog>

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
										<TableCell>Adı</TableCell>
										<TableCell>Maili</TableCell>
										<TableCell>Rolü</TableCell>
										<TableCell>
											İşe Başlama Tarihi
										</TableCell>
										<TableCell>Sisteme Son Giriş</TableCell>
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
														label="Admin"
														variant="outlined"
														size="small"
														color="primary"
														icon={
															<Icon
																color="primary"
																className="fas fa-user-shield"
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
														label="Personel"
														variant="outlined"
														size="small"
														color="primary"
														icon={
															<Icon
																className="fas fa-user"
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
												{getLastLogin(
													personnel.lastLogins,
												)}
											</TableCell>
											<TableCell>
												<Tooltip title="Bütün hesaplardan çıkış yap">
													<IconButton
														edge="start"
														color="inherit"
														aria-label="menu"
														onClick={() =>
															setOpenExpire(true)
														}
													>
														<ExitToApp
															fontSize="small"
															style={{
																color:
																	'#1769aa',
															}}
														/>
													</IconButton>
												</Tooltip>
												<Dialog
													open={openExpire}
													onClose={handleExpireClose}
													aria-labelledby="alert-dialog-title"
													aria-describedby="alert-dialog-description"
												>
													<DialogTitle id="alert-dialog-title">
														<Typography variant="p">
															Tüm oturumlar
															sonlandırılsın mı ?
														</Typography>
													</DialogTitle>
													<DialogContent>
														<DialogContentText id="alert-dialog-description">
															Personelin tüm
															oturumları
															sonlandırılacak. Ve
															personel sisteme bir
															daha giriş yapmak
															zorunda kalacak.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button
															onClick={
																handleExpireClose
															}
															color="primary"
														>
															Reddet
														</Button>
														<Button
															color="primary"
															autoFocus
															onClick={() => {
																handleExpireAction(
																	personnel.id,
																);
															}}
														>
															Kabul Et
														</Button>
													</DialogActions>
												</Dialog>
												{personnel.role === 'ADMIN' ? (
													<>
														<Tooltip title="Personelin rolünü düşür">
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
																<ImportExport
																	style={{
																		color:
																			'#1769aa',
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
																	Rol
																	düşürülsün
																	mü ?
																</Typography>
															</DialogTitle>
															<DialogContent>
																<DialogContentText id="alert-dialog-description">
																	Admin
																	personelinin
																	rolü normal
																	personel
																	seviyesi
																	düşürülecek.
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
																			'DROP',
																			personnel.id,
																		);
																	}}
																>
																	Kabul Et
																</Button>
															</DialogActions>
														</Dialog>
													</>
												) : (
													<>
														<Tooltip title="Personelin rolünü arttır">
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
																<ImportExport
																	fontSize="small"
																	style={{
																		color:
																			'#1769aa',
																	}}
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
																	Rol
																	yükseltilsin
																	mi ?
																</Typography>
															</DialogTitle>
															<DialogContent>
																<DialogContentText id="alert-dialog-description">
																	Normal
																	personelin
																	rolü admin
																	personel
																	seviyesi
																	yükseltilecek.
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
																			'ENHANCE',
																			personnel.id,
																		);
																	}}
																>
																	Kabul Et
																</Button>
															</DialogActions>
														</Dialog>
													</>
												)}

												<Tooltip title="Personeli sil">
													<IconButton
														edge="start"
														color="inherit"
														aria-label="menu"
														onClick={() => {
															setOpenDelete(true);
														}}
													>
														<Delete
															fontSize="small"
															style={{
																color:
																	'#1769aa',
															}}
														/>
													</IconButton>
												</Tooltip>
												<Dialog
													open={openDelete}
													onClose={handleDeleteClose}
													aria-labelledby="alert-dialog-title"
													aria-describedby="alert-dialog-description"
												>
													<DialogTitle id="alert-dialog-title">
														<Typography variant="p">
															Personel silinsin mi
															?
														</Typography>
													</DialogTitle>
													<DialogContent>
														<DialogContentText id="alert-dialog-description">
															Personelin tüm
															bilgileri kalıcı
															olarak silinecek.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button color="primary">
															Reddet
														</Button>
														<Button
															color="primary"
															autoFocus
															onClick={() => {
																handleDeleteAction(
																	personnel.id,
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
				</Grid>
			</Container>
		</Page>
	);
};

export default Personel;
