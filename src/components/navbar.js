import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	createStyles,
	makeStyles,
	CircularProgress,
	AppBar,
	Button,
	IconButton,
	Container,
	Grid,
} from '@material-ui/core';
import { Add, Equalizer, Home, Person } from '@material-ui/icons';
import LetterAvatar from './letter-avatar';
import { useAuthState } from '../hooks';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	}),
);

const Navbar = () => {
	const classes = useStyles();
	const { isAuthenticated: isAuth, isLoading, user } = useAuthState();

	const renderPhoto = () => {
		if (isLoading) {
			return <CircularProgress />;
		}

		if (isAuth) {
			return (
				<Grid
					item
					container
					direction='row'
					alignItems='center'
					justify='center'
				>
					{user?.role === 'ADMIN' && (
						<RouterLink to='/personels'>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<Person style={{ fill: '#EEE' }} />
							</IconButton>
						</RouterLink>
					)}
					<RouterLink to='/cars/chart'>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
						>
							<Equalizer style={{ fill: '#EEE' }} width='125%' />
						</IconButton>
					</RouterLink>
					<RouterLink to='/cars/add'>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'
						>
							<Add style={{ fill: '#EEE' }} width='125%' />
						</IconButton>
					</RouterLink>
					<LetterAvatar
						firstLetter={
							user.first_name.toUpperCase().charAt(0) || 'U'
						}
					/>
				</Grid>
			);
		}

		return (
			<RouterLink to='/login'>
				<Button variant='contained'>Giriş Yap</Button>
			</RouterLink>
		);
	};

	return (
		<AppBar position='static'>
			<Container>
				<Grid container alignItems='center' justify='space-between'>
					<Grid item>
						<RouterLink to='/'>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<Home style={{ fill: '#EEE' }} width='125%' />
							</IconButton>
						</RouterLink>
					</Grid>
					<Grid item>{renderPhoto()}</Grid>
				</Grid>
			</Container>
		</AppBar>
	);
};

export default Navbar;
