import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse } from '@material-ui/core';

const ErrorAlert = ({ errors, show, setShow }) => {
	const [open, setOpen] = useState(true);

	if (!show) {
		return (
			<Collapse in={open}>
				<Alert severity='error' onClose={() => setOpen(false)}>
					<AlertTitle>Hata</AlertTitle>
					{errors.map((error) => error)}
				</Alert>
			</Collapse>
		);
	}

	return (
		<Collapse in={show}>
			<Alert severity='error' onClose={() => setShow(false)}>
				<AlertTitle>Hata</AlertTitle>
				{errors.map((error) => error)}
			</Alert>
		</Collapse>
	);
};

export default ErrorAlert;
