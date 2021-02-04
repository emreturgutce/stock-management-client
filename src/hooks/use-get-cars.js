import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCars } from '../actions';

const useGetCars = () => {
	const dispatch = useDispatch();
	const getCarsCb = useCallback(() => dispatch(getCars()), [dispatch]);

	useEffect(() => {
		getCarsCb();
	}, [getCarsCb]);

    return getCarsCb;
};

export { useGetCars };
