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
	Tooltip,
} from '@material-ui/core';
import { Equalizer, Home, EventBusy, People } from '@material-ui/icons';
import LetterAvatar from './letter-avatar';
import { useAuthState } from '../hooks';
import AddDropDown from './add-dropdown';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

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

function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

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
					{/*{user?.role === 'ADMIN' && (
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
					)}*/}
					{user?.role === 'ADMIN' && (
						<Tooltip title='Personeller'>
							<RouterLink to='/personels'> {/* TODO! - Change Path */}
								<IconButton
									edge='start'
									className={classes.menuButton}
									color='inherit'
									aria-label='menu'
								>
									<People
										style={{ fill: '#EEE' }}
										fontSize='small'
									/>
								</IconButton>
							</RouterLink>
						</Tooltip>
					)}
					{user?.role === 'ADMIN' && (
						<Tooltip title='Etkinlikler'>
							<RouterLink to='/events'>
								<IconButton
									edge='start'
									className={classes.menuButton}
									color='inherit'
									aria-label='menu'
								>
									<EventBusy
										style={{ fill: '#EEE' }}
										fontSize='small'
									/>
								</IconButton>
							</RouterLink>
						</Tooltip>
					)}
					<Tooltip title='Satış grafiği'>
						<RouterLink to='/cars/chart'>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
							>
								<Equalizer
									style={{ fill: '#EEE' }}
									fontSize='small'
								/>
							</IconButton>
						</RouterLink>
					</Tooltip>
					<AddDropDown />
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
		<HideOnScroll>
			<AppBar position='fixed'>
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
									<Home
										style={{ fill: '#EEE' }}
										width='125%'
									/>
								</IconButton>
							</RouterLink>
						</Grid>
						<Grid item>{renderPhoto()}</Grid>
					</Grid>
				</Container>
			</AppBar>
		</HideOnScroll>
	);
};

export default Navbar;
