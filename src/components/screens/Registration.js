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
    StatusBar, ImageBackground,
    Alert
} from 'react-native';
import * as Utils from '../../utility';
import CommonButton from '../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import flashMessage from '../common/CustomFlashAlert';
import colors from '../../utility/Colors';
import Strings from '../../translation/language'
import RegularText from '../common/RegularText';
import { DIMENS, SCREEN_SIGNUP, SCREEN_SIGNUP_ADDRESS, SCREEN_LOGIN } from '../../utility/constants';
import { IMG_ACTIVE_CHECKBOX, IMG_INACTIVE_CHECKBOX, IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE, IMG_ADDRESS, IMG_DOB } from '../../utility/imageRes'
import { } from '../../utility/Typography';
import { convertDateTime } from '../../utility/Utils';
import { } from '../../utility/CustomAsyncStorage'
import CommonTextInput from '../common/CommonTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import DateTimePicker from '@react-native-community/datetimepicker'
import { signupAction } from '../../actions/action';
import TermsAndConditionModal from '../modals/termsAndConditionModal';
import CustomLoader from '../common/CustomLoader'

const { height, width } = Dimensions.get('window')

const Signup = ({ navigation }) => {

    const dispatch = useDispatch();

    let userNameRef = useRef(null)
    let emailRef = useRef(null)
    let mobileRef = useRef(null)
    let addressRef = useRef(null)
    let dobRef = useRef(null)
    let passwordRef = useRef(null)
    let confirmPasswordRef = useRef(null)

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAgree, setIsAgree] = useState(false)

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
    const [isTermsConditionModalVisible, setIsTermsConditionModalVisible] = useState(false)

    const { singupRes, fetching, error } = useSelector(state => ({
        singupRes: state.singupReducer.singupRes,
        fetching: state.singupReducer.fetching,
        error: state.singupReducer.error,
    }), shallowEqual);

    useEffect(() => {
        if (singupRes != undefined && singupRes.error == false) {
            showSuccess()
        }
        else if (singupRes != undefined && singupRes.error == true) {
            flashMessage(singupRes.message, 'danger')
        }
    }, [singupRes])

    function onChangeUserName(name) {
        setUserName(name)
    }

    function onChangeEmail(email) {
        setEmail(email)
    }

    function onChangeMobile(mobile) {
        setMobile(mobile)
    }

    function onChangeAddress(address) {
        setAddress(address)
    }

    function onChangePassword(password) {
        setPassword(password)
    }

    function onChangeConfirmPassword(confirmPassword) {
        setConfirmPassword(confirmPassword)
    }

    function onPressDob() {
        setIsDatePickerVisible(true)
    }

    function onSelectDob(item) {
        setIsDatePickerVisible(false)
        let dob = convertDateTime(item.nativeEvent.timestamp, 'YYYY-MM-DD')
        setDob(dob)
    }

    function onPressBack() {
        NavigationService.back()
    }

    function onPressTermsAndCondition() {
        setIsTermsConditionModalVisible(true)
    }

    function onCloseTermsAndCondition() {
        setIsTermsConditionModalVisible(false)
    }

    function toggleAgreeCheckbox() {
        setIsAgree(!isAgree)
    }

    function validate() {

        if (userName == '') {
            flashMessage(Strings.user_name_is_empty, 'danger')
        }
        else if (email == '') {
            flashMessage(Strings.email_must_not_be_empty, 'danger')
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            flashMessage(Strings.enter_valid_email, 'danger')
        }
        else if (mobile == '') {
            flashMessage(Strings.mobile_number_must_not_be_empty, 'danger')
        }
        else if (mobile.length < 10 || mobile.length > 10) {
            flashMessage(Strings.mobile_number_must_be_of_10_digits, 'danger')
        }
        else if (!/^[6-9]\d{9}$/.test(mobile)) {
            flashMessage(Strings.invalid_mobile_number, 'danger')
        }
        else if (address == '') {
            flashMessage(Strings.address_must_not_be_empty, 'danger')
        }
        else if (dob == '') {
            flashMessage(Strings.please_select_dob, 'danger')
        }
        else if (password == '') {
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
        else if (isAgree == false) {
            flashMessage(Strings.please_agree_to_all_terms_and_condition, 'danger')
        }
        else {
            onSignup()
        }

    }

    function onSignup() {

        let userData = {
            full_name: userName,
            email: email,
            password: password,
            phone_number: mobile,
            address: address,
            dob: dob,
        }
        dispatch(signupAction(userData))
    }

    function showSuccess() {
        Alert.alert(
            "Hotplate Food",
            singupRes != undefined ? singupRes.message : 'Signup Successfull',
            [
                { text: Strings.login, onPress: () => navigation.navigate(SCREEN_LOGIN) }
            ],
            { cancelable: false }
        );

    }

    return (
        <ImageBackground
            source={IMG_LOGIN_BG}
            style={{
                flex: 1,
                justifyContent: 'center',
            }}

        >
            <View style={{
                flexDirection: 'row', justifyContent: 'center',
                paddingVertical: 10, height: 50,
                alignItems: 'center'
            }}>
                <Ripple style={{
                    position: 'absolute',
                    left: 15,
                    padding: 5
                }}
                    onPress={() => onPressBack()}
                >
                    <Image
                        source={IMG_BACK_WHITE}
                        resizeMode='contain'
                    />
                </Ripple>
                <RegularText
                    title={Strings.sign_up}
                    textStyle={{ color: colors.white, fontSize: 15 }}
                />
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                keyboardShouldPersistTaps={"always"}
            >
                <Image
                    source={IMG_LOGO}
                    resizeMode='contain'
                    style={{ alignSelf: 'center', marginTop: 50 }}
                />

                <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                    <RegularText
                        title={Strings.hello.toUpperCase()}
                        textStyle={{ color: colors.white, fontSize: 25 }}
                    />
                    <RegularText
                        title={Strings.please_enter_your_sign_up_detail}
                        textStyle={{ color: colors.white, fontSize: 16 }}
                    />
                </View>

                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_USER_NAME}
                        placeHolder={Strings.user_name}
                        onChangeText={onChangeUserName}
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        refValue={ref => userNameRef = ref}
                        onSubmitEditing={() => { emailRef.focus() }}
                        secureTextEntry={false}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_EMAIL}
                        placeHolder={Strings.email_address}
                        onChangeText={onChangeEmail}
                        keyboardType={'email-address'}
                        returnKeyType={'next'}
                        refValue={ref => emailRef = ref}
                        onSubmitEditing={() => { mobileRef.focus() }}
                        secureTextEntry={false}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_MOBILE_NUMBER}
                        placeHolder={Strings.mobile}
                        onChangeText={onChangeMobile}
                        keyboardType={'number-pad'}
                        returnKeyType={'next'}
                        refValue={ref => mobileRef = ref}
                        onSubmitEditing={() => { addressRef.focus() }}
                        secureTextEntry={false}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_ADDRESS}
                        placeHolder={Strings.address}
                        onChangeText={onChangeAddress}
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        refValue={ref => addressRef = ref}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                    />
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row', height: DIMENS.txtInptH, marginTop: 30, marginHorizontal: 20,
                    alignItems: 'center', borderBottomColor: colors.white, borderBottomWidth: 1
                }}
                    activeOpacity={1}
                    onPress={() => { onPressDob() }}
                >
                    <Image
                        source={IMG_DOB}
                    />
                    <RegularText
                        title={dob != '' ? dob : Strings.date_of_birth}
                        textStyle={{
                            color: colors.white,
                            marginLeft: 12
                        }}
                    />
                </TouchableOpacity>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_PASSWORD}
                        placeHolder={Strings.password}
                        onChangeText={onChangePassword}
                        keyboardType={'default'}
                        returnKeyType={'next'}
                        refValue={ref => passwordRef = ref}
                        onSubmitEditing={() => { confirmPasswordRef.focus() }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonTextInput
                        icon={IMG_PASSWORD}
                        placeHolder={Strings.confirm_password}
                        onChangeText={onChangeConfirmPassword}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        refValue={ref => confirmPasswordRef = ref}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={true}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, alignItems: 'center' }}>
                    <Ripple
                        style={{
                            marginRight: 10
                        }}
                        onPress={() => toggleAgreeCheckbox()}
                    >
                        <Image
                            source={isAgree ? IMG_ACTIVE_CHECKBOX : IMG_INACTIVE_CHECKBOX}
                            resizeMode="contain"
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />
                    </Ripple>
                    <TouchableOpacity onPress={() => onPressTermsAndCondition()}>
                        <RegularText
                            title={Strings.agree_terms_and_conditions}
                            textStyle={{
                                color: colors.white
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <CommonButton
                    title={Strings.sign_up}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width - 40, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={validate}
                />
            </ScrollView>
            {isDatePickerVisible &&
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onSelectDob}
                    maximumDate={new Date()}
                />}
            <TermsAndConditionModal
                visible={isTermsConditionModalVisible}
                onClose={onCloseTermsAndCondition}
            />
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

export default Signup;