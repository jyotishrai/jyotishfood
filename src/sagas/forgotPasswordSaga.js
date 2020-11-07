import { put, takeLatest, all } from 'redux-saga/effects';
import * as Utils from '../utility';
import callApis from '../services/apiCall';

export function* forgotPasswordOtpSendSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_FAILURE })
    }
}

export function* forgotPasswordSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_FAILURE })
    }
}

export function* forgotPasswordResendOtpSaga(action) {
    try {
        const data = yield callApis(action)
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_FAILURE })
    }
}