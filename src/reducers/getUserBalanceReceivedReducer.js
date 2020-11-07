import * as Utils from '../utility';

export default function getUserBalanceReceivedReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_SUCCESS:
            return { ...state, fetching: false, error: null, receivedBalanceData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_FAILURE:
            return { ...state, fetching: false, error: action.error, receivedBalanceData: null };
            break;
        case Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_CLEAR:
            return { ...state, fetching: false, error: action.error, receivedBalanceData: undefined };
            break;

        default:
            return state;
    }
}