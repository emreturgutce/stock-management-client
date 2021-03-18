import { BASE_URL } from '../../constants/index';
import { CarActionTypes } from '../types';

export const getPersonnels = () => (dispatch) => {
    dispatch({
        type: CarActionTypes.PERSONNELS_LOADING,
    });

    fetch(`${BASE_URL}/api/personels`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data) {
                dispatch({
                    type: CarActionTypes.PERSONNELS_LOADED,
                    payload: data,
                });
            } else {
                dispatch({
                    type: CarActionTypes.PERSONNELS_FAIL,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: CarActionTypes.PERSONNELS_FAIL,
            });
        });
};
