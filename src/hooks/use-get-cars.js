import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCars } from '../actions/cars/get-cars';

const useGetCars = () => {
	const dispatch = useDispatch();
	const getCarsCb = useCallback(() => dispatch(getCars()), [dispatch]);

	useEffect(() => {
		getCarsCb();
	}, [getCarsCb]);

    return getCarsCb;
};

export { useGetCars };
