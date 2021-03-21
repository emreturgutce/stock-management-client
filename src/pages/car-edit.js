import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CarForm from '../components/car-form';
import Page from '../components/page';
import { getManufacturers, getSuppliers, getColors } from '../actions';

const CarEdit = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const getManufacturersCb = useCallback(() => dispatch(getManufacturers()), [
		dispatch,
	]);
	const getSuppliersCb = useCallback(() => dispatch(getSuppliers()), [
		dispatch,
	]);
	const getColorsCb = useCallback(() => dispatch(getColors()), [dispatch]);

	useEffect(() => {
		getManufacturersCb();
		getSuppliersCb();
		getColorsCb();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page title='Araba Güncelleme'>
			<CarForm car={location.state.car} />
		</Page>
	);
};
export default CarEdit;
