import * as Utils from '../utility';

////////////////////////////////////
export function loginAction(action) {
    return {
        type: Utils.ApiTypes.API_LOGIN_METHOD,
        payload: action
    }
}

export function clearLoginAction() {
    return {
        type: Utils.ApiTypes.API_LOGIN_CLEAR,
    }
}

////////////////////////////////////
export function signupAction(action) {
    return {
        type: Utils.ApiTypes.API_SIGNUP_METHOD,
        payload: action
    }
}

export function clearSignupAction() {
    return {
        type: Utils.ApiTypes.API_SIGNUP_CLEAR,
    }
}

////////////////////////////////////
export function loginWithOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_LOGIN_WITH_OTP_METHOD,
        payload: action
    }
}

export function clearLoginWithOtpAction() {
    return {
        type: Utils.ApiTypes.API_LOGIN_WITH_OTP_CLEAR
    }
}

export function loginWithOtpVerifyAction(action) {
    return {
        type: Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_METHOD,
        payload: action
    }
}

export function clearLoginWithOtpVerifyAction() {
    return {
        type: Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_CLEAR
    }
}

export function loginWithOtpResendOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_METHOD,
        payload: action
    }
}

export function clearLoginWithOtpResendOtpAction() {
    return {
        type: Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_CLEAR
    }
}

////////////////////////////////////
export function getHomeBannersAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_BANNER_METHOD,
        payload: action
    }
}

export function clearGetHomeBannersAction() {
    return {
        type: Utils.ApiTypes.API_GET_BANNER_CLEAR
    }
}

////////////////////////////////////
export function searchRestaurantAction(action) {
    return {
        type: Utils.ApiTypes.API_SEARCH_RESTAURANT_METHOD,
        payload: action
    }
}

export function clearSearchRestaurantAction() {
    return {
        type: Utils.ApiTypes.API_SEARCH_RESTAURANT_CLEAR
    }
}

//////////////////////////////////////
export function getHotelDetailAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_HOTEL_DETAIL_METHOD,
        payload: action
    }
}

export function clearGetHotelDetailAction() {
    return {
        type: Utils.ApiTypes.API_GET_HOTEL_DETAIL_CLEAR
    }
}

//////////////////////////////////////
export function likeDislikeHotelAction(action) {
    return {
        type: Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_METHOD,
        payload: action
    }
}

export function clearLikeDislikeHotelAction() {
    return {
        type: Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_CLEAR
    }
}

//////////////////////////////////////
export function getNearbyRestaurantAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_METHOD,
        payload: action
    }
}

export function clearGetNearbyRestaurantAction() {
    return {
        type: Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_CLEAR
    }
}

//////////////////////////////////////
export function getFeaturedRestaurantAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_METHOD,
        payload: action
    }
}

export function clearGetFeaturedRestaurantAction() {
    return {
        type: Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_CLEAR
    }
}

//////////////////////////////////////
export function getEarnedCashbackHistoryAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_METHOD,
        payload: action
    }
}

export function clearGetEarnedCashbackHistoryAction() {
    return {
        type: Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_CLEAR
    }
}

//////////////////////////////////////
export function getRedeemedCashbackHistoryAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_METHOD,
        payload: action
    }
}

export function clearGetRedeemedCashbackHistoryAction() {
    return {
        type: Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_CLEAR
    }
}

//////////////////////////////////////
export function getUserExpiredCashbackAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_METHOD,
        payload: action
    }
}

export function clearGetUserExpiredCashbackAction() {
    return {
        type: Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_CLEAR
    }
}

//////////////////////////////////////
export function getUserAvailableCashbackAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_METHOD,
        payload: action
    }
}

export function clearGetUserAvailableCashbackAction() {
    return {
        type: Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_CLEAR
    }
}

//////////////////////////////////////
export function getUserBalanceReceivedAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_METHOD,
        payload: action
    }
}

export function clearGetUserBalanceReceivedAction() {
    return {
        type: Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_CLEAR
    }
}

//////////////////////////////////////
export function getRestaurantListAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_RESTAURANT_LIST_METHOD,
        payload: action
    }
}

export function clearGetRestaurantListAction() {
    return {
        type: Utils.ApiTypes.API_GET_RESTAURANT_LIST_CLEAR
    }
}

//////////////////////////////////////
export function getAvailableBalanceForRestroAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_METHOD,
        payload: action
    }
}

export function clearGetAvailableBalanceForRestroAction() {
    return {
        type: Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_CLEAR
    }
}

//////////////////////////////////////
export function balanceTransferAction(action) {
    return {
        type: Utils.ApiTypes.API_BALANCE_TRANSFER_METHOD,
        payload: action
    }
}

export function clearbalanceTransferAction() {
    return {
        type: Utils.ApiTypes.API_BALANCE_TRANSFER_CLEAR
    }
}

//////////////////////////////////////
export function getFaqAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_FAQ_METHOD,
        payload: action
    }
}

export function clearGetFaqAction() {
    return {
        type: Utils.ApiTypes.API_GET_FAQ_CLEAR
    }
}

//////////////////////////////////////
export function reportAction(action) {
    return {
        type: Utils.ApiTypes.API_REPORT_METHOD,
        payload: action
    }
}

export function clearReportAction() {
    return {
        type: Utils.ApiTypes.API_REPORT_CLEAR
    }
}

//////////////////////////////////////
export function aboutUsAction(action) {
    return {
        type: Utils.ApiTypes.API_ABOUT_US_METHOD,
        payload: action
    }
}

export function clearaboutUsAction() {
    return {
        type: Utils.ApiTypes.API_ABOUT_US_CLEAR
    }
}

//////////////////////////////////////
export function getFavoriteRestaurantAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_METHOD,
        payload: action
    }
}

export function clearGetFavoriteRestaurantAction() {
    return {
        type: Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_CLEAR
    }
}

//////////////////////////////////////
export function filterRestaurantAction(action) {
    return {
        type: Utils.ApiTypes.API_FILTER_RESTAURANT_METHOD,
        payload: action
    }
}

export function clearFilterRestaurantAction() {
    return {
        type: Utils.ApiTypes.API_FILTER_RESTAURANT_CLEAR
    }
}

//////////////////////////////////////
export function editProfileAction(action) {
    return {
        type: Utils.ApiTypes.API_EDIT_PROFILE_METHOD,
        payload: action
    }
}

export function clearEditProfileAction() {
    return {
        type: Utils.ApiTypes.API_EDIT_PROFILE_CLEAR
    }
}

//////////////////////////////////////
export function getNotificationAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_NOTIFICATION_METHOD,
        payload: action
    }
}

export function clearGetNotificationAction() {
    return {
        type: Utils.ApiTypes.API_GET_NOTIFICATION_CLEAR
    }
}

//////////////////////////////////////
export function getSuperSaverDealsAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_METHOD,
        payload: action
    }
}

export function cleargetSuperSaverDealsAction() {
    return {
        type: Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_CLEAR
    }
}

//////////////////////////////////////
export function HotPlateDayHotelAction(action) {
    return {
        type: Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_METHOD,
        payload: action
    }
}

export function clearHotPlateDayHotelAction() {
    return {
        type: Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_CLEAR
    }
}

//////////////////////////////////////
export function rateHotelAction(action) {
    return {
        type: Utils.ApiTypes.API_RATE_HOTEL_METHOD,
        payload: action
    }
}

export function clearRateHotelAction() {
    return {
        type: Utils.ApiTypes.API_RATE_HOTEL_CLEAR
    }
}

//////////////////////////////////////
export function forgotPasswordOtpSendAction(action) {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_METHOD,
        payload: action
    }
}

export function clearForgotPasswordOtpSendAction() {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_CLEAR
    }
}

//////////////////////////////////////
export function forgotPasswordAction(action) {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_METHOD,
        payload: action
    }
}

export function clearForgotPasswordAction() {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_CLEAR
    }
}

//////////////////////////////////////
export function forgotPasswordResendOtpAction(action) {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_METHOD,
        payload: action
    }
}

export function clearForgotPasswordResendOtpAction() {
    return {
        type: Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_CLEAR
    }
}

//////////////////////////////////////
export function listExpiredCashbackAction(action) {
    return {
        type: Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_METHOD,
        payload: action
    }
}

export function clearListExpiredCashbackAction() {
    return {
        type: Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_CLEAR
    }
}

//////////////////////////////////////
export function listAvailableCashbackAction(action) {
    return {
        type: Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_METHOD,
        payload: action
    }
}

export function clearListAvailableCashbackAction() {
    return {
        type: Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_CLEAR
    }
}