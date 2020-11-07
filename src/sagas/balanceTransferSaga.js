import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* getRestaurantListSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_RESTAURANT_LIST_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_RESTAURANT_LIST_FAILURE })
    }
}

export function* getAvailableBalanceForRestaurantSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_FAILURE })
    }
}

export function* balanceTransferSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_BALANCE_TRANSFER_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_BALANCE_TRANSFER_FAILURE })
    }
}