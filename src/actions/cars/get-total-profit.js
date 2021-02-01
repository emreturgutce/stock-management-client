import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getTotalProfit = () => (dispatch) => {
	fetch(`${BASE_URL}/api/sales/profit`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.TOTAL_PROFIT,
					payload: res.data.profit,
				});
			}
		})
		.catch((err) => {});
};
