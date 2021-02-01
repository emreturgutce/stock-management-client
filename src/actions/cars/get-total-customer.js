import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getTotalCustomer = () => (dispatch) => {
	fetch(`${BASE_URL}/api/customers/count`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.TOTAL_CUSTOMER,
					payload: res.data[0].count,
				});
			}
		})
		.catch((err) => {});
};
