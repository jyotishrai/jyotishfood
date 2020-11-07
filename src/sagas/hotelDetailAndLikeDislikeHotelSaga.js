import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* hotelDetailSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_HOTEL_DETAIL_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_HOTEL_DETAIL_FAILURE })
    }
}

export function* likeDislikeHotelSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_FAILURE })
    }
}