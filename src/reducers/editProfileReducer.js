import * as Utils from '../utility';

export default function editProfileReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_EDIT_PROFILE_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_EDIT_PROFILE_SUCCESS:
            return { ...state, fetching: false, error: null, editProfileRes: action.payload };
            break;
        case Utils.ApiTypes.API_EDIT_PROFILE_FAILURE:
            return { ...state, fetching: false, error: action.error, editProfileRes: null };
            break;
        case Utils.ApiTypes.API_EDIT_PROFILE_CLEAR:
            return { ...state, fetching: false, error: action.error, editProfileRes: undefined };
            break;

        default:
            return state;
    }
}