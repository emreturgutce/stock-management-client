import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getCompletedEvents = () => (dispatch) => {
	dispatch({
		type: CarActionTypes.COMPLETED_EVENTS_LOADING,
	});

	fetch(`${BASE_URL}/api/cars/completed-events`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: CarActionTypes.COMPLETED_EVENTS_LOADED,
					payload: res.data,
				});
			} else {
				dispatch({
					type: CarActionTypes.COMPLETED_EVENTS_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: CarActionTypes.COMPLETED_EVENTS_FAIL,
			});
		});
};
