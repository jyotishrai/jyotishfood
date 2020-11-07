import * as Utils from '../utility';

export default function hotelDetailAndLikeDisLikeReducerReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_GET_HOTEL_DETAIL_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_GET_HOTEL_DETAIL_SUCCESS:
            return { ...state, fetching: false, error: null, hotelDetailData: action.payload };
            break;
        case Utils.ApiTypes.API_GET_HOTEL_DETAIL_FAILURE:
            return { ...state, fetching: false, error: action.error, hotelDetailData: null };
            break;
        case Utils.ApiTypes.API_GET_HOTEL_DETAIL_CLEAR:
            return { ...state, fetching: false, error: action.error, hotelDetailData: undefined };
            break;

        case Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_SUCCESS:
            return { ...state, fetching: false, error: null, likeDislikeHotelData: action.payload };
            break;
        case Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_FAILURE:
            return { ...state, fetching: false, error: action.error, likeDislikeHotelData: null };
            break;
        case Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_CLEAR:
            return { ...state, fetching: false, error: action.error, likeDislikeHotelData: undefined };
            break;

        default:
            return state;
    }
}