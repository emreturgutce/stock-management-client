import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getTotalSaleMonthly = () => (dispatch) => {
	dispatch({
		type: CarActionTypes.TOTAL_SALE_MONTHLY_LOADING,
	});

	fetch(`${BASE_URL}/api/sales/monthly-total-sale-price`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.TOTAL_SALE_MONTHLY_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.TOTAL_SALE_MONTHLY_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.TOTAL_SALE_MONTHLY_FAIL,
			});
		});
};
