import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { loadCSS } from 'fg-loadcss';
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
	Icon,
} from '@material-ui/core';
import { Equalizer, EventBusy, People } from '@material-ui/icons';
import LetterAvatar from './letter-avatar';
import { useAuthState } from '../hooks';
import AddDropDown from './add-dropdown';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
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
							<RouterLink style={{ display: 'block', marginRight: '12px' }} to='/personels'> {/* TODO! - Change Path */}
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
							<RouterLink style={{ display: 'block', marginRight: '12px' }} to='/events'>
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
						<RouterLink style={{ display: 'block', marginRight: '12px' }} to='/cars/chart'>
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


	useEffect(() => {
		const node = loadCSS(
			'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
			document.querySelector('#font-awesome-css'),
		);

		return () => {
			node.parentNode.removeChild(node);
		};
	}, []);

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
									<Icon
										className='fas fa-car'
										style={{
											color: '#EEE',
											fontSize: '1.5rem',
											width: '1.5rem',
										}}
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
