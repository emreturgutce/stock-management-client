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
} from '@material-ui/core';
import validator from 'validator';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Alert } from '@material-ui/lab';
import { useAuthState } from '../hooks';
import { BASE_URL } from '../constants';
import useRefresh from '../hooks/use-refresh';
import { getUser } from '../actions/auth/get-user';

const ProfileDetails = () => {
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

	const getUserCb = useCallback(() => dispatch(getUser()), [dispatch]);

	const handleSubmit = async (e) => {
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
			getUserCb();
			refresh();
		}
	};

	const handleSubmitPassword = async (e) => {
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
			getUserCb();
			refresh();
		}
	};

	const handleSubmitEmail = async (e) => {
		e.preventDefault();

		await fetch(`${BASE_URL}/api/personels/verify`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'GET',
			credentials: 'include',
		});
	};

	return (
		<Page title='Profil'>
			<Grid
				container
				direction='column'
				alignItems='center'
				justify='center'
				style={{ marginTop: '.5rem' }}
			>
				<Grid item md={9} style={{marginBottom: '1rem'}}>
					<form autoComplete='off' noValidate>
						<Card>
							<CardHeader
								subheader='Detay bilgileri değiştirilebilir.'
								title='Profil'
							/>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Ad'
											name='firstName'
											onChange={(e) =>
												setFirstName(e.target.value)
											}
											required
											value={firstName}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Soyad'
											name='lastName'
											onChange={(e) =>
												setLastName(e.target.value)
											}
											required
											value={lastName}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Email Adresi'
											name='email'
											onChange={(e) =>
												setEmail(e.target.value)
											}
											disabled={user?.verified}
											required
											value={email}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<KeyboardDatePicker
											fullWidth
											required
											inputVariant='outlined'
											format='dd.MM.yyyy'
											margin='auto'
											id='birth_date'
											label='Doğum Tarihi'
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
											label='Cinsiyet'
											name='gender'
											onChange={(e) =>
												setGender(e.target.value)
											}
											required
											select
											SelectProps={{ native: true }}
											value={gender}
											variant='outlined'
										>
											<option key='MALE' value='MALE'>
												Erkek
											</option>
											<option key='FEMALE' value='FEMALE'>
												Kadın
											</option>
										</TextField>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<Box display='flex' justifyContent='flex-end' p={2}>
								<Button
									color='primary'
									variant='contained'
									onClick={handleSubmit}
								>
									Detayları Kaydet
								</Button>
							</Box>
						</Card>
					</form>
				</Grid>
				<Grid item md={9} style={{ width: '100%' }}>
					<form
						autoComplete='off'
						noValidate
						style={{ width: '100%' }}
					>
						<Card>
							{!user.verified && (
								<Alert
									severity='warning'
									action={
										<Button
											color='inherit'
											size='small'
											onClick={handleSubmitEmail}
										>
											Onaylama e-mail'i gönder
										</Button>
									}
								>
									Şifreni değiştirebilmen için e-mail adresini
									onaylaman gerek.
								</Alert>
							)}

							<CardHeader
								subheader='Şifreni buradan değiştirebilirsin'
								title='Şifreni Değiştir'
							/>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											variant='outlined'
											margin='normal'
											required
											fullWidth
											name='password'
											label='Şifre'
											type='password'
											id='password'
											error={
												password !== '' &&
												!validator.isLength(password, {
													min: 6,
												})
											}
											autoComplete='current-password'
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											variant='outlined'
											margin='normal'
											required
											fullWidth
											name='secondpassword'
											label='Şifre Tekrar'
											type='password'
											id='secondpassword'
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
											autoComplete='current-password'
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
							<Box display='flex' justifyContent='flex-end' p={2}>
								<Button
									color='primary'
									variant='contained'
									onClick={handleSubmitPassword}
									disabled={!user?.verified}
								>
									Şifreyi Kaydet
								</Button>
							</Box>
						</Card>
					</form>
				</Grid>
			</Grid>
		</Page>
	);
};

export default ProfileDetails;
