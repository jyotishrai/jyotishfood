import * as Utils from '../utility';

export default function loginWithOtpReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_SUCCESS:
            return { ...state, fetching: false, error: null, loginWithOtpRes: action.payload };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_FAILURE:
            return { ...state, fetching: false, error: action.error, loginWithOtpRes: null };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_CLEAR:
            return { ...state, fetching: false, error: action.error, loginWithOtpRes: undefined };
            break;

        case Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_SUCCESS:
            return { ...state, fetching: false, error: null, loginWithOtpVerifyRes: action.payload };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_FAILURE:
            return { ...state, fetching: false, error: action.error, loginWithOtpVerifyRes: null };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_CLEAR:
            return { ...state, fetching: false, error: action.error, loginWithOtpVerifyRes: undefined };
            break;

        case Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_SUCCESS:
            return { ...state, fetching: false, error: null, loginWithOtpResendOtpRes: action.payload };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_FAILURE:
            return { ...state, fetching: false, error: action.error, loginWithOtpResendOtpRes: null };
            break;
        case Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_CLEAR:
            return { ...state, fetching: false, error: action.error, loginWithOtpResendOtpRes: undefined };
            break;
        default:
            return state;
    }
}