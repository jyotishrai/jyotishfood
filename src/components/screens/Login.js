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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_FIRST, SCREEN_RESET_PASSWORD_FIRST, SCREEN_HOME, KEY_DEVICE_TOKEN, KEY_DEVICE_ID, KEY_USER_TOKEN, KEY_USER_DATA } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD } from '../../utility/imageRes'
import { } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { setUserData, storeItem, USER_DATA } from '../../utility/CustomAsyncStorage'
import CommonTextInput from '../common/CommonTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import { loginAction } from '../../actions/action';
import firebase from 'react-native-firebase'
import DeviceInfo from 'react-native-device-info';
import CustomLoader from '../common/CustomLoader'

const { height, width } = Dimensions.get('window')

const Login = ({ navigation }) => {

    const dispatch = useDispatch();

    let emailRef = useRef(null)
    let passwordRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loginRes, fetching, error } = useSelector(state => ({
        loginRes: state.loginReducer.loginRes,
        fetching: state.loginReducer.fetching,
        error: state.loginReducer.error,
    }), shallowEqual);

    useEffect(() => {
        checkPermission()
        if (loginRes != undefined && loginRes.error == false) {
            saveUserData()
        }
        else if (loginRes != undefined && loginRes.error == true) {
            flashMessage(loginRes.message, 'danger')
        }

    }, [loginRes])

    function saveUserData() {
        console.log("loginResloginRes::--",loginRes);
        
        let device_id = DeviceInfo.getUniqueId()

        storeItem(KEY_USER_DATA, loginRes.data)
        storeItem(KEY_DEVICE_TOKEN, global[KEY_DEVICE_TOKEN])
        storeItem(KEY_USER_TOKEN, loginRes.data.user_token)
        storeItem(KEY_DEVICE_ID, device_id)

        global[KEY_USER_TOKEN] = loginRes.data.user_token
        global[KEY_DEVICE_ID] = device_id
        global[KEY_USER_DATA] = loginRes.data

        //alert(JSON.stringify(loginRes.data))

        navigation.navigate(SCREEN_HOME)
    }

    async function checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            getToken();
        } else {
            requestPermission();
        }
    }

    async function getToken() {
        try {
            var token = await firebase.messaging().getToken();
            global[KEY_DEVICE_TOKEN] = token
        } catch (error) {
            // alert(error)
        }
        console.log('Device Token: ', token);
    }

    async function requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }

    function onChangeEmail(email) {
        setEmail(email)
    }

    function onChangePassword(password) {
        setPassword(password)
    }

    function onPressCreateAccount() {
        navigation.navigate(SCREEN_SIGNUP)
    }

    function onPressForgotPassword() {
        navigation.navigate(SCREEN_RESET_PASSWORD_FIRST)
    }

    function onPressLoginWithOtp() {
        navigation.navigate(SCREEN_LOGIN_WITH_OTP_FIRST)
    }

    function validate() {
        if (email == '') {
            flashMessage(Strings.email_must_not_be_empty, 'danger')
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            flashMessage(Strings.enter_valid_email, 'danger')
        }
        else if (password == '') {
            flashMessage(Strings.password_must_not_be_blank, 'danger')
        }
        else {
            onLogin()
        }
    }

    function onLogin() {

        Keyboard.dismiss()

        let loginData = {
            username: email,
            password: password
        }

        dispatch(loginAction(loginData))
        // navigation.navigate(SCREEN_HOME)
    }

    return (
        <ImageBackground
            source={IMG_LOGIN_BG}
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                keyboardShouldPersistTaps={"always"}
            >
                <Image
                    source={IMG_LOGO}
                    resizeMode='contain'
                    style={{ alignSelf: 'center', }}
                />
                <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                    <RegularText
                        title={Strings.hello.toUpperCase()}
                        textStyle={{ color: colors.white, fontSize: 25 }}
                    />
                    <RegularText
                        title={Strings.sign_in_to_your_account}
                        textStyle={{ color: colors.white, fontSize: 16 }}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_EMAIL}
                        placeHolder={Strings.email_address}
                        onChangeText={onChangeEmail}
                        // keyboardType={''}
                        returnKeyType={'next'}
                        refValue={ref => emailRef = ref}
                        onSubmitEditing={() => { passwordRef.focus() }}
                        secureTextEntry={false}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_PASSWORD}
                        placeHolder={Strings.password}
                        onChangeText={onChangePassword}
                        // keyboardType={''}
                        returnKeyType={'done'}
                        refValue={ref => passwordRef = ref}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={true}
                    />
                </View>
                <CommonButton
                    title={Strings.login}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 3, marginTop: 40, alignSelf: 'center' }}
                    onPressButton={validate}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40 }}>
                    <Ripple style={{}} onPress={() => onPressCreateAccount()}>
                        <RegularText
                            title={Strings.create_account}
                            textStyle={{ color: colors.yellow500 }}
                        />
                    </Ripple>
                    <Ripple style={{}} onPress={() => onPressForgotPassword()}>
                        <RegularText
                            title={Strings.forgot_password}
                            textStyle={{ color: colors.yellow500 }}
                        />
                    </Ripple>
                </View>
                <CommonButton
                    title={Strings.login_with_otp}
                    textStyle={{ color: colors.buttonColor }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                    backgroundColor={colors.white}
                    onPressButton={onPressLoginWithOtp}
                />
            </ScrollView>
            {
                fetching &&
                <CustomLoader />
            }
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    textInputView: {
        height: DIMENS.txtInptH,
        marginTop: 30,
        marginHorizontal: 20
    }
});

export default Login;