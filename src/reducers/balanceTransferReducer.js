import * as Utils from '../utility';

export default function balanceTransferReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_RESTAURANT_LIST_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_GET_RESTAURANT_LIST_SUCCESS:
            return { ...state, fetching: false, error: null, restaurantList: action.payload };
            break;
        case Utils.ApiTypes.API_GET_RESTAURANT_LIST_FAILURE:
            return { ...state, fetching: false, error: action.error, restaurantList: null };
            break;
        case Utils.ApiTypes.API_GET_RESTAURANT_LIST_CLEAR:
            return { ...state, fetching: false, error: action.error, restaurantList: undefined };
            break;

        case Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_METHOD:
            return { ...state, fetching: false, error: null };
            break;
        case Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_SUCCESS:
            return { ...state, fetching: false, error: null, availableBalance: action.payload };
            break;
        case Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_FAILURE:
            return { ...state, fetching: false, error: action.error, availableBalance: null };
            break;
        case Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_CLEAR:
            return { ...state, fetching: false, error: action.error, availableBalance: undefined };
            break;

        case Utils.ApiTypes.API_BALANCE_TRANSFER_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_BALANCE_TRANSFER_SUCCESS:
            return { ...state, fetching: false, error: null, balanceTransferRes: action.payload };
            break;
        case Utils.ApiTypes.API_BALANCE_TRANSFER_FAILURE:
            return { ...state, fetching: false, error: action.error, balanceTransferRes: null };
            break;
        case Utils.ApiTypes.API_BALANCE_TRANSFER_CLEAR:
            return { ...state, fetching: false, error: action.error, balanceTransferRes: undefined };
            break;

        default:
            return state;
    }
}