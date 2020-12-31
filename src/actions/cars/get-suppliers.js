import { CarActionTypes } from '../types';

export const getSuppliers = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.SUPPLIERS_LOADING,
    });

    fetch('http://localhost:8080/api/suppliers', {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data) {
                setTimeout(() => {
                    dispatch({
                        type: CarActionTypes.SUPPLIERS_LOADED,
                        payload: data,
                    });
                }, 2000);
            } else {
                dispatch({
                    type: CarActionTypes.SUPPLIERS_FAIL,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: CarActionTypes.SUPPLIERS_FAIL,
            });
        });
};
