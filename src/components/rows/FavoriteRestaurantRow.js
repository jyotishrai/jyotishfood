import React from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_VEG, IMG_STAR, IMG_PERCENT } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';
import Strings from '../../translation/language';
import Ripple from 'react-native-material-ripple';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const SearchScreenRow = ({ item, index, onPressItem }) => {
    return (
        <Ripple style={[styles.mainView, {
            borderBottomWidth: 4,
            borderBottomColor: colors.grey200
        }]}
            onPress={() => onPressItem(item, index)}
        >
            <View>
                <Image style={styles.imageView} resizeMode="cover" source={{ uri: item.image }} />
            </View>
            <View style={styles.infoView}>
                <RegularText title={item.name} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                <RegularText title={item.address} textStyle={{ color: colors.lightGray, marginTop: 3, fontSize: 12 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1, }}>
                    {/* <RegularText title={Strings.rupee + item.price_for_two + ' ' + Strings.for_2} textStyle={{ color: colors.darkGray, fontSize: 11, marginRight: 10 }} /> */}
                    <RegularText title={item.cuisine_type} textStyle={{ color: colors.darkGray, fontSize: 11, }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                        <Image source={IMG_VEG} resizeMode="contain" style={{ marginRight: 5, }} />
                        <Image source={IMG_STAR} resizeMode="contain" style={{ marginRight: 5 }} />
                        <RegularText title={item.rating} textStyle={{ color: colors.darkGray, fontSize: 12 }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={IMG_PERCENT} resizeMode="contain" style={{ marginRight: 5 }} />
                        <RegularText title={item.cashback + '% ' + Strings.cashback} textStyle={{ color: colors.lightGray, fontSize: 12 }} />
                    </View>
                </View>
            </View>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
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

export default SearchScreenRow;