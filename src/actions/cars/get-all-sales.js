import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getAllSales = () => (dispatch) => {
	dispatch({
		type: CarActionTypes.ALL_SALES_LOADING,
	});

	fetch(`${BASE_URL}/api/sales`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.ALL_SALES_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.ALL_SALES_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.ALL_SALES_FAIL,
			});
		});
};
