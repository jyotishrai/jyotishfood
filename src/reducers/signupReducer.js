import * as Utils from '../utility';

export default function singupReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_SIGNUP_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_SIGNUP_SUCCESS:
            return { ...state, fetching: false, error: null, singupRes: action.payload };
            break;
        case Utils.ApiTypes.API_SIGNUP_FAILURE:
            return { ...state, fetching: false, error: action.error, singupRes: null };
            break;
        case Utils.ApiTypes.API_SIGNUP_CLEAR:
            return { ...state, fetching: false, error: action.error, singupRes: undefined };
            break;
        default:
            return state;
    }
}