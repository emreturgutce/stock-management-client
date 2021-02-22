import { useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants';

const Confirm = () => {
	const { token } = useParams();
	const history = useHistory();

	const onSubmit = async () => {
		const res = await fetch(`${BASE_URL}/api/personels/verify/${token}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (res.ok) {
			toast.success('Mailiniz başarılı bir şekilde onaylandı.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(
				'Mail onaylanma işlemi başarısız lütfen tekrar deneyiniz.',
				{
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				},
			);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
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
