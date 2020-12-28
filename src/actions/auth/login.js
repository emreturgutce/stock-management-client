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
        .then(({ data }) => {
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: data[0],
            });
        })
        .catch((err) => {
            dispatch({
                type: AuthActionTypes.LOGIN_FAIL,
            });
        });
};
