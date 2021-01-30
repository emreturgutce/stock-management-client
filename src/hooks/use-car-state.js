import { useSelector } from 'react-redux';

const useCarState = () => {
	const carState = useSelector((state) => state.car);

	return carState;
};

export { useCarState };
