import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* loginWithOtpSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_LOGIN_WITH_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LOGIN_WITH_OTP_FAILURE })
    }
}

export function* loginWithOtpVerifySaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_FAILURE })
    }
}

export function* loginWithOtpResendOtpSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_FAILURE })
    }
}