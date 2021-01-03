import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getColors = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.COLORS_LOADING,
    });

    fetch(`${BASE_URL}/api/cars/colors`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.data) {
                dispatch({
                    type: CarActionTypes.COLORS_LOADED,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: CarActionTypes.COLORS_FAIL,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: CarActionTypes.COLORS_FAIL,
            });
        });
};
