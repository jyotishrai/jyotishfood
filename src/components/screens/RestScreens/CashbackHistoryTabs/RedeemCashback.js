import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import colors from '../../../../utility/Colors';
import CachbackHistoryRow from '../../../rows/redeemCashbackHistoryRow';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { getEarnedCashbackHistoryAction, getRedeemedCashbackHistoryAction } from '../../../../actions/action'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import RegularText from '../../../common/RegularText';
import Strings from '../../../../translation/language';

const skeletonCount = [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const cashbackHistory = [
    {
        hotel_name: "Marble Arch",
        hotel_image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg",
        time: "2 days ago",
        invoice: "545454545",
        discount: "33%",
        amount: "100",
        billAmount: "200",
    },
    {
        name: "Marble Arch",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg",
        time: "2 days ago",
        invoice: "545454545",
        discount: "33%",
        amount: "100",
        billAmount: "200",
    },
    {
        name: "Marble Arch",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg",
        time: "2 days ago",
        invoice: "545454545",
        discount: "33%",
        amount: "100",
        billAmount: "200",
    },
]

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RedeemCashbackScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const { redeemedCashbackHistory, fetching, error } = useSelector(state => ({
        redeemedCashbackHistory: state.getCashbackHistoryReducer.redeemedCashbackHistory,
        fetching: state.getCashbackHistoryReducer.fetching,
        error: state.getCashbackHistoryReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getRedeemedCashback()
    }, [])

    function getRedeemedCashback() {
        dispatch(getRedeemedCashbackHistoryAction({ page: 1 }))
    }

    function renderEmptyCashbackHistory() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RegularText
                    title={'No Data Available'}
                />
            </View>
        )
    }

    return (
        <View style={styles.mainViewStyle}>
            {
                redeemedCashbackHistory != undefined &&
                <FlatList
                    data={redeemedCashbackHistory.response}
                    ListEmptyComponent={renderEmptyCashbackHistory()}
                    renderItem={({ item, index }) => {
                        return (
                            <CachbackHistoryRow
                                item={item}
                                index={index}
                            />
                        )
                    }}
                />
            }
            {
                fetching && skeletonCount.map((item, index) => {
                    return (
                        <SkeletonPlaceholder
                            backgroundColor={colors.grey200}
                            highlightColor={colors.grey300}
                            key={index.toString()}
                        >
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <View style={{ height: SCREEN_WIDTH / 7, width: SCREEN_WIDTH / 7, borderRadius: 5 }}></View>
                                <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                                    <View style={{ height: 15, width: SCREEN_WIDTH / 2, borderRadius: 2 }}></View>
                                    <View style={{ height: 10, width: SCREEN_WIDTH / 3, marginVertical: 5, borderRadius: 2 }}></View>
                                    <View style={{ height: 10, width: SCREEN_WIDTH / 2.5, borderRadius: 2 }}></View>
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    )
                })
            }
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

export default RedeemCashbackScreen;