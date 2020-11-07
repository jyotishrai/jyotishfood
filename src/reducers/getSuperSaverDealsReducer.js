import * as Utils from '../utility';

export default function getSuperSaverDealsReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_SUCCESS:
            return { ...state, fetching: false, error: null, superSaverRes: action.payload };
            break;
        case Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_FAILURE:
            return { ...state, fetching: false, error: action.error, superSaverRes: null };
            break;
        case Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_CLEAR:
            return { ...state, fetching: false, error: action.error, superSaverRes: undefined };
            break;

        default:
            return state;
    }
}