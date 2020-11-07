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
import * as Utils from '../../../utility';
import CommonButton from '../../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import flashMessage from '../../common/CustomFlashAlert';
import colors from '../../../utility/Colors';
import Strings from '../../../translation/language'
import RegularText from '../../common/RegularText';
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_BALANCE_TRANSFER_SECOND, SCREEN_EARN_USER_SECOND, SCREEN_HOME, KEY_USER_DATA } from '../../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE } from '../../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../../utility/Typography';
import { } from '../../../utility/Utils';
import { } from '../../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../../NavigationService'
import CommonHeader from '../../common/CommonHeader'
import ReportModal from '../../modals/reportModal'
import { reportAction, clearReportAction } from '../../../actions/action'

const { height, width } = Dimensions.get('window')

const ReportScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [isReportModalSuccessful, setIsReportModalSuccessful] = useState(false)

    const { reportRes, fetching, error } = useSelector(state => ({
        reportRes: state.reportReducer.reportRes,
        fetching: state.reportReducer.fetching,
        error: state.reportReducer.error,
    }), shallowEqual);

    useEffect(() => {
        if (reportRes != undefined && reportRes.error == false) {
            setIsReportModalSuccessful(true)
        }
    }, [reportRes])

    function onChangeName(name) {
        setName(name)
    }

    function onChangeMobile(number) {
        setMobileNumber(number)
    }

    function onChangeEmail(email) {
        setEmail(email)
    }

    function onChangeSubject(subject) {
        setSubject(subject)
    }

    function onChangeMessage(message) {
        setMessage(message)
    }

    function validate() {
        // if (name == '') {
        //     flashMessage(Strings.user_name_is_empty)
        // }
        // else if (mobileNumber == '') {
        //     flashMessage(Strings.enter_your_mobile_number)
        // }
        // else if (email == '') {
        //     flashMessage(Strings.email_must_not_be_empty)
        // }
        // else
        if (subject == '') {
            flashMessage('Enter Subject', 'danger')
        }
        else if (message == '') {
            flashMessage('Enter Message', 'danger')
        }
        else {
            onSubmit()
        }
    }

    function onSubmit() {
        let data = {
            // user_name: name,
            // user_mobile: mobileNumber,
            // user_email: email,
            subject: subject,
            message: message,
            type: 'user'
        }
        dispatch(reportAction(data))
    }

    function onClose() {
        setIsReportModalSuccessful(false)
        navigation.navigate(SCREEN_HOME)
        dispatch(clearReportAction({}))
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
                title={Strings.report}
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
                {/* <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.name}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeName}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.grey700 }}
                        editable={false}
                    // value={name}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.mobile_number}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeMobile}
                        keyboardType={KEYBOARD_NUMBER_PAD}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.grey700 }}
                        editable={false}
                    // value={mobileNumber}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.email_address}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeEmail}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.grey700 }}
                        editable={false}
                    // value={email}
                    />
                </View> */}
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.subject}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeSubject}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.appBlack }}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.message}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeMessage}
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
            <ReportModal
                visible={isReportModalSuccessful}
                onClose={onClose}
            />
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

export default ReportScreen;