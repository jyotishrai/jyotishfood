import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* rateHotelSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_RATE_HOTEL_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_RATE_HOTEL_FAILURE })
    }
}