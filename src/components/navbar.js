import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	createStyles,
	makeStyles,
	CircularProgress,
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Container,
} from '@material-ui/core';
import { Add, Equalizer, Home, FormatListBulleted } from '@material-ui/icons';
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
		flex: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
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
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<div style={{ margin: 'auto' }}>
						<RouterLink to='/sales/latest'>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<FormatListBulleted style={{ fill: '#EEE' }} />
							</IconButton>
						</RouterLink>
						<RouterLink to='/cars/chart'>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<Equalizer
									style={{ fill: '#EEE' }}
									width='125%'
								/>
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
					</div>
					<LetterAvatar
						firstLetter={
							user.first_name.toUpperCase().charAt(0) || 'U'
						}
					/>
				</div>
			);
		}

		return (
			<RouterLink to='/login'>
				<Button variant='contained'>Giriş Yap</Button>
			</RouterLink>
		);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Container>
					<Toolbar className={classes.flex}>
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
						{renderPhoto()}
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default Navbar;
