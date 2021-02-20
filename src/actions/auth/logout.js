import { BASE_URL } from '../../constants/index';
import { AuthActionTypes } from '../types';

export const logout = () => (dispatch) => {
	fetch(`${BASE_URL}/api/personels/logout`, {
		method: 'GET',
		credentials: 'include',
	})
		.then(() => {
			dispatch({
				type: AuthActionTypes.LOGOUT_SUCCESS,
			});
		})
		.catch((err) => {});
};
