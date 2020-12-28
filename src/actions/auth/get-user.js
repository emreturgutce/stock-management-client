import Cookies from 'js-cookie';
import { AuthActionTypes } from '../types';

export const getUser = (data) => (dispatch) => {
    const authToken = Cookies.get('auth_token');

    if (!authToken) {
        dispatch({ type: AuthActionTypes.AUTH_FAIL });
    } else {
        dispatch({ type: AuthActionTypes.USER_LOADING });

        fetch('http://localhost:8080/api/personels/current', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json())
            .then(({ data }) => {
                setTimeout(() => {
                    dispatch({
                        type: AuthActionTypes.AUTH_SUCCESS,
                        payload: data[0],
                    });
                }, 2000);
            })
            .catch((err) => {
                dispatch({
                    type: AuthActionTypes.AUTH_FAIL,
                });
            });
    }
};
