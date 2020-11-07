import * as Utils from '../utility';

export default function getNearByRestaurantReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_SUCCESS:
            return { ...state, fetching: false, error: null, nearbyRestaurant: action.payload };
            break;
        case Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_FAILURE:
            return { ...state, fetching: false, error: action.error, nearbyRestaurant: null };
            break;
        case Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_CLEAR:
            return { ...state, fetching: false, error: action.error, nearbyRestaurant: undefined };
            break;

        default:
            return state;
    }
}