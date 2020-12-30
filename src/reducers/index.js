import { combineReducers } from 'redux';
import { authReducer } from './auth-reducer';
import { carReducer } from './car-reducer';

export default combineReducers({
    auth: authReducer,
    car: carReducer,
});
