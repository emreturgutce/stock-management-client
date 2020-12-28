import Cookies from 'js-cookie';
import { AuthActionTypes } from '../types';

export const loginUser = (data) => (dispatch) => {
    fetch('http://localhost:8080/api/personels/login', {
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
                        error: res.error,
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
