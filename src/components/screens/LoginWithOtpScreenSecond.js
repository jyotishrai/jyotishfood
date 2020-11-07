import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import * as Utils from '../../utility';
import CommonButton from '../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import flashMessage from '../common/CustomFlashAlert';
import colors from '../../utility/Colors';
import Strings from '../../translation/language'
import RegularText from '../common/RegularText';
import { DIMENS, SCREEN_SIGNUP, SCREEN_HOME, KEY_USER_DATA, KEY_DEVICE_TOKEN, KEY_USER_TOKEN, KEY_DEVICE_ID, KEY_TIME_COUNT_OTP, INITIAL_TIME, RESET_TIME } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE, IMG_TIK } from '../../utility/imageRes'
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BLACK } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { storeItem } from '../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import CommonHeader from '../common/CommonHeader'
//import OTPInput from 'react-native-otp-inputs'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import { loginWithOtpVerifyAction, loginWithOtpResendOtpAction, clearLoginWithOtpAction } from '../../actions/action';
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('window')
const timeCountOTP =  KEY_TIME_COUNT_OTP
const initialTime = INITIAL_TIME
const RegisterSecond = ({ navigation }) => {

    const dispatch = useDispatch();

    let timerRef = useRef()
    const [count, setCount] = useState(timeCountOTP)
    const [OTP, setOTP] = useState('')
    const [mobileNumber, setMobileNumber] = useState(undefined)
    const [loginData, setLoginData] = useState(undefined)
    const [timerSec, setTimerSec] = useState(10)
    const [timerMin, setTimerMin] = useState(initialTime)

    const { loginWithOtpVerifyRes, fetching, error, loginWithOtpResendOtpRes } = useSelector(state => ({
        loginWithOtpVerifyRes: state.loginWithOtpReducer.loginWithOtpVerifyRes,
        fetching: state.loginWithOtpReducer.fetching,
        error: state.loginWithOtpReducer.error,

        loginWithOtpResendOtpRes: state.loginWithOtpReducer.loginWithOtpResendOtpRes,
    }), shallowEqual);

    useEffect(() => {
        let mobileNumber = navigation.state.params.mobileNumber;
        let loginData = navigation.state.params.loginData;
        setLoginData(loginData)
        setMobileNumber(mobileNumber)

        startTimer()

        if (loginWithOtpVerifyRes != undefined && loginWithOtpVerifyRes.error == false) {
            saveUserData()
        }

        if (loginWithOtpVerifyRes != undefined && loginWithOtpVerifyRes.error == true) {
            flashMessage(loginWithOtpVerifyRes.message, 'danger')
        }

        if (loginWithOtpResendOtpRes != undefined && loginWithOtpResendOtpRes.error == false) {
            setLoginData(loginWithOtpResendOtpRes.data)
        }

       
return()=>{
    clearTimeout(timerRef.current)
    dispatch(clearLoginWithOtpAction())

}
        

    }, [loginWithOtpVerifyRes, loginWithOtpResendOtpRes, timerSec,count])
   
    async function startTimer() {
        timerRef.current = setTimeout(() => {
                if(count==0){
                    clearTimeout(timerRef.current)
                   // setCount(timeCountOTP)
                    setTimerMin(RESET_TIME)
                }else{
                    setCount(count-1)
                    let timerCount = Utils.Utils.minToHm(count)
                    setTimerMin(timerCount)
                }
        }, 1000)
    }

    function onSubmit() {

        if (OTP == '' || OTP.length < 4) {
            flashMessage(Strings.please_enter_otp, 'danger')
        }
        else if (loginData.otp != OTP) {
            flashMessage(Strings.invalid_otp, 'danger')
        }
        else {
            verifyOTP()
        }
    }

    function onPressResendOtp() {
         clearTimeout(timerRef.current)
        
         setCount(timeCountOTP)
         setTimerMin(initialTime)
         setOTP('')
        dispatch(loginWithOtpResendOtpAction({ user_id: loginData.user_id }))
    }

    function verifyOTP() {
        let otpData = {
            otp: OTP,
            user_id: loginData.user_id
        }
        dispatch(loginWithOtpVerifyAction(otpData))
    }

    function saveUserData() {
        flashMessage(Strings.login_successful, 'success')

        let device_id = DeviceInfo.getUniqueId()

        storeItem(KEY_USER_DATA, loginWithOtpVerifyRes.data)
        storeItem(KEY_DEVICE_TOKEN, global[KEY_DEVICE_TOKEN])
        storeItem(KEY_USER_TOKEN, loginWithOtpVerifyRes.data.user_token)
        storeItem(KEY_DEVICE_ID, device_id)

        global[KEY_USER_TOKEN] = loginWithOtpVerifyRes.data.user_token
        global[KEY_DEVICE_ID] = device_id
        global[KEY_USER_DATA] = loginWithOtpVerifyRes.data

        navigation.navigate(SCREEN_HOME)
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
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    padding: 20
                }}>
                    <RegularText
                        title={mobileNumber != undefined ? '+91 ' + mobileNumber : ''}
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
                        title={Strings.four_digit_otp_sent_on_above_mobile_number}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ color: colors.green400, marginLeft: 10 }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 20, alignSelf: 'center',
                    marginVertical: 20
                }}>
                    <RegularText
                        title={timerMin }//+ ':' + timerSec}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ color: colors.darkGray, }}
                    />
                    <RegularText
                        title={Strings.sec_left}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ color: colors.darkGray, marginLeft: 5 }}
                    />
                </View>

                {/* <RegularText
                    title={loginData != undefined ? 'OTP - ' + loginData.otp : ''}
                    fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    textStyle={{ color: colors.darkGray, alignSelf: 'center', marginBottom: 15 }}
                /> */}

                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 20, alignSelf: 'center',
                }}>
                    <RegularText
                        title={Strings.enter_otp_below}
                        fontFamily={FONT_FAMILY_ROBOTO_BLACK}
                        textStyle={{ color: colors.darkGray, marginLeft: 5, fontSize: 16 }}
                    />
                </View>

                <View style={{ marginHorizontal: width / 6 }}>
                <OTPInputView
                    
                        style={{ height:50,color:colors.grey500}}
                        pinCount={4}
                        code={OTP} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                         onCodeChanged = {code => {  setOTP(code)}}
                    
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                             //setOTP(code)
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />
                    {/* <OTPInput
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
                </View>

                <CommonButton
                    title={Strings.submit}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={onSubmit}
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
        color:colors.grey900
    },

    underlineStyleHighLighted: {
        borderColor: colors.red100,
    },

});

export default RegisterSecond;