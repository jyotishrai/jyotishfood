import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import CommonHeader from '../../common/CommonHeader'
import Strings from '../../../translation/language';
import { DIMENS, SCREEN_RESTAURANT_DETAIL } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import { IMG_SEARCH } from '../../../utility/imageRes';
import RegularText from '../../common/RegularText';
import { FONT_FAMILY_ROBOTO_MEDIUM } from '../../../utility/Typography';
import SearchScreenRow from '../../rows/searchScreenResultRow';
import NotificationsRow from '../../rows/notificationsRow';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNotificationAction, listAvailableCashbackAction } from '../../../actions/action';
import CustomLoader from '../../common/CustomLoader'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CashbackHistoryRow from '../../rows/CashbackScreenRow';

const skeletonCount = [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AvailableCashbackScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const { availableCashbackRes, fetching, error } = useSelector(state => ({
        availableCashbackRes: state.listCashbackReducer.availableCashbackRes,
        fetching: state.listCashbackReducer.fetching,
        error: state.listCashbackReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getAvailableCashback()
    }, [])

    function getAvailableCashback() {
        dispatch(listAvailableCashbackAction({ page: 1 }))
    }

    // alert(JSON.stringify(notiRes))

    function renderEmptyList() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <RegularText
                    title={'No Data Available!'}
                />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: colors.appBlack, flex: 1 }}>
            <CommonHeader title={Strings.available_cashback} />
            <View style={styles.mainViewStyle}>
                {
                    availableCashbackRes != undefined &&
                    <FlatList
                        data={availableCashbackRes.response}
                        ListEmptyComponent={renderEmptyList()}
                        renderItem={({ item, index }) => {
                            return (
                                <CashbackHistoryRow
                                    item={item}
                                    index={index}
                                />
                            )
                        }}
                    />
                }
                {
                    fetching &&
                    skeletonCount.map((item, index) => {
                        return (
                            <SkeletonPlaceholder
                                backgroundColor={colors.grey200}
                                highlightColor={colors.grey300}
                                style={{ marginVertical: 20 }}
                                key={index.toString()}
                            >
                                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', marginVertical: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ height: SCREEN_WIDTH / 7, width: SCREEN_WIDTH / 7, borderRadius: 5 }}></View>
                                        <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                                            <View style={{ height: 15, width: SCREEN_WIDTH / 2, borderRadius: 2 }}></View>
                                            <View style={{ height: 10, width: SCREEN_WIDTH / 5, marginVertical: 5, borderRadius: 2 }}></View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ height: 10, width: SCREEN_WIDTH / 7, borderRadius: 2 }}></View>
                                                <View style={{ height: 10, width: SCREEN_WIDTH / 5, borderRadius: 2, marginLeft: 5 }}></View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: 30, height: 15, }}></View>
                                </View>
                                <View style={{ height: 4, marginBottom: 0 }}></View>
                            </SkeletonPlaceholder>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    }
});

export default AvailableCashbackScreen;