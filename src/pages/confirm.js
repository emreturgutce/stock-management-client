import { useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { BASE_URL } from '../constants';

const Confirm = () => {
	const { token } = useParams();
	const history = useHistory();

	const onSubmit = async () => {
		await fetch(`${BASE_URL}/api/personels/verify/${token}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
	};

	const onSubmitCb = useCallback(() => onSubmit(), []);

	const handleClick = () => {
		history.push('/');
	};

	useEffect(() => {
		(async () => {
			await onSubmitCb();
		})();
	}, [onSubmitCb]);

	return (
		<Container
			maxWidth='sm'
			style={{
				marginTop: '16px',
				height: '70vh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Alert
				style={{ width: '100%' }}
				severity='success'
				action={
					<Button color='inherit' size='small' onClick={handleClick}>
						Anasayfaya dön
					</Button>
				}
			>
				<AlertTitle>Tebrikler</AlertTitle>
				Başarılı bir şekilde e-mail'ini onayladın.
			</Alert>
		</Container>
	);
};

export default Confirm;
