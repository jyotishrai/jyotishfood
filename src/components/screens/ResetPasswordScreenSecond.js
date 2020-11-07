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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_RESET_PASSWORD_THIRD, KEY_TIME_COUNT_OTP, INITIAL_TIME, RESET_TIME } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE, IMG_TIK } from '../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BLACK } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { } from '../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import CommonHeader from '../common/CommonHeader'
import OtpInputs from 'react-native-otp-inputs';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { clearForgotPasswordOtpSendAction, forgotPasswordResendOtpAction, clearForgotPasswordResendOtpAction } from '../../actions/action';
import CustomAlertModal from '../common/CustomLoader';

const { height, width } = Dimensions.get('window')

const ResetPasswordScreenSecond = ({ navigation }) => {

    const dispatch = useDispatch();
    let timerRef = useRef()
    const [count, setCount] = useState(KEY_TIME_COUNT_OTP)
    const [timeExpire, setTimExpire] = useState(INITIAL_TIME)

    const [otpData, setOtpData] = useState(navigation.state.params.data)
    const [mobileNumber, setMobileNumber] = useState('')
    const [OTP, setOTP] = useState('')

    const { forgotOtpReSendRes, fetching, error } = useSelector(state => ({
        forgotOtpReSendRes: state.forgotPasswordReducer.forgotOtpReSendRes,
        fetching: state.forgotPasswordReducer.fetching,
        error: state.forgotPasswordReducer.error,
    }), shallowEqual);

    useEffect(() => {
        let data = navigation.state.params.data;
        let mobile = navigation.state.params.mobileNumber;
        // setOtpData(data)
        setMobileNumber(mobile)
        dispatch(clearForgotPasswordOtpSendAction())
        startTimer()
        if (forgotOtpReSendRes != undefined) {
            console.log("forgot pass and resed:--", forgotOtpReSendRes.data);

            forgotOtpReSendRes.data && setOtpData(forgotOtpReSendRes.data)
            forgotOtpReSendRes.message && flashMessage(forgotOtpReSendRes.message)
            dispatch(clearForgotPasswordResendOtpAction())
        }
    }, [forgotOtpReSendRes, count])

    function validate() {
        console.log("otp:--", OTP);

        if (OTP == '') {
            flashMessage(Strings.please_enter_otp, 'danger')
        }
        else if (OTP.length < 4) {
            flashMessage(Strings.invalid_otp, 'danger')
        }
        else if (OTP != otpData.otp) {
            flashMessage(Strings.incorrect_otp_entered, 'danger')
        }
        else {
            onSubmitOtp()
        }
    }

    function onSubmitOtp() {
        navigation.replace(SCREEN_RESET_PASSWORD_THIRD, { data: otpData, otp: OTP, mobileNumber: mobileNumber })
    }
    async function startTimer() {
        timerRef.current = setTimeout(() => {
            if (count == 0) {
                clearTimeout(timerRef.current)
                // setCount(timeCountOTP)
                setTimExpire(RESET_TIME)
            } else {
                setCount(count - 1)
                let timerCount = Utils.Utils.minToHm(count)
                setTimExpire(timerCount)
            }
        }, 1000)
    }
    function onPressResendOtp() {
        clearTimeout(timerRef.current)
        setCount(KEY_TIME_COUNT_OTP)
        setTimExpire(INITIAL_TIME)
        setOTP('')
        dispatch(forgotPasswordResendOtpAction({ user_id: otpData.user_id }))
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
                title={Strings.resend_otp}
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
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    padding: 20
                }}>
                    <RegularText
                        title={mobileNumber}
                        fontFamily={FONT_FAMILY_ROBOTO_BOLD}
                        textStyle={{ color: colors.darkGray }}
                    />
                    <Ripple
                        onPress={() => onPressResendOtp()}
                    >
                        <RegularText
                            title={Strings.resend_otp}
                            fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                            textStyle={{ color: colors.buttonColor }}
                        />
                    </Ripple>
                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    backgroundColor: colors.green50,
                    padding: 10,
                    marginHorizontal: 20
                }}>
                    <Image source={IMG_TIK} resizeMode='contain' />
                    <RegularText
                        title={Strings.we_have_sent_you_an_otp_code_for_passaword_reset}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ color: colors.green400, marginLeft: 10 }}
                        numberOfLines={2}
                    />
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 20, alignSelf: 'center',
                    marginVertical: 20
                }}>
                    <RegularText
                        title={timeExpire}//+ ':' + timerSec}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ color: colors.darkGray, }}
                    />
                    <RegularText
                        title={Strings.sec_left}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ color: colors.darkGray, marginLeft: 5 }}
                    />
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 20, alignSelf: 'center',
                    marginVertical: 10
                }}>
                    <RegularText
                        title={Strings.enter_otp_below}
                        fontFamily={FONT_FAMILY_ROBOTO_BLACK}
                        textStyle={{ color: colors.darkGray, marginLeft: 5, fontSize: 16 }}
                    />
                </View>

                {/* <RegularText
                    title={otpData != undefined ? 'Enter : ' + otpData.otp : ''}
                    textStyle={{ color: colors.darkGray, marginLeft: 5, fontSize: 14, alignSelf: 'center' }}
                /> */}
                <View style={{ marginHorizontal: width / 6 }}>
                    {/* <OtpInputs
                        inputStyles={{
                            textAlign: 'center',
                            width: 55,
                            height: DIMENS.btnH,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.lightGray,
                            marginBottom: 10
                        }}
                        handleChange={otp => {
                            setOTP(otp)
                        }}
                    /> */}
                    <OTPInputView

                        style={{ height: 50, color: colors.grey500 }}
                        pinCount={4}
                        code={OTP} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => { setOTP(code) }}

                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            //setOTP(code)
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                </View>

                <CommonButton
                    title={Strings.submit}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={validate}
                />
            </ScrollView>
            {
                fetching &&
                <CustomAlertModal loading={true} />
            }

        </View >
    )
}

const styles = StyleSheet.create({
    textInputView: {
        height: DIMENS.txtInptH,
        marginTop: 30,
        marginHorizontal: 20
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: colors.grey500,
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: colors.grey900
    },

    underlineStyleHighLighted: {
        borderColor: colors.red100,
    },
});

export default ResetPasswordScreenSecond;