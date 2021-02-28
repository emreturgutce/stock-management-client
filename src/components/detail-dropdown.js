import { useState } from 'react';
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
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
			'&.red-item': {
				backgroundColor: theme.palette.secondary.main,
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
						id='pdf-list-item'
					>
						<ListItemIcon>
							<svg
								version='1.1'
								id='Capa_1'
								x='0px'
								y='0px'
								width={24}
								viewBox='0 0 394.8 394.8'
								style={{
									enableBackground: 'new 0 0 394.8 394.8',
								}}
							>
								<g>
									<g>
										<g>
											<path
												d='M218.4,167.6c-2.8-2.4-6-4-9.6-5.2c-3.6-0.8-7.6-1.2-12.4-1.2H178c-3.2,0-5.2,0.8-6.8,2c-1.2,1.2-2,3.6-2,6.8v51.6
				c0,2.4,0,4,0.8,5.6c0.4,1.6,1.2,2.4,2.4,3.2c1.2,0.8,3.2,1.2,6,1.2h18.4c3.2,0,6-0.4,8.8-0.8c2.4-0.4,4.8-1.2,7.2-2
				c2.4-1.2,4.4-2.4,6-4c2.4-2.4,4.4-4.8,6-7.6c1.6-2.8,2.8-6,3.6-9.6c0.8-3.6,1.2-7.2,1.2-11.6C229.6,183.6,226,174,218.4,167.6z
				 M208,217.2c-1.2,0.8-2.4,1.6-3.6,2c-1.6,0.4-2.8,0.8-4,0.8s-3.2,0-5.6,0H184v-48h9.6c4.4,0,8,0.4,11.2,1.6
				c3.2,0.8,5.6,3.2,7.6,6.8c2,3.6,3.2,8.8,3.2,15.6C215.2,206.4,212.8,213.2,208,217.2z'
											/>
											<path
												d='M345.6,78.8l-0.4-0.4V78l-76-76l-0.4-0.4c0,0-0.4,0-0.4-0.4c0,0-0.4,0-0.4-0.4C266.8,0,265.6,0,264,0H75.6
				c-7.2,0-14,2.8-18.8,7.6L56.4,8c-4.8,4.8-8,12-8,19.2v340.4c0,7.6,3.2,14.4,8,19.2c4.8,4.8,12,8,19.2,8h243.6
				c7.6,0,14.4-3.2,19.2-8s8-12,8-19.2V82.8C346.4,81.2,346,80,345.6,78.8z M271.6,28.8L316.8,74h-33.2c-3.2,0-6.4-1.2-8.4-3.6
				c-2-2-3.6-5.2-3.6-8.4V28.8z M329.2,367.6c0,2.8-1.2,5.2-3.2,7.2s-4.4,3.2-7.2,3.2H75.6c-2.8,0-5.2-1.2-7.2-2.8
				c-2-2-2.8-4.4-2.8-7.2V26.8c0-2.8,1.2-5.2,3.2-7.2l0.4-0.4c2-1.6,4.4-2.8,6.8-2.8h179.2v45.2c0,8,3.2,15.2,8.8,20.8
				c5.2,5.2,12.8,8.4,20.8,8.4h44.4V367.6z'
											/>
											<path
												d='M150.8,166.8c-2-2-4.4-3.2-7.6-4c-2.8-0.8-7.2-1.2-12.4-1.2h-18.4c-3.2,0-5.6,0.8-6.8,2c-1.6,1.2-2,3.6-2,6.8v54.4
				c0,2.8,0.8,4.8,2,6.4c1.2,1.6,3.2,2,5.2,2s3.6-0.8,5.2-2.4c1.2-1.6,2-3.6,2-6.4v-20h13.2c8.8,0,15.2-2,19.6-5.6
				c4.4-3.6,6.8-9.2,6.8-16.4c0-3.2-0.4-6.4-1.6-9.2C154.4,170.8,152.8,168.4,150.8,166.8z M141.2,189.2c-1.2,1.6-2.8,2.8-5.2,3.6
				c-2.4,0.8-5.2,1.2-8.4,1.2H118v-21.6h9.6c6.4,0,10.4,1.2,12.8,3.2c2,2,2.8,4.4,2.8,7.6C142.8,185.6,142.4,187.6,141.2,189.2z'
											/>
											<path
												d='M250.8,160.8c-2.4,0.4-4,0.8-5.2,1.6c-1.2,0.4-2.4,1.6-2.8,2.8c-0.8,1.2-0.8,2.8-0.8,5.2v54c0,2.8,0.8,5.2,2,6.4
				c1.2,1.6,3.2,2,5.2,2s3.6-0.8,5.2-2c1.2-1.6,2-3.6,2-6.4v-23.2H280c2,0,3.6-0.4,4.8-1.6c1.2-0.8,1.6-2.4,1.6-4
				c0-1.6-0.4-2.8-1.6-4c-1.2-0.8-2.8-1.6-4.8-1.6h-23.6v-18h28c2.4,0,4-0.4,5.2-1.6c1.2-1.2,1.6-2.4,1.6-4c0-1.6-0.4-2.8-1.6-4
				c-1.2-1.2-2.8-1.6-5.2-1.6H250.8z'
											/>
										</g>
									</g>
								</g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
								<g></g>
							</svg>
						</ListItemIcon>
						<ListItemText primary='Fatura oluştur' />
					</StyledMenuItem>
				)}
				<StyledMenuItem
					onClick={() => {
						handleClose();
						setTimeout(handleRefresh, 500);
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
						className='red-item'
					>
						<ListItemIcon>
							<Delete fontSize='small' />
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
						className='red-item'
					>
						<ListItemIcon>
							<ShoppingCart fontSize='small' />
						</ListItemIcon>
						<ListItemText primary='Sat' />
					</StyledMenuItem>
				)}
			</StyledMenu>
		</div>
	);
}
