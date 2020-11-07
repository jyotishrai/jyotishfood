import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getEarnedCashbackHistorySaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_FAILURE })
    }
}

export function* getRedeemedCashbackHistorySaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_FAILURE })
    }
}