import * as Utils from '../utility';

export default function listCashbackReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_SUCCESS:
            return { ...state, fetching: false, error: null, expiredCashbackRes: action.payload };
            break;
        case Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_FAILURE:
            return { ...state, fetching: false, error: action.error, expiredCashbackRes: null };
            break;
        case Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_CLEAR:
            return { ...state, fetching: false, error: action.error, expiredCashbackRes: undefined };
            break;

        case Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_SUCCESS:
            return { ...state, fetching: false, error: null, availableCashbackRes: action.payload };
            break;
        case Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_FAILURE:
            return { ...state, fetching: false, error: action.error, availableCashbackRes: null };
            break;
        case Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_CLEAR:
            return { ...state, fetching: false, error: action.error, availableCashbackRes: undefined };
            break;

        default:
            return state;
    }
}