import * as Utils from '../utility';

export default function getUserCashbackReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_SUCCESS:
            return { ...state, fetching: false, error: null, userExpiredCashback: action.payload };
            break;
        case Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_FAILURE:
            return { ...state, fetching: false, error: action.error, userExpiredCashback: null };
            break;
        case Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_CLEAR:
            return { ...state, fetching: false, error: action.error, userExpiredCashback: undefined };
            break;

        case Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_SUCCESS:
            return { ...state, fetching: false, error: null, userAvailableCashback: action.payload };
            break;
        case Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_FAILURE:
            return { ...state, fetching: false, error: action.error, userAvailableCashback: null };
            break;
        case Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_CLEAR:
            return { ...state, fetching: false, error: action.error, userAvailableCashback: undefined };
            break;

        default:
            return state;
    }
}