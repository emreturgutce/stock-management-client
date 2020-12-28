import { AuthActionTypes } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    errors: [],
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case AuthActionTypes.USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case AuthActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            };
        case AuthActionTypes.AUTH_SUCCESS:
        case AuthActionTypes.LOGIN_SUCCESS:
        case AuthActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                user: {
                    id: action.payload?.id,
                    name: action.payload?.name,
                },
                isAuthenticated: true,
                isLoading: false,
            };
        case AuthActionTypes.AUTH_FAIL:
        case AuthActionTypes.LOGIN_FAIL:
        case AuthActionTypes.REGISTER_FAIL:
        case AuthActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                errors: action.payload?.error
                    ? [action.payload?.error]
                    : state.errors,
            };
        case AuthActionTypes.CLEAN_ERRORS:
            return {
                ...state,
                errors: [],
            };
        default:
            return state;
    }
}
