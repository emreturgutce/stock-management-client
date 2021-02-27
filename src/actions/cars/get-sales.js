import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getSales = (fromDate, toDate) => (dispatch) => {
	dispatch({
		type: CarActionTypes.SALES_LOADING,
	});

	fetch(`${BASE_URL}/api/sales/count?from=${fromDate}&to=${toDate}`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.SALES_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.SALES_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.SALES_FAIL,
			});
		});
};
