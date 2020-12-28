import { AuthActionTypes } from '../types';

export const register = (data) => (dispatch) => {
    fetch('http://localhost:8080/api/personels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((d) => {
            dispatch({
                type: AuthActionTypes.REGISTER_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch({
                type: AuthActionTypes.REGISTER_FAIL,
            });
        });
};
