import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getAwaitingEvents = () => (dispatch) => {
	dispatch({
		type: CarActionTypes.AWAITING_EVENTS_LOADING,
	});

	fetch(`${BASE_URL}/api/cars/awaiting-list`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.AWAITING_EVENTS_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.AWAITING_EVENTS_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.AWAITING_EVENTS_FAIL,
			});
		});
};
