import * as Utils from '../utility';

export default function rateHotelReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_RATE_HOTEL_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_RATE_HOTEL_SUCCESS:
            return { ...state, fetching: false, error: null, rateHotelRes: action.payload };
            break;
        case Utils.ApiTypes.API_RATE_HOTEL_FAILURE:
            return { ...state, fetching: false, error: action.error, rateHotelRes: null };
            break;
        case Utils.ApiTypes.API_RATE_HOTEL_CLEAR:
            return { ...state, fetching: false, error: action.error, rateHotelRes: undefined };
            break;

        default:
            return state;
    }
}