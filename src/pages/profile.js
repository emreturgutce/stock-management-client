import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Page from '../components/page';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	Container,
	Tooltip,
	makeStyles,
	ListItemIcon,
	Dialog,
	DialogTitle,
	Typography,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import validator from 'validator';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Alert } from '@material-ui/lab';
import { VerifiedUser, VpnKey, LocationOn, Explore } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useAuthState } from '../hooks';
import { BASE_URL } from '../constants';
import useRefresh from '../hooks/use-refresh';
import { getUser } from '../actions/auth/get-user';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

const ProfileDetails = () => {
	const classes = useStyles();
	const { user } = useAuthState();
	const [firstName, setFirstName] = useState(user?.first_name);
	const [lastName, setLastName] = useState(user?.last_name);
	const [email, setEmail] = useState(user?.email);
	const [gender, setGender] = useState(user?.gender);
	const [birthDate, setbirthDate] = useState(new Date(user?.birth_date));
	const [password, setPassword] = useState('');
	const [secondpassword, setSecondpassword] = useState('');
	const history = useHistory();
	const refresh = useRefresh(history, '/personels/profile');
	const dispatch = useDispatch();
	const [disableClick, setDisableClick] = useState(false);
	const [openLogoutAll, setOpenLogoutAll] = useState(false);

	const getUserCb = useCallback(() => dispatch(getUser()), [dispatch]);

	const handleLogoutAllClose = () => setOpenLogoutAll(false);

	const handleLogoutAllAction = async () => {
		const res = await fetch(
			`${BASE_URL}/api/personels/expire-session/current`,
			{
				method: 'GET',
				credentials: 'include',
			},
		);

		if (res.ok) {
			toast.success('Bütün oturumlar başarılı bir şekilde kapatıldı.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error('Bütün oturumları kapatma sırasında bir hata oluştu.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

		getUserCb();
		history.push('/login');
	};

	const handleSubmit = async (e) => {
		setDisableClick(true);
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/personels/current`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email,
				gender,
				birth_date: birthDate,
			}),
		});

		if (res.ok) {
			toast.success('Detay bilgileri başarılı bir şekilde güncellendi.', {
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
				'Detay bilgileri güncelleme işlemi işlemi başarısız lütfen tekrar deneyiniz.',
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

		getUserCb();
		refresh();

		setTimeout(() => {
			setDisableClick(false);
		}, 1000);
	};

	const handleSubmitPassword = async (e) => {
		setDisableClick(true);
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/personels/change-password`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				password,
			}),
		});

		if (res.ok) {
			toast.success('Şifre başarılı bir şekilde güncellendi.', {
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
				'Şifre güncelleme işlemi başarısız lütfen tekrar deneyiniz.',
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

		getUserCb();
		refresh();

		setTimeout(() => {
			setDisableClick(false);
		}, 1000);
	};

	const handleSubmitEmail = async (e) => {
		setDisableClick(true);
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/personels/verify`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'GET',
			credentials: 'include',
		});

		if (res.ok) {
			toast.success('Onaylama maili başarılı bir şekilde gönderildi.', {
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
				'Onaylama maili gönderirken bir hata oluştu lütfen tekrar deneyiniz.',
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

		getUserCb();
		refresh();

		setTimeout(() => {
			setDisableClick(false);
		}, 1000);
	};

	const getLastLogins = () => {
		return user.lastLogins
			?.sort((a, b) => Number(a.lastLogin) - Number(b.lastLogin))
			.map((lastLogin) => (
				<>
					<ListItem button>
						<ListItemIcon>
							<LocationOn />
						</ListItemIcon>
						<ListItemText
							primary={`${lastLogin.geo?.city || 'Bilinmiyor'}`}
							secondary={`${moment(
								+lastLogin.lastLogin,
							).fromNow()} - ${lastLogin.ip} ${
								lastLogin.agent ? `- ${lastLogin.agent}` : ''
							}`}
						/>
					</ListItem>
					<Divider />
				</>
			));
	};

	return (
		<Page title="Profil">
			<Container>
				<Grid
					container
					direction="column"
					alignItems="center"
					justify="center"
					style={{ marginTop: '.5rem' }}
				>
					<Grid item style={{ marginBottom: '1rem', width: '100%' }}>
						<form autoComplete="off">
							<Card>
								<CardHeader
									subheader="Detay bilgileri değiştirilebilir."
									title="Profil"
									titleTypographyProps={{
										style: {
											color: 'rgba(0, 0, 0, 0.54)',
											fontSize: '1rem',
											fontWeight: 500,
											lineHeight: 1.6,
											letterSpacing: '0.0075em',
										},
									}}
									avatar={
										user?.verified && (
											<Tooltip title="Onaylanmış kullanıcı">
												<VerifiedUser
													style={{ color: '#4caf50' }}
												/>
											</Tooltip>
										)
									}
								/>
								<Divider />
								<CardContent>
									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Ad"
												name="firstName"
												onChange={(e) =>
													setFirstName(e.target.value)
												}
												required
												value={firstName}
												variant="outlined"
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Soyad"
												name="lastName"
												onChange={(e) =>
													setLastName(e.target.value)
												}
												required
												value={lastName}
												variant="outlined"
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Email Adresi"
												name="email"
												onChange={(e) =>
													setEmail(e.target.value)
												}
												disabled={user?.verified}
												required
												value={email}
												variant="outlined"
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<KeyboardDatePicker
												fullWidth
												required
												inputVariant="outlined"
												format="dd.MM.yyyy"
												margin="auto"
												id="birth_date"
												label="Doğum Tarihi"
												value={birthDate}
												lang
												onChange={(date) =>
													setbirthDate(date)
												}
												KeyboardButtonProps={{
													'aria-label': 'change date',
												}}
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												fullWidth
												label="Cinsiyet"
												name="gender"
												onChange={(e) =>
													setGender(e.target.value)
												}
												required
												select
												SelectProps={{ native: true }}
												value={gender}
												variant="outlined"
											>
												<option key="MALE" value="MALE">
													Erkek
												</option>
												<option
													key="FEMALE"
													value="FEMALE"
												>
													Kadın
												</option>
											</TextField>
										</Grid>
									</Grid>
								</CardContent>
								<Divider />
								<Box
									display="flex"
									justifyContent="flex-end"
									p={2}
								>
									<Button
										color="primary"
										variant="outlined"
										disabled={disableClick}
										onClick={handleSubmit}
									>
										Detayları Kaydet
									</Button>
								</Box>
							</Card>
						</form>
					</Grid>
					<Grid item style={{ marginBottom: '1rem', width: '100%' }}>
						<form autoComplete="off" style={{ width: '100%' }}>
							<Card>
								{!user.verified && (
									<Alert
										severity="warning"
										action={
											<Button
												color="inherit"
												size="small"
												disabled={disableClick}
												onClick={handleSubmitEmail}
											>
												Onaylama e-mail'i gönder
											</Button>
										}
									>
										Şifreni değiştirebilmen için e-mail
										adresini onaylaman gerek.
									</Alert>
								)}

								<CardHeader
									subheader="Şifreni buradan değiştirebilirsin"
									titleTypographyProps={{
										style: {
											color: 'rgba(0, 0, 0, 0.54)',
											fontSize: '1rem',
											fontWeight: 500,
											lineHeight: 1.6,
											letterSpacing: '0.0075em',
										},
									}}
									title="Şifreni Değiştir"
									avatar={
										<VpnKey style={{ fill: '#1769aa' }} />
									}
								/>
								<Divider />
								<CardContent>
									<Grid container spacing={3}>
										<Grid item md={6} xs={12}>
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												name="password"
												label="Şifre"
												type="password"
												id="password"
												disabled={!user?.verified}
												error={
													password !== '' &&
													!validator.isLength(
														password,
														{
															min: 6,
														},
													)
												}
												autoComplete="current-password"
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<TextField
												variant="outlined"
												margin="normal"
												required
												fullWidth
												name="secondpassword"
												label="Şifre Tekrar"
												type="password"
												id="secondpassword"
												disabled={!user?.verified}
												error={
													secondpassword !== '' &&
													!validator.isLength(
														secondpassword,
														{
															min: 6,
														},
													) &&
													secondpassword !== password
												}
												autoComplete="current-password"
												value={secondpassword}
												onChange={(e) =>
													setSecondpassword(
														e.target.value,
													)
												}
											/>
										</Grid>
									</Grid>
								</CardContent>
								<Divider />
								<Box
									display="flex"
									justifyContent="flex-end"
									p={2}
								>
									<Button
										color="primary"
										variant="outlined"
										onClick={handleSubmitPassword}
										disabled={
											!user?.verified || disableClick
										}
									>
										Şifreyi Kaydet
									</Button>
								</Box>
							</Card>
						</form>
					</Grid>
					<Grid item style={{ width: '100%' }}>
						<Card>
							<CardHeader
								id="all-sessions-header"
								subheader="Bu hesaba son zamanlarda giriş yaptığın tarihler."
								title="Son Girişler"
								titleTypographyProps={{
									style: {
										color: 'rgba(0, 0, 0, 0.54)',
										fontSize: '1rem',
										fontWeight: 500,
										lineHeight: 1.6,
										letterSpacing: '0.0075em',
									},
								}}
								avatar={<Explore style={{ fill: '#1769aa' }} />}
								action={
									<>
										<Button
											style={{
												textTransform: 'none',
											}}
											disableElevation
											color="secondary"
											variant="outlined"
											onClick={() =>
												setOpenLogoutAll(true)
											}
										>
											Bütün Oturumları Kapat
										</Button>

										<Dialog
											open={openLogoutAll}
											onClose={handleLogoutAllClose}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
										>
											<DialogTitle id="alert-dialog-title">
												<Typography variant="p">
													Tüm oturumlar kapatılsın mı
													?
												</Typography>
											</DialogTitle>
											<DialogContent>
												<DialogContentText id="alert-dialog-description">
													Personelin giriş yapmış
													olduğu tüm oturumlar
													kapatılacak ve bir daha
													giriş yapması gerekecek.
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<Button
													onClick={
														handleLogoutAllClose
													}
													color="primary"
												>
													Reddet
												</Button>
												<Button
													color="primary"
													autoFocus
													onClick={
														handleLogoutAllAction
													}
												>
													Kabul Et
												</Button>
											</DialogActions>
										</Dialog>
									</>
								}
							/>
							<Divider />
							<CardContent>
								<List
									component="nav"
									className={classes.root}
									aria-label="contacts"
								>
									{getLastLogins()}
								</List>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
};

export default ProfileDetails;
