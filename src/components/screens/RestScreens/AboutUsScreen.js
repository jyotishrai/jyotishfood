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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_BALANCE_TRANSFER_SECOND, SCREEN_EARN_USER_SECOND } from '../../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE } from '../../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../../utility/Typography';
import { } from '../../../utility/Utils';
import { } from '../../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../../NavigationService'
import CommonHeader from '../../common/CommonHeader'
import { aboutUsAction } from '../../../actions/action';
import HTML from 'react-native-render-html';

const { height, width } = Dimensions.get('window')

const AboutUsScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const { aboutRes, fetching, error } = useSelector(state => ({
        aboutRes: state.aboutUsReducer.aboutRes,
        fetching: state.aboutUsReducer.fetching,
        error: state.aboutUsReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getAboutUs()
    }, [])

    function getAboutUs() {
        dispatch(aboutUsAction({ page: 1 }))
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
                title={Strings.about_us}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: colors.white,
                    paddingHorizontal: 10
                }}
                keyboardShouldPersistTaps={"always"}
            >

                {
                    aboutRes != undefined &&
                    <HTML html={aboutRes.response.description} imagesMaxWidth={Dimensions.get('window').width} />
                }

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

export default AboutUsScreen;