import * as Utils from '../utility';

export default function reportReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_REPORT_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_REPORT_SUCCESS:
            return { ...state, fetching: false, error: null, reportRes: action.payload };
            break;
        case Utils.ApiTypes.API_REPORT_FAILURE:
            return { ...state, fetching: false, error: action.error, reportRes: null };
            break;
        case Utils.ApiTypes.API_REPORT_CLEAR:
            return { ...state, fetching: false, error: action.error, reportRes: undefined };
            break;

        default:
            return state;
    }
}