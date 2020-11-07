import * as Utils from '../utility';

export default function getCashbackHistoryReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_SUCCESS:
            return { ...state, fetching: false, error: null, earnedCashbackHistory: action.payload };
            break;
        case Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_FAILURE:
            return { ...state, fetching: false, error: action.error, earnedCashbackHistory: null };
            break;
        case Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_CLEAR:
            return { ...state, fetching: false, error: action.error, earnedCashbackHistory: undefined };
            break;

        case Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_SUCCESS:
            return { ...state, fetching: false, error: null, redeemedCashbackHistory: action.payload };
            break;
        case Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_FAILURE:
            return { ...state, fetching: false, error: action.error, redeemedCashbackHistory: null };
            break;
        case Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_CLEAR:
            return { ...state, fetching: false, error: action.error, redeemedCashbackHistory: undefined };
            break;

        default:
            return state;
    }
}