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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_RESET_PASSWORD_SECOND } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE } from '../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_THIN, FONT_FAMILY_ROBOTO_BLACK, FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { } from '../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import CommonHeader from '../common/CommonHeader'
import { forgotPasswordOtpSendAction } from '../../actions/action';

const { height, width } = Dimensions.get('window')

const ResetPasswordScreenFirst = ({ navigation }) => {

    const dispatch = useDispatch();

    const [mobileNumber, setMobileNumber] = useState('')

    const { forgotOtpSendRes, fetching, error } = useSelector(state => ({
        forgotOtpSendRes: state.forgotPasswordReducer.forgotOtpSendRes,
        fetching: state.forgotPasswordReducer.fetching,
        error: state.forgotPasswordReducer.error,
    }), shallowEqual);

    useEffect(() => {
        if (forgotOtpSendRes != undefined && forgotOtpSendRes.error == false) {
            navigation.navigate(SCREEN_RESET_PASSWORD_SECOND, { data: forgotOtpSendRes.data, mobileNumber: mobileNumber })
        }
        if (forgotOtpSendRes != undefined && forgotOtpSendRes.error == true) {
            flashMessage(forgotOtpSendRes.message, 'danger')
        }
    }, [forgotOtpSendRes])

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
        dispatch(forgotPasswordOtpSendAction(data))
        // navigation.navigate(SCREEN_RESET_PASSWORD_SECOND)
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
                <RegularText
                    title={Strings.kindly_enter_your_mobile_number}
                    textStyle={{ alignSelf: 'center', marginTop: 20 }}
                    fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                />
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
                    title={Strings.submit}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={validate}
                />
            </ScrollView>

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

export default ResetPasswordScreenFirst;