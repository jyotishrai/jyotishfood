import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* aboutUsSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_ABOUT_US_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_ABOUT_US_CLEAR })
    }
}