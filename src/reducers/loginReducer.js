import * as Utils from '../utility';

export default function loginReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_LOGIN_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LOGIN_SUCCESS:
            return { ...state, fetching: false, error: null, loginRes: action.payload };
            break;
        case Utils.ApiTypes.API_LOGIN_FAILURE:
            return { ...state, fetching: false, error: action.error, loginRes: null };
            break;
        case Utils.ApiTypes.API_LOGIN_CLEAR:
            return { ...state, fetching: false, error: action.error, loginRes: undefined };
            break;
        default:
            return state;
    }
}