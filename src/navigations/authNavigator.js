import { createStackNavigator } from 'react-navigation-stack';
import * as Utils from '../utility';

import Login from '../components/screens/Login';
import Registration from '../components/screens/Registration';
import RegistrationSecond from '../components/screens/RegistrationSecond';
import LoginWithOtpScreenFirst from '../components/screens/LoginWithOtpScreenFirst';
import LoginWithOtpScreenSecond from '../components/screens/LoginWithOtpScreenSecond';
import ResetPasswordScreenFirst from '../components/screens/ResetPasswordScreenFirst';
import ResetPasswordScreenSecond from '../components/screens/ResetPasswordScreenSecond';
import ResetPasswordScreenThird from '../components/screens/ResetPasswordScreenThird';

const RouteConfig = {
    [Utils.Constants.SCREEN_LOGIN]: Login,
    [Utils.Constants.SCREEN_SIGNUP]: Registration,
    [Utils.Constants.SCREEN_SIGNUP_ADDRESS]: RegistrationSecond,
    [Utils.Constants.SCREEN_LOGIN_WITH_OTP_FIRST]: LoginWithOtpScreenFirst,
    [Utils.Constants.SCREEN_LOGIN_WITH_OTP_SECOND]: LoginWithOtpScreenSecond,
    [Utils.Constants.SCREEN_RESET_PASSWORD_FIRST]: ResetPasswordScreenFirst,
    [Utils.Constants.SCREEN_RESET_PASSWORD_SECOND]: ResetPasswordScreenSecond,
    [Utils.Constants.SCREEN_RESET_PASSWORD_THIRD]: ResetPasswordScreenThird,
};
const AuthNavigatorConfig = {
    initialRouteName: Utils.Constants.SCREEN_LOGIN,
    header: null,
    headerMode: 'none'
};

const AuthNavigator = createStackNavigator(RouteConfig, AuthNavigatorConfig)

export default AuthNavigator;
