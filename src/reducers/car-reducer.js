import { CarActionTypes } from '../actions/types';

const initialState = {
    isLoading: false,
    cars: [],
    errors: [],
};

export function carReducer(state = initialState, action) {
    switch (action.type) {
        case CarActionTypes.CARS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CarActionTypes.CARS_LOADED:
            return {
                ...state,
                isLoading: false,
                cars: action.payload,
            };
        case CarActionTypes.CARS_FAIL:
            return {
                ...state,
                isLoading: false,
                errors: action.payload?.error
                    ? [action.payload?.error]
                    : state.errors,
            };
        default:
            return state;
    }
}
