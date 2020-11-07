import * as Utils from '../utility';

export default function getHomeBannerReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_BANNER_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_BANNER_SUCCESS:
            return { ...state, fetching: false, error: null, homeBanner: action.payload };
            break;
        case Utils.ApiTypes.API_GET_BANNER_FAILURE:
            return { ...state, fetching: false, error: action.error, homeBanner: null };
            break;
        case Utils.ApiTypes.API_GET_BANNER_CLEAR:
            return { ...state, fetching: false, error: action.error, homeBanner: undefined };
            break;

        default:
            return state;
    }
}