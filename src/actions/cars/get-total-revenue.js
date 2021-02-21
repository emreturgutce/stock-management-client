import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getTotalRevenue = () => (dispatch) => {
	fetch(`${BASE_URL}/api/sales/revenue`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.TOTAL_REVENUE,
					payload: res.data.revenue,
				});
			}
		})
		.catch((err) => {});
};
