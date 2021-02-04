import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import CarForm from '../components/car-form';
import Page from '../components/page';
import { getManufacturers, getSuppliers, getColors } from '../actions';

const CarAdd = () => {
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
	});

	return (
		<Page title='Araba Ekleme'>
			<CarForm />
		</Page>
	);
};
export default CarAdd;
