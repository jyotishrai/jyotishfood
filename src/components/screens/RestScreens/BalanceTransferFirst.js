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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_BALANCE_TRANSFER_SECOND, KEY_USER_DATA } from '../../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE } from '../../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../../utility/Typography';
import { } from '../../../utility/Utils';
import { } from '../../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../../NavigationService'
import CommonHeader from '../../common/CommonHeader'
import { clearGetAvailableBalanceForRestroAction, clearGetRestaurantListAction } from '../../../actions/action';

const { height, width } = Dimensions.get('window')

const BalanceTransferFirst = ({ navigation }) => {

    const dispatch = useDispatch();

    const [mobileNumber, setMobileNumber] = useState('')

    useEffect(() => {
        navigation.addListener(
            'didFocus',
            () => {
                dispatch(clearGetAvailableBalanceForRestroAction())
                dispatch(clearGetRestaurantListAction({}))
            }
        );

    }, [])

    function onChangeMobile(number) {
        setMobileNumber(number)
    }

    function onSearch() {
        if (mobileNumber.length < 10 || mobileNumber.length > 10) {
            flashMessage(Strings.invalid_mobile_number, 'danger')
        }
        else if (mobileNumber == global[KEY_USER_DATA].phone_number) {
            flashMessage(Strings.you_cant_transfer_balance_to_your_number, 'danger')
        }
        else {
            navigation.navigate(SCREEN_BALANCE_TRANSFER_SECOND, { mobileNumber: mobileNumber })
        }
    }

    // alert(JSON.stringify(global[KEY_USER_DATA]))

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colors.appBlack
            }}
        >
            <CommonHeader
                title={Strings.balance_transfer}
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
                    fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    textStyle={{ color: colors.appBlack, alignSelf: 'center', marginTop: 30 }}
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
                    title={Strings.search}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={onSearch}
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

export default BalanceTransferFirst;