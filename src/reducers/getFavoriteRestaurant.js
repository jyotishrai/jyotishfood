import * as Utils from '../utility';

export default function getFavoriteRestaurantReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_SUCCESS:
            return { ...state, fetching: false, error: null, favoriteRestaurant: action.payload };
            break;
        case Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_FAILURE:
            return { ...state, fetching: false, error: action.error, favoriteRestaurant: null };
            break;
        case Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_CLEAR:
            return { ...state, fetching: false, error: action.error, favoriteRestaurant: undefined };
            break;

        default:
            return state;
    }
}