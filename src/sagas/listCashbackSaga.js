import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* listExpiredCashbackSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_FAILURE })
    }
}

export function* listAvailableCashbackSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_FAILURE })
    }
}