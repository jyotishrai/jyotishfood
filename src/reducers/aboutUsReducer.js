import * as Utils from '../utility';

export default function aboutUsReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_ABOUT_US_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_ABOUT_US_SUCCESS:
            return { ...state, fetching: false, error: null, aboutRes: action.payload };
            break;
        case Utils.ApiTypes.API_ABOUT_US_FAILURE:
            return { ...state, fetching: false, error: action.error, aboutRes: null };
            break;
        case Utils.ApiTypes.API_ABOUT_US_CLEAR:
            return { ...state, fetching: false, error: action.error, aboutRes: undefined };
            break;

        default:
            return state;
    }
}