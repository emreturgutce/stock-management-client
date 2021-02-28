import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	makeStyles,
	createStyles,
	Avatar,
	Button,
	Menu,
	MenuItem,
	Typography,
	withStyles,
} from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { deepOrange } from '@material-ui/core/colors';
import { logout } from '../actions';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'start',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const useStyles = makeStyles((theme) =>
	createStyles({
		orange: {
			color: theme.palette.getContrastText(deepOrange[500]),
			backgroundColor: deepOrange[500],
		},
	}),
);

export default function LetterAvatar({ firstLetter }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const history = useHistory();

	const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLout = () => {
		handleLogout();
		history.push('/login');
	};

	return (
		<div>
			<Button type='button' onClick={handleClick}>
				<Avatar className={classes.orange}>{firstLetter}</Avatar>
			</Button>
			<StyledMenu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						history.push('/personels/profile');
					}}
				>
					<AccountCircle
						style={{ marginRight: '1rem', color: '#1769aa' }}
					/>
					<Typography variant='span'>Profil</Typography>
				</MenuItem>
				<MenuItem onClick={handleLout}>
					<ExitToApp
						style={{ marginRight: '1rem', color: '#1769aa' }}
					/>
					<Typography variant='span'>Çıkış</Typography>
				</MenuItem>
			</StyledMenu>
		</div>
	);
}
