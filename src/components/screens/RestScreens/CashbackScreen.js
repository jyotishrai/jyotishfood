import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList, ScrollView, Dimensions, RefreshControl } from 'react-native';
import CommonHeader from '../../common/CommonHeader'
import Strings from '../../../translation/language';
import { DIMENS, SCREEN_RESTAURANT_DETAIL, KEY_CASHBACK_HISTORY, SCREEN_BALANCE_TRANSFER_FIRST, SCREEN_BALANCE_RECEIVED, KEY_CB_HISTORY_TAB, SCREEN_EXPIRED_CASHBACK, SCREEN_AVAILABLE_CASHBACK } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import { IMG_SEARCH, IMG_MONEY, IMG_ARROW_NEXT, IMG_EXPIRED_CASHBACK, IMG_AVAILABLE_CASHBACK } from '../../../utility/imageRes';
import RegularText from '../../common/RegularText';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BOLD } from '../../../utility/Typography';
import Ripple from 'react-native-material-ripple';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getUserAvailableCashbackAction, getUserExpiredCashbackAction } from '../../../actions/action'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const CachbackViewRow = ({ title, onPress }) => {
    return (
        <Ripple style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: colors.white, elevation: 2, paddingHorizontal: 10, marginHorizontal: 20,
            borderRadius: 10, marginBottom: 15
        }}
            onPress={() => onPress()}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image source={IMG_MONEY} resizeMode="contain" style={{ marginRight: 15 }} />
                <RegularText title={title} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
            </View>
            <Image resizeMode="contain" source={IMG_ARROW_NEXT} />
        </Ripple>
    )
}

const CashbackScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const { userExpiredCashback, userAvailableCashback, fetching, error } = useSelector(state => ({
        userExpiredCashback: state.getUserCashbackReducer.userExpiredCashback,
        userAvailableCashback: state.getUserCashbackReducer.userAvailableCashback,
        fetching: state.getUserCashbackReducer.fetching,
        error: state.getUserCashbackReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getExpiredCashback()
        getAvailableCashback()
    }, [])

    function getExpiredCashback() {
        dispatch(getUserExpiredCashbackAction({ page: 1 }))
    }

    function getAvailableCashback() {
        dispatch(getUserAvailableCashbackAction({ page: 1 }))
    }

    function onPressEarnCb() {
        global[KEY_CB_HISTORY_TAB] = Strings.earn_cashback;
        navigation.navigate(KEY_CASHBACK_HISTORY)
    }

    function onPressRedeemCb() {
        global[KEY_CB_HISTORY_TAB] = Strings.redeem_cashback;
        navigation.navigate(KEY_CASHBACK_HISTORY)
    }

    function onPressBalanceTransfer() {
        navigation.navigate(SCREEN_BALANCE_TRANSFER_FIRST)
    }

    function onPressBalanceReceived() {
        navigation.navigate(SCREEN_BALANCE_RECEIVED)
    }

    function onPressExpiredCard() {
        navigation.navigate(SCREEN_EXPIRED_CASHBACK)
    }

    function onPressAvailableCard() {
        navigation.navigate(SCREEN_AVAILABLE_CASHBACK)
    }

    return (
        <View>
            <CommonHeader title={Strings.cashback} />
            <ScrollView
                contentContainerStyle={{ backgroundColor: colors.appBlack, flexGrow: 1 }}
                refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => {
                    getExpiredCashback()
                    getAvailableCashback()
                }} />}
            >

                <View style={styles.mainViewStyle}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 50 }}>
                        <Ripple style={styles.mainView} onPress={() => onPressExpiredCard()} >
                            <Image
                                source={IMG_EXPIRED_CASHBACK}
                                resizeMode="contain"
                            />
                            <View style={styles.cbData}>
                                <RegularText
                                    title={userExpiredCashback != undefined ? Strings.rupee + parseFloat(userExpiredCashback.response.expired_cashback).toFixed(1) : Strings.rupee + 0}
                                    textStyle={{ fontSize: 18, color: colors.white }}
                                    fontFamily={FONT_FAMILY_ROBOTO_BOLD}
                                />
                                <RegularText
                                    title={Strings.cashback_amount}
                                    textStyle={{ fontSize: 12, color: colors.white, marginBottom: 15 }}
                                />
                                <View style={styles.cbType}>
                                    <RegularText
                                        title={Strings.expired_cashback}
                                        textStyle={{ fontSize: 12, color: colors.appBlack }}
                                    />
                                </View>
                            </View>
                        </Ripple>

                        <Ripple style={styles.mainView} onPress={() => onPressAvailableCard()} >
                            <Image
                                source={IMG_AVAILABLE_CASHBACK}
                                resizeMode="contain"
                            />
                            <View style={styles.cbData}>
                                <RegularText
                                    title={userAvailableCashback != undefined ? Strings.rupee + parseFloat(userAvailableCashback.response.available_cashback).toFixed(1) : Strings.rupee + 0}
                                    textStyle={{ fontSize: 18, color: colors.white }}
                                    fontFamily={FONT_FAMILY_ROBOTO_BOLD}
                                />
                                <RegularText
                                    title={Strings.cashback_amount}
                                    textStyle={{ fontSize: 12, color: colors.white, marginBottom: 15 }}
                                />
                                <View style={styles.cbType}>
                                    <RegularText
                                        title={Strings.available_cashback}
                                        textStyle={{ fontSize: 12, color: colors.appBlack }}
                                    />
                                </View>
                            </View>
                        </Ripple>
                    </View>

                    <CachbackViewRow
                        title={Strings.earn_cashback}
                        onPress={onPressEarnCb}
                    />
                    <CachbackViewRow
                        title={Strings.redeem_cashback}
                        onPress={onPressRedeemCb}
                    />
                    <CachbackViewRow
                        title={Strings.balance_transfer}
                        onPress={onPressBalanceTransfer}
                    />
                    <CachbackViewRow
                        title={Strings.balance_received}
                        onPress={onPressBalanceReceived}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: colors.grey200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    cbRow: {
        backgroundColor: colors.white,
        elevation: 2
    },
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cbData: {
        alignItems: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: SCREEN_WIDTH / 4.2
    },
    cbType: {
        backgroundColor: colors.white,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 20
    }
});

export default CashbackScreen;