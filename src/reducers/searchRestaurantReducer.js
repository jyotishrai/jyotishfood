import * as Utils from '../utility';

export default function searchRestaurantReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_SEARCH_RESTAURANT_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_SEARCH_RESTAURANT_SUCCESS:
            return { ...state, fetching: false, error: null, searchRestaurantData: action.payload };
            break;
        case Utils.ApiTypes.API_SEARCH_RESTAURANT_FAILURE:
            return { ...state, fetching: false, error: action.error, searchRestaurantData: null };
            break;
        case Utils.ApiTypes.API_SEARCH_RESTAURANT_CLEAR:
            return { ...state, fetching: false, error: action.error, searchRestaurantData: undefined };
            break;

        default:
            return state;
    }
}