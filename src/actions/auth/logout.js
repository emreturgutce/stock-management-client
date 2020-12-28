import { AuthActionTypes } from '../types';

export const logout = () => (dispatch) => {
    fetch('http://localhost:8080/api/personels/logout', {
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
