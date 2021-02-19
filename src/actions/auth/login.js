import { BASE_URL } from '../../constants/index';
import { AuthActionTypes } from '../types';

export const loginUser = (data) => (dispatch) => {
	fetch(`${BASE_URL}/api/personels/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.data) {
				dispatch({
					type: AuthActionTypes.LOGIN_SUCCESS,
					payload: res.data[0],
				});
			} else {
				dispatch({
					type: AuthActionTypes.LOGIN_FAIL,
					payload: {
						error: 'Email veya şifre yanlış',
					},
				});
			}
		})
		.catch((err) => {
			dispatch({
				type: AuthActionTypes.LOGIN_FAIL,
				payload: {
					error: err,
				},
			});
		});
};
