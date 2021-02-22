import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
	Container,
	Grid,
	Typography,
	TextField,
	Button,
} from '@material-ui/core';
import validator from 'validator';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const ChangePassword = () => {
	const [password, setPassword] = useState('');
	const [secondpassword, setSecondpassword] = useState('');
	const [sent, setSent] = useState(false);
	const { token } = useParams();
	const history = useHistory();
	const [disableClick, setDisableClick] = useState(false);

	const onSubmit = async (e) => {
		setDisableClick(true);
		e.preventDefault();

		const res = await fetch(
			`${BASE_URL}/api/personels/change-password/${token}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					password,
				}),
			},
		);

		if (res.ok) {
			setSent(true);
			history.push('/');
			toast.success('Şifreniz başarılı bir şekilde değiştirildi.', {
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
				'Şifre değiştirme işlemi başarısız lütfen tekrar deneyiniz.',
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

		setTimeout(() => {
			setDisableClick(false);
		}, 1000);
	};

	return (
		<Container
			maxWidth='xs'
			style={{
				marginTop: '16px',
				height: '70vh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item style={{ width: '100%' }}>
						<Typography variant='h5' style={{ fontWeight: 700 }}>
							Şifreyi Sıfırla
						</Typography>
					</Grid>
					<Grid item style={{ width: '100%' }}>
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
							onChange={(e) => setPassword(e.target.value)}
						/>
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
								!validator.isLength(secondpassword, {
									min: 6,
								}) &&
								secondpassword !== password
							}
							autoComplete='current-password'
							value={secondpassword}
							onChange={(e) => setSecondpassword(e.target.value)}
						/>
					</Grid>
					<Grid item style={{ width: '100%' }}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							disabled={sent || disableClick}
						>
							Şifreyi Sıfırla
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default ChangePassword;
