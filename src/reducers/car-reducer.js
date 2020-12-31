import { CarActionTypes } from '../actions/types';

const initialState = {
    isLoading: false,
    cars: [],
    manufacturers: [],
    suppliers: [],
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
        case CarActionTypes.MANUFACTURERS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CarActionTypes.MANUFACTURERS_LOADED:
            return {
                ...state,
                isLoading: false,
                manufacturers: action.payload,
            };
        case CarActionTypes.MANUFACTURER_FAIL:
            return {
                ...state,
                isLoading: false,
                errors: action.payload?.error
                    ? [action.payload?.error]
                    : state.errors,
            };
        case CarActionTypes.SUPPLIERS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CarActionTypes.SUPPLIERS_LOADED:
            return {
                ...state,
                isLoading: false,
                suppliers: action.payload,
            };
        case CarActionTypes.SUPPLIERS_FAIL:
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
