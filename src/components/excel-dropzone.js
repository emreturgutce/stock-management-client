import { makeStyles, Paper, Button } from '@material-ui/core';
import { Save, Cancel } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			padding: theme.spacing(3),
		},
		width: '100%',
		boxSizing: 'border-box',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

const ExcelDropzone = ({ handleCancel, setFiles, handleSubmit, disable }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<DropzoneArea
				acceptedFiles={[
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				]}
				showFileNames
				onChange={(f) => setFiles(f)}
				dropzoneText='Excel dosyanızı buraya sürükleyin veya seçmek için tıklayın'
				showAlerts={false}
				filesLimit={1}
			/>
			<div className={classes.buttons}>
				<Button
					variant='outlined'
					color='primary'
					startIcon={<Cancel />}
					className={classes.button}
					onClick={handleCancel}
					disabled={disable}
				>
					İptal et
				</Button>
				<Button
					variant='outlined'
					color='secondary'
					startIcon={<Save />}
					className={classes.button}
					onClick={handleSubmit}
					disabled={disable}
				>
					Kaydet
				</Button>
			</div>
		</Paper>
	);
};

export default ExcelDropzone;
