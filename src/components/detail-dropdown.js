import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Button,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from '@material-ui/core';
import { Delete, Edit, Refresh, ShoppingCart } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import PDFIcon from '../assets/document.svg';
import { BASE_URL } from '../constants';

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
			horizontal: 'center',
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
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function CustomizedMenus({
	handleRefresh,
	handleEdit,
	handleDelete,
	handleSell,
	isSold,
	carId,
	disableRefresh,
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Tooltip title='Daha fazla'>
				<Button
					aria-controls='customized-menu'
					aria-haspopup='true'
					color='primary'
					children={
						<svg
							class='MuiSvgIcon-root'
							focusable='false'
							viewBox='0 0 24 24'
							aria-hidden='true'
						>
							<path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'></path>
						</svg>
					}
					onClick={handleClick}
				/>
			</Tooltip>
			<StyledMenu
				id='customized-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{isSold === 'SOLD' && (
					<StyledMenuItem
						onClick={() => {
							handleClose();
							window.location.href = `${BASE_URL}/api/sales/${carId}/pdf`;
						}}
					>
						<ListItemIcon>
							<img width={24} src={PDFIcon} alt='pdf' />
						</ListItemIcon>
						<ListItemText primary='Fatura oluştur' />
					</StyledMenuItem>
				)}
				<StyledMenuItem
					onClick={() => {
						handleClose();
						handleRefresh();
					}}
					disabled={disableRefresh}
				>
					<ListItemIcon>
						<Refresh fontSize='small' />
					</ListItemIcon>
					<ListItemText primary='Yenile' />
				</StyledMenuItem>
				{isSold !== 'SOLD' && (
					<StyledMenuItem
						onClick={() => {
							handleClose();
							handleEdit();
						}}
					>
						<ListItemIcon>
							<Edit fontSize='small' />
						</ListItemIcon>
						<ListItemText primary='Düzenle' />
					</StyledMenuItem>
				)}
				{isSold !== 'SOLD' && (
					<StyledMenuItem
						onClick={() => {
							handleClose();
							handleDelete();
						}}
					>
						<ListItemIcon>
							<Delete
								style={{ color: red[900] }}
								fontSize='small'
							/>
						</ListItemIcon>
						<ListItemText primary='Kayıtı kaldır' />
					</StyledMenuItem>
				)}
				{isSold !== 'SOLD' && (
					<StyledMenuItem
						onClick={() => {
							handleClose();
							handleSell();
						}}
					>
						<ListItemIcon>
							<ShoppingCart
								style={{ color: red[900] }}
								fontSize='small'
							/>
						</ListItemIcon>
						<ListItemText primary='Sat' />
					</StyledMenuItem>
				)}
			</StyledMenu>
		</div>
	);
}
