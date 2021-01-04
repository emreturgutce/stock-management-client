import { BASE_URL } from '../../constants/index';
import { AuthActionTypes } from '../types';

export const logout = () => async (dispatch) => {
    await fetch(`${BASE_URL}/api/personels/logout`, {
        method: 'GET',
        credentials: 'include',
    });

    dispatch({
        type: AuthActionTypes.LOGOUT_SUCCESS,
    });
};
