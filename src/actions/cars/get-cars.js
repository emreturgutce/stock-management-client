import { CarActionTypes } from '../types';

export const getCars = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.CARS_LOADING,
    });

    fetch('http://localhost:8080/api/cars', {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then(({ data }) => {
            console.log(data);
            if (data) {
                setTimeout(() => {
                    dispatch({
                        type: CarActionTypes.CARS_LOADED,
                        payload: data,
                    });
                }, 2000);
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
