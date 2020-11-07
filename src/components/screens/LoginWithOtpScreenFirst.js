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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE } from '../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { } from '../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import CommonHeader from '../common/CommonHeader'
import { loginWithOtpAction } from '../../actions/action'
import CustomLoader from '../common/CustomLoader'

const { height, width } = Dimensions.get('window')

const RegisterSecond = ({ navigation }) => {

    const dispatch = useDispatch();

    const [mobileNumber, setMobileNumber] = useState('')

    const { loginWithOtpRes, fetching, error } = useSelector(state => ({
        loginWithOtpRes: state.loginWithOtpReducer.loginWithOtpRes,
        fetching: state.loginWithOtpReducer.fetching,
        error: state.loginWithOtpReducer.error,
    }), shallowEqual);

    useEffect(() => {
        if (loginWithOtpRes != undefined && loginWithOtpRes.error == false) {
            navigation.navigate(SCREEN_LOGIN_WITH_OTP_SECOND, { loginData: loginWithOtpRes.data, mobileNumber: mobileNumber })
        }
        if (loginWithOtpRes != undefined && loginWithOtpRes.error == true) {
            flashMessage(loginWithOtpRes.message, 'danger')
        }
    }, [loginWithOtpRes])

    function onChangeMobile(number) {
        setMobileNumber(number)
    }

    function validate() {
        if (mobileNumber == '') {
            flashMessage(Strings.mobile_number_must_not_be_empty, 'danger')
        }
        else if (mobileNumber.length < 10 || mobileNumber.length > 10) {
            flashMessage(Strings.mobile_number_must_be_of_10_digits, 'danger')
        }
        else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            flashMessage(Strings.invalid_mobile_number, 'danger')
        }
        else {
            onSendOtp()
        }
    }

    function onSendOtp() {

        let data = {
            phone_number: mobileNumber
        }

        dispatch(loginWithOtpAction(data))
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
                title={Strings.login_via_otp}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: colors.white
                }}
                keyboardShouldPersistTaps={"always"}
            >
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.mobile_number}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeMobile}
                        keyboardType={KEYBOARD_NUMBER_PAD}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.appBlack }}
                    />
                </View>

                <CommonButton
                    title={Strings.send_otp}
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

export default RegisterSecond;