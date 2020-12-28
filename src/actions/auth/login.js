import { AuthActionTypes } from '../types';

export const loginUser = (data) => (dispatch) => {
    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((d) => {
            console.log(d);
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch({
                type: AuthActionTypes.LOGIN_FAIL,
            });
        });
};
