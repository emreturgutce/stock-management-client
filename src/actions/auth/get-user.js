import { AuthActionTypes } from '../types';
import { BASE_URL } from '../../constants/index';

export const getUser = (data) => (dispatch) => {
	dispatch({ type: AuthActionTypes.USER_LOADING });

	fetch(`${BASE_URL}/api/personels/current`, {
		method: 'GET',
		credentials: 'include',
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				setTimeout(() => {
					dispatch({
						type: AuthActionTypes.AUTH_SUCCESS,
						payload: res.data[0],
					});
				}, 500);
			} else {
				dispatch({
					type: AuthActionTypes.AUTH_FAIL,
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: AuthActionTypes.AUTH_FAIL,
			});
		});
};
