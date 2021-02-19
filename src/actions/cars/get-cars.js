import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getCars = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.CARS_LOADING,
    });

    fetch(`${BASE_URL}/api/cars`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data) {
                setTimeout(() => {
                    dispatch({
                        type: CarActionTypes.CARS_LOADED,
                        payload: data,
                    });
                }, 500);
            } else {
                dispatch({
                    type: CarActionTypes.CARS_FAIL,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: CarActionTypes.CARS_FAIL,
            });
        });
};
