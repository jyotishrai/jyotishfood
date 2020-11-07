import * as Utils from '../utility';

export default function getHotPlateDayHotelsReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_SUCCESS:
            return { ...state, fetching: false, error: null, hotPlateDayRes: action.payload };
            break;
        case Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_FAILURE:
            return { ...state, fetching: false, error: action.error, hotPlateDayRes: null };
            break;
        case Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_CLEAR:
            return { ...state, fetching: false, error: action.error, hotPlateDayRes: undefined };
            break;

        default:
            return state;
    }
}