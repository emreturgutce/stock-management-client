import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	Menu,
	MenuItem,
	ListItemText,
	Tooltip,
	IconButton,
} from '@material-ui/core';
import { Add, ArrowDropDown } from '@material-ui/icons';

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

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:hover': {
			backgroundColor: '#f6f6f6',
		},
	},
}))(MenuItem);

export default function AddDropDown() {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Tooltip title='Daha fazla'>
				<IconButton
					edge='start'
					color='inherit'
					aria-label='menu'
					onClick={handleClick}
				>
					<Add style={{ fill: '#EEE' }} fontSize='small' />
					<ArrowDropDown style={{ fill: '#EEE' }} fontSize='small' />
				</IconButton>
			</Tooltip>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				style={{
					paddingTop: '4px',
					paddingBottom: '4px',
					boxShadow: '0 8px 24px rgba(149,157,165,0.2);',
				}}
			>
				<StyledMenuItem
					style={{
						lineHeight: 'normal',
						fontSize: '.9rem',
						paddingLeft: '1.5rem',
						paddingRight: '1.5rem',
					}}
					onClick={() => {
						handleClose();
						history.push('/cars/add');
					}}
				>
					<ListItemText disableTypography primary='Araba Ekle' />
				</StyledMenuItem>
				<StyledMenuItem
					style={{
						lineHeight: 'normal',
						fontSize: '.9rem',
						paddingLeft: '1.5rem',
						paddingRight: '1.5rem',
					}}
					onClick={() => {
						handleClose();
						history.push('/cars/add');
					}}
				>
					<ListItemText disableTypography primary='Renk Ekle' />
				</StyledMenuItem>
				<StyledMenuItem
					style={{
						lineHeight: 'normal',
						fontSize: '.9rem',
						paddingLeft: '1.5rem',
						paddingRight: '1.5rem',
					}}
					onClick={() => {
						handleClose();
						history.push('/cars/add');
					}}
				>
					<ListItemText
						disableTypography
						primary='Araba Üreticisi Ekle'
					/>
				</StyledMenuItem>
				<StyledMenuItem
					style={{
						lineHeight: 'normal',
						fontSize: '.9rem',
						paddingLeft: '1.5rem',
						paddingRight: '1.5rem',
					}}
					onClick={() => {
						handleClose();
						history.push('/cars/add');
					}}
				>
					<ListItemText disableTypography primary='Müşteri Ekle' />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
