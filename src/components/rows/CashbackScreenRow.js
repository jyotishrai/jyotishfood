import React from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_VEG, IMG_STAR, IMG_PERCENT } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';
import Strings from '../../translation/language';
import Ripple from 'react-native-material-ripple';
import { timeSince } from '../../utility/Utils';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const CashbackScreenRow = ({ item, index }) => {
    return (
        <Ripple style={[styles.mainView, {
            borderBottomWidth: 4,
            borderBottomColor: colors.grey200
        }]}
            key={index.toString()}
        >
            <View>
                <Image style={styles.imageView} resizeMode="cover" source={{ uri: item.hotel_image }} />
                {/* <RegularText title={timeSince(item.created)} textStyle={{ color: colors.darkGray, fontSize: 11, marginTop: 5 }} /> */}
            </View>
            <View style={styles.infoView}>
                <RegularText title={item.hotel_name} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} textStyle={{ fontSize: 16, textTransform: 'capitalize' }} />
                {/* <RegularText title={Strings.invoice + ' : ' + item.invoice_no} textStyle={{ color: colors.lightGray, marginTop: 5, fontSize: 12, }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} /> */}
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1, }}>
                    <RegularText title={Strings.rupee + item.total_bill} textStyle={{ color: colors.lightGray, marginTop: 5, fontSize: 12, textDecorationLine: 'line-through', }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                    <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', marginTop: 5 }}>
                        <Image source={IMG_PERCENT} />
                        <RegularText title={item.cashback_percentage + '% ' + Strings.cashback.toLowerCase()} textStyle={{ color: colors.lightGray, marginLeft: 5, fontSize: 12, }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                    </View>
                </View> */}
            </View>
            <View style={{ justifyContent: 'center' }}>
                <RegularText title={Strings.rupee + parseFloat(item.cashback).toFixed(2)} textStyle={{ alignSelf: 'center' }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
            </View>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        padding: 15,
    },
    imageView: {
        height: SCREEN_WIDTH / 7,
        width: SCREEN_WIDTH / 7,
        borderRadius: 5,
    },
    infoView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10
    }
});

export default CashbackScreenRow;