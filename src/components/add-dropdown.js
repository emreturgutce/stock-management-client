import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	Menu,
	MenuItem,
	ListItemText,
	Tooltip,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
} from '@material-ui/core';
import { Add, ArrowDropDown } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const StyledMenu = withStyles({
	paper: {
		Modalborder: '1px solid #d3d4d5',
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
	const [color, setColor] = useState('');
	const [manufacturer, setManufacturer] = useState('');
	const [openColorModal, setOpenColorModal] = useState(false);
	const [openManufacturerModal, setOpenManufacturerModal] = useState(false);

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	
	const submitManufacturer = async (e) => {
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/cars/manufacturers`, {
			method: 'POST',
			body: JSON.stringify({
				name: manufacturer,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (res.ok) {
			toast.success('Üretici başarıyla eklendi', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});

			setOpenColorModal(false);
		} else {
			const resMessage = (await res.json()).message;

			if (resMessage.match(/Unique Key/)) {
				toast.error('Bu üretici zaten mevcut.', {
					position: 'top-center',
					autoclose: 5000,
					hideprogressbar: false,
					closeonclick: true,
					pauseonhover: true,
					draggable: true,
					progress: undefined,
				});

				setOpenColorModal(false);
			} else {
				toast.error('Üretici ekleme sırasında bir hata oluştu', {
					position: 'top-center',
					autoclose: 5000,
					hideprogressbar: false,
					closeonclick: true,
					pauseonhover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}
	};

	const submitColor = async (e) => {
		e.preventDefault();

		const res = await fetch(`${BASE_URL}/api/cars/colors`, {
			method: 'POST',
			body: JSON.stringify({
				name: color,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (res.ok) {
			toast.success('Renk başarıyla eklendi', {
				position: 'top-center',
				autoclose: 5000,
				hideprogressbar: false,
				closeonclick: true,
				pauseonhover: true,
				draggable: true,
				progress: undefined,
			});

			setOpenColorModal(false);
		} else {
			const resMessage = (await res.json()).message;

			if (resMessage.match(/Unique Key/)) {
				toast.error('Bu renk zaten mevcut.', {
					position: 'top-center',
					autoclose: 5000,
					hideprogressbar: false,
					closeonclick: true,
					pauseonhover: true,
					draggable: true,
					progress: undefined,
				});

				setOpenColorModal(false);
			} else {
				toast.error('Renk ekleme sırasında bir hata oluştu', {
					position: 'top-center',
					autoclose: 5000,
					hideprogressbar: false,
					closeonclick: true,
					pauseonhover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}
	};

	return (
		<div>
			<Tooltip title="Daha fazla">
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={handleClick}
				>
					<Add style={{ fill: '#EEE' }} fontSize="small" />
					<ArrowDropDown style={{ fill: '#EEE' }} fontSize="small" />
				</IconButton>
			</Tooltip>
			<StyledMenu
				id="customized-menu"
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
					<ListItemText disableTypography primary="Araba Ekle" />
				</StyledMenuItem>
				<StyledMenuItem
					style={{
						lineHeight: 'normal',
						fontSize: '.9rem',
						paddingLeft: '1.5rem',
						paddingRight: '1.5rem',
					}}
					onClick={() => {
						setOpenColorModal(true);
						handleClose();
					}}
				>
					<ListItemText disableTypography primary="Renk Ekle" />
				</StyledMenuItem>
				<Dialog
					open={openColorModal}
					onClose={() => setOpenColorModal(false)}
					aria-labelledby="form-dialog-title"
					id="color-modal"
				>
					<DialogTitle id="form-dialog-title">
						Renk Ekleme
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="color"
							label="Renk Adı"
							fullWidth
							variant="outlined"
							value={color}
							onChange={(e) => setColor(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setOpenColorModal(false)}
							color="primary"
						>
							Reddet
						</Button>
						<Button onClick={submitColor} color="primary">
							Kabul Et
						</Button>
					</DialogActions>
				</Dialog>
				<StyledMenuItem
					style={{
						lineHeight: 'normal',
						fontSize: '.9rem',
						paddingLeft: '1.5rem',
						paddingRight: '1.5rem',
					}}
					onClick={() => {
						setOpenManufacturerModal(true);
						handleClose();
					}}
				>
					<ListItemText
						disableTypography
						primary="Araba Üreticisi Ekle"
					/>
				</StyledMenuItem>
				<Dialog
					open={openManufacturerModal}
					onClose={() => setOpenManufacturerModal(false)}
					aria-labelledby="form-dialog-title"
					id="color-modal"
				>
					<DialogTitle id="form-dialog-title">
						Üretici Ekleme
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="color"
							label="Üretici Adı"
							fullWidth
							variant="outlined"
							value={manufacturer}
							onChange={(e) => setManufacturer(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setOpenManufacturerModal(false)}
							color="primary"
						>
							Reddet
						</Button>
						<Button onClick={submitManufacturer} color="primary">
							Kabul Et
						</Button>
					</DialogActions>
				</Dialog>
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
					<ListItemText disableTypography primary="Müşteri Ekle" />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
}
