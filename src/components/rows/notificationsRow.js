import React from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_VEG, IMG_STAR, IMG_PERCENT, IMG_CHECK, IMG_USER_DEFAULT, IMG_LOGO, IMG_APP_ICON_ROUND } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BOLD } from '../../utility/Typography';
import Strings from '../../translation/language';
import Ripple from 'react-native-material-ripple';
import { convertDateTime, getTimeFromTimeStamp } from '../../utility/Utils';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const NotificationsRow = ({ item, index, onPressItem }) => {
    return (
        <Ripple style={[styles.mainView]}
        >
            <View style={{}}>
                <Image
                    source={IMG_APP_ICON_ROUND}
                    resizeMode="cover"
                    style={{
                        height: SCREEN_WIDTH / 9, width: SCREEN_WIDTH / 9,
                        borderRadius: 100,
                    }}
                />
            </View>
            <View style={{
                marginLeft: 10, flex: 9, borderBottomWidth: 2, borderBottomColor: colors.grey100, paddingBottom: 15,
            }}>
                <RegularText title={item.title} textStyle={{ color: colors.appBlack, paddingVertical: 0, marginTop: -3 }} fontFamily={FONT_FAMILY_ROBOTO_BOLD} />
                <RegularText title={item.message} textStyle={{ color: colors.darkGray, fontSize: 11, marginTop: 2 }} numberOfLines={5} />
                <RegularText title={convertDateTime((item.date) * 1000, 'DD-MM-YYYY/hh:mm a')} textStyle={{ color: colors.darkGray, fontSize: 11, marginTop: 5 }} numberOfLines={2} />
            </View>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10,
    },
});

export default NotificationsRow;