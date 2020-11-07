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
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_HOME, SCREEN_BALANCE_TRANSFER_FIRST } from '../../../utility/constants';
import { IMG_ARROW_DOWN, IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE, IMG_ARROW_NEXT } from '../../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_MEDIUM, KEYBOARD_NUMERIC, KEYBOARD_PHONE_PAD, KEYBOARD_DEFAULT } from '../../../utility/Typography';
import { } from '../../../utility/Utils';
import { } from '../../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../../NavigationService'
import CommonHeader from '../../common/CommonHeader'
import { getRestaurantListAction, getAvailableBalanceForRestroAction, balanceTransferAction, clearGetAvailableBalanceForRestroAction, clearGetRestaurantListAction, clearbalanceTransferAction } from '../../../actions/action'
import { Picker } from '@react-native-community/picker';
import BalanceTransferSuccessModal from '../../modals/balanceTransferSuccessModal'

const { height, width } = Dimensions.get('window')

const BalanceTransferSecond = ({ navigation }) => {

    const dispatch = useDispatch();

    const [mobileNumber, setMobileNumber] = useState('')
    const [selectedRestaurant, setSelectedRestaurant] = useState(undefined)
    const [amount, setAmount] = useState('')
    const [isBalanceTransferModalVisible, setIsBalanceTransferModalVisible] = useState(false)

    const { restaurantList, availableBalance, balanceTransferRes, fetching, error } = useSelector(state => ({
        restaurantList: state.balanceTransferReducer.restaurantList,
        availableBalance: state.balanceTransferReducer.availableBalance,
        balanceTransferRes: state.balanceTransferReducer.balanceTransferRes,
        fetching: state.balanceTransferReducer.fetching,
        error: state.balanceTransferReducer.error,
    }), shallowEqual);

    useEffect(() => {
        let mobile = navigation.state.params.mobileNumber;
        setMobileNumber(mobile)

        if (restaurantList == undefined) {
            dispatch(getRestaurantListAction({ page: 1 }))
        }

        if (balanceTransferRes != undefined && balanceTransferRes.error == false) {
            showSuccess()
        }
        else if (balanceTransferRes != undefined && balanceTransferRes.error == true) {
            flashMessage(balanceTransferRes.message, 'danger')
            navigation.navigate(SCREEN_BALANCE_TRANSFER_FIRST)
            dispatch(clearGetAvailableBalanceForRestroAction({}))
            dispatch(clearGetRestaurantListAction({}))
            dispatch(clearbalanceTransferAction({}))
        }

    }, [restaurantList, balanceTransferRes])

    function onChangeAmount(number) {
        if (
            number == '' || number == '.' || number == ' ' ||
            number == ',' || number == '-' || number == '_' ||
            number == '*' || number == '@' || number == '!' ||
            number == '#' || number == '%' || number == '$' ||
            number == '&' || number == '^' || number == '+' ||
            number == '~' || number == '`' || number == '(' ||
            number == ')' || number == '=' || number == '{' ||
            number == '}' || number == '[' || number == ']' ||
            number == '|' || number == ':' || number == ';' ||
            number == '"' || number == "'" || number == '?' ||
            number == '/' || number == '<' || number == '>'
        ) {
            setAmount('')
        } else {
            let a = parseInt(number)
            setAmount(a.toString())
        }
    }

    function getAvailableBalance(hotelId) {
        dispatch(getAvailableBalanceForRestroAction({ hotel_id: hotelId }))
    }

    function onSubmit() {

        if (amount > availableBalance.response.available_cashback) {
            flashMessage("Amount can't be greator than available balance!", 'danger')
        }
        else if (amount < 0 || amount == 0) {
            flashMessage("Amount can't 0 or less than 0", 'danger')
        }
        else {
            let data = {
                user_mobile: mobileNumber,
                hotel_id: selectedRestaurant,
                amount: amount
            }
            dispatch(balanceTransferAction(data))
        }
        // navigation.navigate(SCREEN_LOGIN_WITH_OTP_SECOND)
    }

    function showSuccess() {
        setIsBalanceTransferModalVisible(true)
    }

    function onCloseModal() {
        navigation.navigate(SCREEN_HOME)
        setIsBalanceTransferModalVisible(false)
        dispatch(clearGetAvailableBalanceForRestroAction({}))
        dispatch(clearGetRestaurantListAction({}))
        dispatch(clearbalanceTransferAction({}))
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
                    title={mobileNumber}
                    fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    textStyle={{ marginHorizontal: 20, marginVertical: 20 }}
                />

                <View style={{
                    height: 4,
                    backgroundColor: colors.grey200
                }}>
                </View>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20,
                    marginTop: 30, borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: colors.lightGray,
                }}>
                    <Picker
                        style={{ width: '100%' }}
                        mode={'dropdown'}
                        selectedValue={selectedRestaurant}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedRestaurant(itemValue)
                            if (itemValue != -1) {
                                getAvailableBalance(itemValue)
                            }
                        }
                        }
                    >
                        {
                            restaurantList != undefined && restaurantList.response.map((item, index) => {
                                return (
                                    <Picker.Item label={item.name} value={item.id} />
                                )
                            })
                        }
                    </Picker>
                </View>



                <View style={{
                    backgroundColor: colors.green50, width: width / 2, paddingVertical: 10,
                    justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 20,
                    margin: 20

                }}>
                    <RegularText
                        title={Strings.available_cashback}
                        textStyle={{ fontSize: 12, color: colors.appGreen }}
                    />
                    <RegularText
                        title={availableBalance != undefined ? availableBalance.response.available_cashback : 0}
                        textStyle={{ fontSize: 18, color: colors.appGreen, alignSelf: 'flex-start' }}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    />
                </View>

                <RegularText
                    title={Strings.please_enter_your_amount_below}
                    textStyle={{
                        color: colors.darkGray,
                        fontSize: 12,
                        marginHorizontal: 20,
                        marginTop: 10
                    }}
                />

                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.rupee + ' ' + Strings.amount}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeAmount}
                        keyboardType={KEYBOARD_NUMBER_PAD}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.appBlack }}
                        value={amount}
                    />
                </View>

                <CommonButton
                    title={Strings.submit}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                    onPressButton={onSubmit}
                />

                <BalanceTransferSuccessModal
                    visible={isBalanceTransferModalVisible}
                    data={balanceTransferRes != undefined && balanceTransferRes.error == false && balanceTransferRes.response}
                    onClose={onCloseModal}
                />
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    textInputView: {
        height: DIMENS.txtInptH,
        marginTop: 10,
        marginHorizontal: 20
    }
});

export default BalanceTransferSecond;