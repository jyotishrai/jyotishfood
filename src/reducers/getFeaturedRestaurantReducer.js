import * as Utils from '../utility';

export default function getFeaturedRestaurantReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_SUCCESS:
            return { ...state, fetching: false, error: null, featuredRestaurant: action.payload };
            break;
        case Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_FAILURE:
            return { ...state, fetching: false, error: action.error, featuredRestaurant: null };
            break;
        case Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_CLEAR:
            return { ...state, fetching: false, error: action.error, featuredRestaurant: undefined };
            break;

        default:
            return state;
    }
}