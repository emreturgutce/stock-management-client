import { CarActionTypes } from '../types';

export const getManufacturers = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.MANUFACTURERS_LOADING,
    });

    fetch('http://localhost:8080/api/cars/manufacturers', {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.data) {
                setTimeout(() => {
                    dispatch({
                        type: CarActionTypes.MANUFACTURERS_LOADED,
                        payload: res.data,
                    });
                }, 2000);
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
