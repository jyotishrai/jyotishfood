import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    CheckBox,
    Keyboard,
    StatusBar, ImageBackground
} from 'react-native';
import * as Utils from '../../utility';
import CommonButton from '../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import flashMessage from '../common/CustomFlashAlert';
import colors from '../../utility/Colors';
import Strings from '../../translation/language'
import RegularText from '../common/RegularText';
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_LOGIN } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE, IMG_EYE_INACTIVE, IMG_EYE_ACTIVE } from '../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, KEYBOARD_DEFAULT } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { } from '../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import CommonHeader from '../common/CommonHeader'
import CustomLoader from '../common/CustomLoader'
import { forgotPasswordAction, clearForgotPasswordAction, clearForgotPasswordOtpSendAction } from '../../actions/action';

const { height, width } = Dimensions.get('window')

const ResetPasswordScreenThird = ({ navigation }) => {

    const dispatch = useDispatch();

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [toggleShowPass, setToggleShowPass] = useState(true)

    const [otpData, setOtpData] = useState(undefined)
    const [OTP, setOTP] = useState('')

    const { forgotPasswordRes, fetching, error } = useSelector(state => ({
        forgotPasswordRes: state.forgotPasswordReducer.forgotPasswordRes,
        fetching: state.forgotPasswordReducer.fetching,
        error: state.forgotPasswordReducer.error,
    }), shallowEqual);

    useEffect(() => {
        let data = navigation.state.params.data;
        let otp = navigation.state.params.otp;
        setOtpData(data)
        setOTP(otp)

        if (forgotPasswordRes != undefined && forgotPasswordRes.error == false) {
            flashMessage(forgotPasswordRes.message, 'success')
            navigation.navigate(SCREEN_LOGIN)
            dispatch(clearForgotPasswordAction())
            dispatch(clearForgotPasswordOtpSendAction())
        }
        else if (forgotPasswordRes != undefined && forgotPasswordRes.error == true) {
            flashMessage(forgotPasswordRes.message, 'danger')
        }

    }, [forgotPasswordRes])

    function onChangePassword(text) {
        setPassword(text)
    }

    function onChangeConfirmPassword(text) {
        setConfirmPassword(text)
    }

    function toggleShowPassword() {
        setToggleShowPass(!toggleShowPass)
    }

    function validate() {
        if (password == '') {
            flashMessage(Strings.password_must_not_be_blank, 'danger')
        }
        else if (password.length < 6) {
            flashMessage(Strings.password_length, 'danger')
        }
        else if (confirmPassword == '') {
            flashMessage(Strings.re_enter_password, 'danger')
        }
        else if (password != confirmPassword) {
            flashMessage(Strings.password_does_not_match, 'danger')
        }
        else {
            onSubmit()
        }
    }

    function onSubmit() {
        let data = {
            user_id: otpData.user_id,
            otp: OTP,
            password: password
        }
        dispatch(forgotPasswordAction(data))
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colors.appBlack
            }}
        >
            <CommonHeader
                title={Strings.reset_password}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: colors.white
                }}
                keyboardShouldPersistTaps={"always"}
            >
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.new_password}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangePassword}
                        keyboardType={KEYBOARD_DEFAULT}
                        returnKeyType={'done'}
                        // onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={toggleShowPass ? true : false}
                        rightIcon={toggleShowPass ? IMG_EYE_INACTIVE : IMG_EYE_ACTIVE}
                        inputStyle={{ color: colors.black }}
                        onPressRightIcon={toggleShowPassword}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.confirm_password}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeConfirmPassword}
                        keyboardType={KEYBOARD_DEFAULT}
                        returnKeyType={'done'}
                        inputStyle={{ color: colors.black }}
                        // onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={toggleShowPass ? true : false}
                    />
                </View>
                <CommonButton
                    title={Strings.submit}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width - 40, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={validate}
                />
            </ScrollView>
            {
                fetching &&
                <CustomLoader />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    textInputView: {
        height: DIMENS.txtInptH,
        marginTop: 30,
        marginHorizontal: 20
    }
});

export default ResetPasswordScreenThird;