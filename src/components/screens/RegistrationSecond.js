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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN } from '../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE,IMG_DOB,IMG_ADDRESS } from '../../utility/imageRes'
import { } from '../../utility/Typography';
import { } from '../../utility/Utils';
import { } from '../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../NavigationService'
import CommonHeader from '../common/CommonHeader'

const { height, width } = Dimensions.get('window')

const RegisterSecond = ({ navigation }) => {

    const dispatch = useDispatch();

    function onRegister() {
        navigation.navigate(SCREEN_LOGIN)
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
                title={Strings.register}
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
                        placeHolder={Strings.date_of_birth}
                        borderBottomColor={colors.lightGray}
                    />
                </View>
                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.address}
                        borderBottomColor={colors.lightGray}
                    />
                </View>

                <CommonButton
                    title={Strings.register}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width - 40, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={onRegister}
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

export default RegisterSecond;