import { CarActionTypes } from '../actions/types';

const initialState = {
	isLoading: false,
	cars: [],
	manufacturers: [],
	suppliers: [],
	colors: [],
	sales: [],
	latestSales: [],
	totalProfit: 0,
	totalCustomer: 0,
	totalRevenue: 0,
	errors: [],
};

export function carReducer(state = initialState, action) {
	switch (action.type) {
		case CarActionTypes.CARS_LOADING:
			return {
				...state,
				isLoading: true,
				cars: [],
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
		case CarActionTypes.COLORS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.COLORS_LOADED:
			return {
				...state,
				isLoading: false,
				colors: action.payload,
			};
		case CarActionTypes.COLORS_FAIL:
			return {
				...state,
				isLoading: false,
				errors: action.payload?.error
					? [action.payload?.error]
					: state.errors,
			};
		case CarActionTypes.SALES_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.SALES_LOADED:
			return {
				...state,
				isLoading: false,
				sales: action.payload,
			};
		case CarActionTypes.SALES_FAIL:
			return {
				...state,
				isLoading: false,
				errors: action.payload?.error
					? [action.payload?.error]
					: state.errors,
			};
		case CarActionTypes.TOTAL_PROFIT:
			return {
				...state,
				totalProfit: action.payload,
			};
		case CarActionTypes.TOTAL_CUSTOMER:
			return {
				...state,
				totalCustomer: action.payload,
			};
		case CarActionTypes.TOTAL_REVENUE:
			return {
				...state,
				totalRevenue: action.payload,
			};
		case CarActionTypes.LATEST_SALES_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.LATEST_SALES_LOADED:
			return {
				...state,
				isLoading: false,
				latestSales: action.payload,
			};
		case CarActionTypes.LATEST_SALES_FAIL:
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
