import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions, FlatList
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import colors from '../../../utility/Colors';
import Strings from '../../../translation/language'
import { DIMENS } from '../../../utility/constants';
import { } from '../../../utility/Utils';
import CommonHeader from '../../common/CommonHeader'
import BalanceReceivedRow from '../../rows/balanceReceivedRow';
import { getUserBalanceReceivedAction } from '../../../actions/action';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RegularText from '../../common/RegularText';

const { height, width } = Dimensions.get('window')

const skeletonCount = [1, , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const balanceReceived = [
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
    { from: "5454545454", amount: "100", date: "1:20 PM on 28 April 2020" },
]

const BalanceTransferFirst = ({ navigation }) => {

    const dispatch = useDispatch();

    const { receivedBalanceData, fetching, error } = useSelector(state => ({
        receivedBalanceData: state.getUserBalanceReceivedReducer.receivedBalanceData,
        fetching: state.getUserBalanceReceivedReducer.fetching,
        error: state.getUserCashbackReducer.error,
    }), shallowEqual);

    // alert(JSON.stringify(receivedBalanceData))

    useEffect(() => {
        getReceivedBalanceData()
    }, [])

    function getReceivedBalanceData() {
        dispatch(getUserBalanceReceivedAction({ page: 1 }))
    }

    function renderEmptyList() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RegularText title={'No Data Available!'} />
            </View>
        )
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
                title={Strings.balance_received}
            />

            <View style={{
                flex: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: colors.white
            }}>
                {
                    receivedBalanceData != undefined &&
                    <FlatList
                        data={receivedBalanceData.response}
                        ListEmptyComponent={renderEmptyList()}
                        renderItem={({ item, index }) => {
                            return (
                                <BalanceReceivedRow
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
                                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', marginTop: 5 }}>
                                    <View style={{}}>
                                        <View style={{ height: 15, width: width / 2, borderRadius: 2 }}></View>
                                        <View style={{ height: 10, width: width / 3, borderRadius: 2, marginTop: 5 }}></View>
                                        <View style={{ height: 10, width: width / 2.5, marginVertical: 5, borderRadius: 2 }}></View>
                                    </View>
                                    <View style={{ marginLeft: 10, }}>
                                        <View style={{ height: 15, width: width / 7, borderRadius: 2 }}></View>
                                    </View>
                                </View>
                                <View style={{ height: 1 }}></View>
                            </SkeletonPlaceholder>
                        )
                    })
                }
            </View>

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