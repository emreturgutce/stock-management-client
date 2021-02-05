import React, { useState, useCallback } from 'react';
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
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { useAuthState } from '../hooks';
import { getUser } from '../actions';
import { BASE_URL } from '../constants';

const ProfileDetails = () => {
	const { user } = useAuthState();
	const [firstName, setFirstName] = useState(user?.first_name);
	const [lastName, setLastName] = useState(user?.last_name);
	const [email, setEmail] = useState(user?.email);
	const [gender, setGender] = useState(user?.gender);
	const [birthDate, setbirthDate] = useState(new Date(user?.birth_date));
	const dispatch = useDispatch();
	const getUserCb = useCallback(() => dispatch(getUser()), [dispatch]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		await fetch(`${BASE_URL}/api/personels/${user.id}`, {
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

		getUserCb();
	};

	return (
		<Page title='Profil'>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '70%',
						margin: '60px auto',
					}}
				>
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
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
												<option
													key='FEMALE'
													value='FEMALE'
												>
													Kadın
												</option>
											</TextField>
										</Grid>
									</Grid>
								</CardContent>
								<Divider />
								<Box
									display='flex'
									justifyContent='flex-end'
									p={2}
								>
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
					</div>
				</div>
			</MuiPickersUtilsProvider>
		</Page>
	);
};

export default ProfileDetails;
