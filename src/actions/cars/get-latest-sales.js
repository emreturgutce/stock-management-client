import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getLatestSales = () => (dispatch) => {
	dispatch({
		type: CarActionTypes.LATEST_SALES_LOADING,
	});

	fetch(`${BASE_URL}/api/sales/latest`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.LATEST_SALES_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.LATEST_SALES_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.LATEST_SALES_FAIL,
			});
		});
};
