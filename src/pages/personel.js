import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPersonnels } from '../actions';
import Page from '../components/page';

const Personel = () => {
	const dispatch = useDispatch();
	const getPersonnelsCb = useCallback(() => dispatch(getPersonnels()), [dispatch]);

	useEffect(() => {
		getPersonnelsCb();		
	}, [])

	return (
		<Page title='Personeller'>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '90%',
					margin: '30px auto',
				}}
			>
				<h1>Personeller</h1>
			</div>
		</Page>
	);
};

export default Personel;
