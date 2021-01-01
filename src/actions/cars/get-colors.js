import { CarActionTypes } from '../types';

export const getColors = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.COLORS_LOADING,
    });

    fetch('http://localhost:8080/api/cars/colors', {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data) {
                setTimeout(() => {
                    dispatch({
                        type: CarActionTypes.COLORS_LOADED,
                        payload: data,
                    });
                }, 2000);
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
