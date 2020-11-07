import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import singupReducer from './signupReducer';
import loginWithOtpReducer from './loginWithOtpReducer';
import getHomeBannerReducer from './getHomeBannerReducer';
import searchRestaurantReducer from './searchRestaurantReducer';
import hotelDetailAndLikeDisLikeReducerReducer from './hotelDetailAndLikeDisLikeHotelReducer.';
import getNearByRestaurantReducer from './getNearByRestaurantReducer';
import getFeaturedRestaurantReducer from './getFeaturedRestaurantReducer';
import getCashbackHistoryReducer from './getCashbackHistoryReducer';
import getUserCashbackReducer from './getUserCashbackReducer';
import getUserBalanceReceivedReducer from './getUserBalanceReceivedReducer';
import balanceTransferReducer from './balanceTransferReducer'
import getFaqReducer from './getFaqReducer';
import reportReducer from './reportReducer';
import aboutUsReducer from './aboutUsReducer';
import getFavoriteRestaurantReducer from './getFavoriteRestaurant';
import filterRestaurantReducer from './filterRestaurantReducer';
import editProfileReducer from './editProfileReducer';
import getNotificationReducer from './getNotificationReducer';
import getSuperSaverDealsReducer from './getSuperSaverDealsReducer';
import getHotPlateDayHotelsReducer from './getHotPlateDayHotelsReducer';
import rateHotelReducer from './rateHotelReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import listCashbackReducer from './listCashbackReducer';

const rootReducer = combineReducers({
    loginReducer,
    singupReducer,
    loginWithOtpReducer,
    getHomeBannerReducer,
    searchRestaurantReducer,
    hotelDetailAndLikeDisLikeReducerReducer,
    getNearByRestaurantReducer,
    getFeaturedRestaurantReducer,
    getCashbackHistoryReducer,
    getUserCashbackReducer,
    getUserBalanceReceivedReducer,
    balanceTransferReducer,
    getFaqReducer,
    reportReducer,
    aboutUsReducer,
    getFavoriteRestaurantReducer,
    filterRestaurantReducer,
    editProfileReducer,
    getNotificationReducer,
    getSuperSaverDealsReducer,
    getHotPlateDayHotelsReducer,
    rateHotelReducer,
    forgotPasswordReducer,
    listCashbackReducer
});

export default rootReducer;