import * as Utils from '../utility';

export default function getFaqReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_FAQ_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_FAQ_SUCCESS:
            return { ...state, fetching: false, error: null, faqList: action.payload };
            break;
        case Utils.ApiTypes.API_GET_FAQ_FAILURE:
            return { ...state, fetching: false, error: action.error, faqList: null };
            break;
        case Utils.ApiTypes.API_GET_FAQ_CLEAR:
            return { ...state, fetching: false, error: action.error, faqList: undefined };
            break;

        default:
            return state;
    }
}