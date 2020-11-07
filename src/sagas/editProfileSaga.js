import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';
import { updateProfileApiCall } from '../services/apiCall'

export function* editProfileSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_EDIT_PROFILE_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_EDIT_PROFILE_FAILURE })
    }
}