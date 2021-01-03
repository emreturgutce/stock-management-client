import { BASE_URL } from '../../constants/index';
import { AuthActionTypes } from '../types';

export const logout = () => (dispatch) => {
    fetch(`${BASE_URL}/api/personels/logout`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            dispatch({
                type: AuthActionTypes.LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};