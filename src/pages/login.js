import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import validator from 'validator';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	makeStyles,
	Container,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { loginUser } from '../actions';
import ErrorAlert from '../components/error-alert';
import Page from '../components/page';
import { useAuthState } from '../hooks';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { isAuthenticated: isAuth, errors } = useAuthState();

	const login = useCallback(
		(email, password) => dispatch(loginUser({ email, password })),
		[dispatch],
	);

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			validator.isEmail(email) &&
			validator.isLength(password, { min: 6 })
		) {
			login(email, password);

			setTimeout(() => {
				history.push('/');
			}, 1000);
		}
	};

	const renderErrors = () => {
		if (errors?.length > 0) {
			return <ErrorAlert errors={errors} />;
		}
	};

	return (
		<>
			{!isAuth ? (
				<Page title='Anasayfa'>
					<Container component='main' maxWidth='xs'>
						<CssBaseline />
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlined />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Giriş Yap
							</Typography>
							<form
								className={classes.form}
								noValidate
								onSubmit={onSubmit}
							>
								{renderErrors()}
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
									error={
										email !== '' &&
										!validator.isEmail(email)
									}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
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
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
								>
									Giriş yap
								</Button>
								<Grid container>
									<Grid item xs>
										<RouterLink to='/forgot-password'>
											Şifreni mi unuttun?
										</RouterLink>
									</Grid>
								</Grid>
							</form>
						</div>
					</Container>
				</Page>
			) : (
				<Redirect to='/' />
			)}
		</>
	);
}
