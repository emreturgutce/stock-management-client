import { CarActionTypes } from '../actions/types'; 
const initialState = {
	isLoading: false,
	cars: [],
	manufacturers: [],
	suppliers: [],
	personnels: [],
	colors: [],
	sales: [],
	latestSales: [],
	allSales: [],
	totalProfit: 0,
	totalCustomer: 0,
	totalRevenue: 0,
	awaitingEvents: [],
	completedEvents: [],
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
		case CarActionTypes.PERSONNELS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.PERSONNELS_LOADED:
			return {
				...state,
				isLoading: false,
				personnels: action.payload,
			};
		case CarActionTypes.PERSONNELS_FAIL:
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
		case CarActionTypes.ALL_SALES_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.ALL_SALES_LOADED:
			return {
				...state,
				isLoading: false,
				allSales: action.payload,
			};
		case CarActionTypes.ALL_SALES_FAIL:
			return {
				...state,
				isLoading: false,
				errors: action.payload?.error
					? [action.payload?.error]
					: state.errors,
			};
		case CarActionTypes.AWAITING_EVENTS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.AWAITING_EVENTS_LOADED:
			return {
				...state,
				isLoading: false,
				awaitingEvents: action.payload,
			};
		case CarActionTypes.AWAITING_EVENTS_FAIL:
			return {
				...state,
				isLoading: false,
				errors: action.payload?.error
					? [action.payload?.error]
					: state.errors,
			};
		case CarActionTypes.COMPLETED_EVENTS_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case CarActionTypes.COMPLETED_EVENTS_LOADED:
			return {
				...state,
				isLoading: false,
				completedEvents: action.payload,
			};
		case CarActionTypes.COMPLETED_EVENTS_FAIL:
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
