import { useState } from 'react';
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

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/personels/forgot-password`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				email,
			}),
		});

		if (res.ok) {
			toast.success(
				'Şifre sıfırlama kodu mailinize başarılı bir şekilde gönderildi.',
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
		} else {
			toast.error(
				`Bir hata oluştu kod gönderilemedi! Lütfen girdiğiniz maili 
				kontrol edip tekrar deneyiniz.`,
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
							Şifreni Sıfırla
						</Typography>
					</Grid>
					<Grid item style={{ width: '100%' }}>
						<p>
							Hesabına bağlı olan Email adresini gir ve biz
							Email'ine şifreni sıfırlaman için gerekli komutları
							göndereceğiz.
						</p>
					</Grid>
					<Grid item style={{ width: '100%' }}>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Adresi'
							name='email'
							autoComplete='email'
							autoFocus
							error={email !== '' && !validator.isEmail(email)}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<Grid item style={{ width: '100%' }}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
						>
							Kodu Gönder
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default ForgotPassword;
