import React from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_VEG, IMG_STAR, IMG_PERCENT, IMG_CHECK } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BOLD } from '../../utility/Typography';
import Strings from '../../translation/language';
import Ripple from 'react-native-material-ripple';
import { convertDateTime } from '../../utility/Utils';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const BalanceReceivedRow = ({ item, index, onPressItem }) => {
    return (
        <Ripple style={[styles.mainView, {
            marginTop: index == 0 ? 10 : 0
        }]}
        >
            <View>
                <RegularText title={Strings.received_from} textStyle={{ fontSize: 12, color: colors.appBlack }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                <RegularText title={item.transfer_by} textStyle={{ fontSize: 12, color: colors.darkGray }} />
                <RegularText title={convertDateTime(item.created, 'hh:mm A on DD MMM YYYY')} textStyle={{ fontSize: 11, color: colors.lightGray, marginTop: 10 }} />
            </View>
            <View style={{ marginLeft: 10 }}>
                <RegularText title={Strings.rupee + item.amount} textStyle={{ color: colors.appBlack, }} fontFamily={FONT_FAMILY_ROBOTO_BOLD} />
            </View>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderBottomColor: colors.grey200,
        borderBottomWidth: 2
    },
});

export default BalanceReceivedRow;