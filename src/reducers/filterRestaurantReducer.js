import * as Utils from '../utility';

export default function filterRestaurantReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_FILTER_RESTAURANT_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_FILTER_RESTAURANT_SUCCESS:
            return { ...state, fetching: false, error: null, filterRes: action.payload };
            break;
        case Utils.ApiTypes.API_FILTER_RESTAURANT_FAILURE:
            return { ...state, fetching: false, error: action.error, filterRes: null };
            break;
        case Utils.ApiTypes.API_FILTER_RESTAURANT_CLEAR:
            return { ...state, fetching: false, error: action.error, filterRes: undefined };
            break;

        default:
            return state;
    }
}