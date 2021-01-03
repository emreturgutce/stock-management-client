import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getSuppliers = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.SUPPLIERS_LOADING,
    });

    fetch(`${BASE_URL}/api/suppliers`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data) {
                dispatch({
                    type: CarActionTypes.SUPPLIERS_LOADED,
                    payload: data,
                });
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
