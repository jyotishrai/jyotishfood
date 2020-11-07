import React from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_VEG, IMG_STAR, IMG_PERCENT, IMG_CHECK } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BOLD } from '../../utility/Typography';
import Strings from '../../translation/language';
import Ripple from 'react-native-material-ripple';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const MileStoneRow = ({ item, index, onPressItem }) => {
    return (
        <Ripple style={[styles.mainView, {
        }]}
        >
            <View>
                <Image source={IMG_CHECK} resizeMode="contain" />
            </View>
            <View style={{ marginLeft: 10 }}>
                <RegularText title={item.title + ' ' + Strings.cashback} textStyle={{ color: colors.green700 }} fontFamily={FONT_FAMILY_ROBOTO_BOLD} />
                <RegularText title={item.offer} textStyle={{ color: colors.darkGray, marginTop: 5 }} fontFamily={FONT_FAMILY_ROBOTO_BOLD} />
            </View>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.grey50,
        elevation: 2,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 15
    },
    imageView: {
        height: SCREEN_WIDTH / 5,
        width: SCREEN_WIDTH / 5,
        borderRadius: 10,
        margin: 10,
    },
    infoView: {
        flex: 1,
        marginVertical: 10,
        paddingRight: 10,
    }
});

export default MileStoneRow;