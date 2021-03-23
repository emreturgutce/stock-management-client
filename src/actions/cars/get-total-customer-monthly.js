import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getTotalCustomerMonthly = () => (dispatch) => {
	dispatch({
		type: CarActionTypes.TOTAL_CUSTOMER_MONTHLY_LOADING,
	});

	fetch(`${BASE_URL}/api/customers/monthly-total-customers`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.TOTAL_CUSTOMER_MONTHLY_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.TOTAL_CUSTOMER_MONTHLY_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.TOTAL_CUSTOMER_MONTHLY_FAIL,
			});
		});
};
