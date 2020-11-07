import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getUserExpiredCashbackSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_FAILURE })
    }
}

export function* getUserAvailableCashbackSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_FAILURE })
    }
}