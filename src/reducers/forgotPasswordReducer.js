import * as Utils from '../utility';

export default function forgotPasswordReducer(state = {}, action) {

    switch (action.type) {
        case Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_SUCCESS:
            return { ...state, fetching: false, error: null, forgotOtpSendRes: action.payload };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_FAILURE:
            return { ...state, fetching: false, error: action.error, forgotOtpSendRes: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_CLEAR:
            return { ...state, fetching: false, error: action.error, forgotOtpSendRes: undefined };
            break;

        case Utils.ApiTypes.API_FORGOT_PASSWORD_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_SUCCESS:
            return { ...state, fetching: false, error: null, forgotPasswordRes: action.payload };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_FAILURE:
            return { ...state, fetching: false, error: action.error, forgotPasswordRes: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_CLEAR:
            return { ...state, fetching: false, error: action.error, forgotPasswordRes: undefined };
            break;

        case Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_METHOD:
            return { ...state, fetching: true, error: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_SUCCESS:
            return { ...state, fetching: false, error: null, forgotOtpReSendRes: action.payload };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_FAILURE:
            return { ...state, fetching: false, error: action.error, forgotOtpReSendRes: null };
            break;
        case Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_CLEAR:
            return { ...state, fetching: false, error: action.error, forgotOtpReSendRes: undefined };
            break;

        default:
            return state;
    }
}