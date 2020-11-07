import { all, takeLatest } from 'redux-saga/effects';
import * as Utils from '../utility';
import { loginSaga } from './loginSaga'
import { signupSaga } from './signupSaga';
import { loginWithOtpSaga, loginWithOtpVerifySaga, loginWithOtpResendOtpSaga } from './loginWithOtpSaga';
import { homeBannerSaga } from './getHomeBannerSaga'
import { searchRestaurantSaga } from './searchRestaurantSaga';
import { hotelDetailSaga, likeDislikeHotelSaga } from './hotelDetailAndLikeDislikeHotelSaga';
import { getNearByRestaurantSaga } from './getNearByRestaurantSaga';
import { getFeaturedRestaurantSaga } from './getFeaturedRestaurantSaga';
import { getEarnedCashbackHistorySaga, getRedeemedCashbackHistorySaga } from './getCashbackHistorySaga';
import { getUserExpiredCashbackSaga, getUserAvailableCashbackSaga } from './getUserCashbackSaga';
import { getUserBalanceReceivedSaga } from './getUserBalanceReceivedSaga';
import { getRestaurantListSaga, getAvailableBalanceForRestaurantSaga, balanceTransferSaga } from './balanceTransferSaga';
import { getFaqSaga } from './getFaqSaga';
import { reportSaga } from './reportSaga';
import { aboutUsSaga } from './aboutUsSaga';
import { getFavoriteRestaurantSaga } from './getFavoriteRestaurantSaga';
import { filterRestaurantSaga } from './filterRestaurantSaga';
import { editProfileSaga } from './editProfileSaga';
import { getNotificationSaga } from './getNotificationSaga';
import { getSuperSaverDealsSaga } from './getSuperSaverDealsSaga';
import { getHotPlateDayHotelSaga } from './getHotPlateDayHotelSaga';
import { rateHotelSaga } from './rateHotelSaga';
import { forgotPasswordOtpSendSaga, forgotPasswordSaga, forgotPasswordResendOtpSaga } from './forgotPasswordSaga';
import { listExpiredCashbackSaga, listAvailableCashbackSaga } from './listCashbackSaga';

function* watchLoginAction() {
    yield takeLatest(Utils.ApiTypes.API_LOGIN_METHOD, loginSaga)
}

function* watchSignupAction() {
    yield takeLatest(Utils.ApiTypes.API_SIGNUP_METHOD, signupSaga)
}

function* watchLoginWithOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_LOGIN_WITH_OTP_METHOD, loginWithOtpSaga)
}

function* watchLoginWithOtpVerifyAction() {
    yield takeLatest(Utils.ApiTypes.API_LOGIN_WITH_OTP_VERIFY_METHOD, loginWithOtpVerifySaga)
}

function* watchLoginWithOtpResendOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_LOGIN_WITH_OTP_RESEND_OTP_METHOD, loginWithOtpResendOtpSaga)
}

function* watchHomeBannerAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_BANNER_METHOD, homeBannerSaga)
}

function* watchSearchRestaurantAction() {
    yield takeLatest(Utils.ApiTypes.API_SEARCH_RESTAURANT_METHOD, searchRestaurantSaga)
}

function* watchHotelDetailAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_HOTEL_DETAIL_METHOD, hotelDetailSaga)
}

function* watchLikeDislikeHotelAction() {
    yield takeLatest(Utils.ApiTypes.API_LIKE_DISLIKE_HOTEL_METHOD, likeDislikeHotelSaga)
}

function* watchGetNearbyRestaurantAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_NEARBY_RESTAURANT_METHOD, getNearByRestaurantSaga)
}

function* watchGetFeaturedRestaurantAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_FEATURED_RESTAURANT_METHOD, getFeaturedRestaurantSaga)
}

function* watchGetEarnedCashbackHistoryAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_EARNED_CASHBACK_HISTORY_METHOD, getEarnedCashbackHistorySaga)
}

function* watchGetRedeemedCashbackHistoryAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_REDEEMED_CASHBACK_HISTORY_METHOD, getRedeemedCashbackHistorySaga)
}

function* watchGetUserExpiredCashbackAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_USER_EXPIRED_CASHBACK_METHOD, getUserExpiredCashbackSaga)
}

function* watchGetUserAvailableCashbackAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_USER_AVAILABLE_CASHBACK_METHOD, getUserAvailableCashbackSaga)
}

function* watchGetUserBalanceReceivedAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_USER_BALANCE_RECEIVED_METHOD, getUserBalanceReceivedSaga)
}

function* watchGetRestaurantListAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_RESTAURANT_LIST_METHOD, getRestaurantListSaga)
}

function* watchGetAvailableBalanceForRestroAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_AVAILABLE_BALANCE_FOR_RESTRO_METHOD, getAvailableBalanceForRestaurantSaga)
}

function* watchBalanceTransferAction() {
    yield takeLatest(Utils.ApiTypes.API_BALANCE_TRANSFER_METHOD, balanceTransferSaga)
}

function* watchGetFaqAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_FAQ_METHOD, getFaqSaga)
}

function* watchReportAction() {
    yield takeLatest(Utils.ApiTypes.API_REPORT_METHOD, reportSaga)
}

function* watchAboutAction() {
    yield takeLatest(Utils.ApiTypes.API_ABOUT_US_METHOD, aboutUsSaga)
}

function* watchGetFavoriteRestaurantAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_FAVORITE_RESTAURANT_METHOD, getFavoriteRestaurantSaga)
}

function* watchFilterRestaurantAction() {
    yield takeLatest(Utils.ApiTypes.API_FILTER_RESTAURANT_METHOD, filterRestaurantSaga)
}

function* watchEditProfileAction() {
    yield takeLatest(Utils.ApiTypes.API_EDIT_PROFILE_METHOD, editProfileSaga)
}

function* watchGetNotificationAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_NOTIFICATION_METHOD, getNotificationSaga)
}

function* watchGetSuperSaverDealsAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_SUPER_SAVER_DEALS_METHOD, getSuperSaverDealsSaga)
}

function* watchGetHotPlateDayHotelAction() {
    yield takeLatest(Utils.ApiTypes.API_GET_HOT_PLATE_DAY_HOTEL_METHOD, getHotPlateDayHotelSaga)
}

function* watchRateHotelAction() {
    yield takeLatest(Utils.ApiTypes.API_RATE_HOTEL_METHOD, rateHotelSaga)
}

function* watchForgotPasswordOtpSendAction() {
    yield takeLatest(Utils.ApiTypes.API_FORGOT_PASSWORD_OTP_SEND_METHOD, forgotPasswordOtpSendSaga)
}

function* watchForgotPasswordAction() {
    yield takeLatest(Utils.ApiTypes.API_FORGOT_PASSWORD_METHOD, forgotPasswordSaga)
}

function* watchForgotPasswordResendOtpAction() {
    yield takeLatest(Utils.ApiTypes.API_FORGOT_PASSWORD_RESEND_OTP_METHOD, forgotPasswordResendOtpSaga)
}

function* watchListExpiredCashbackAction() {
    yield takeLatest(Utils.ApiTypes.API_LIST_EXPIRED_CASHBACK_METHOD, listExpiredCashbackSaga)
}

function* watchListAvailableCashbackAction() {
    yield takeLatest(Utils.ApiTypes.API_LIST_AVAILABLE_CASHBACK_METHOD, listAvailableCashbackSaga)
}

function* rootSaga() {
    yield all([
        watchLoginAction(),
        watchSignupAction(),
        watchLoginWithOtpAction(),
        watchLoginWithOtpVerifyAction(),
        watchLoginWithOtpResendOtpAction(),
        watchHomeBannerAction(),
        watchSearchRestaurantAction(),
        watchHotelDetailAction(),
        watchLikeDislikeHotelAction(),
        watchGetNearbyRestaurantAction(),
        watchGetFeaturedRestaurantAction(),
        watchGetEarnedCashbackHistoryAction(),
        watchGetRedeemedCashbackHistoryAction(),
        watchGetUserExpiredCashbackAction(),
        watchGetUserAvailableCashbackAction(),
        watchGetUserBalanceReceivedAction(),
        watchGetRestaurantListAction(),
        watchGetAvailableBalanceForRestroAction(),
        watchBalanceTransferAction(),
        watchGetFaqAction(),
        watchReportAction(),
        watchAboutAction(),
        watchGetFavoriteRestaurantAction(),
        watchFilterRestaurantAction(),
        watchEditProfileAction(),
        watchGetNotificationAction(),
        watchGetSuperSaverDealsAction(),
        watchGetHotPlateDayHotelAction(),
        watchRateHotelAction(),
        watchForgotPasswordOtpSendAction(),
        watchForgotPasswordAction(),
        watchForgotPasswordResendOtpAction(),
        watchListExpiredCashbackAction(),
        watchListAvailableCashbackAction()
    ])
}

export default rootSaga;