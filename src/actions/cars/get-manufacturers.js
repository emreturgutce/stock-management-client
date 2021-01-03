import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getManufacturers = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.MANUFACTURERS_LOADING,
    });

    fetch(`${BASE_URL}/api/cars/manufacturers`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.data) {
                dispatch({
                    type: CarActionTypes.MANUFACTURERS_LOADED,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: CarActionTypes.MANUFACTURERS_FAIL,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: CarActionTypes.MANUFACTURERS_FAIL,
            });
        });
};
