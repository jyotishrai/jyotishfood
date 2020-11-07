import React from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_VEG, IMG_STAR, IMG_PERCENT } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';
import Strings from '../../translation/language';
import Ripple from 'react-native-material-ripple';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const SuperSaverRow = ({ item, index, onPressItem }) => {
    return (
        <Ripple style={{
            width: SCREEN_WIDTH - 20,
            borderRadius: 5,
            elevation: 3,
            backgroundColor: colors.white,
            alignSelf: 'center',
            marginTop: index == 0 ? 10 : 0,
            marginBottom: 10
        }}
            key={index.toString()}
            onPress={() => onPressItem(item)}
        >
            <View style={{
                height: 200,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5
            }}>
                <Image
                    source={{ uri: item.image }}
                    style={{
                        height: 200,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                    }}
                    resizeMode='cover'
                />
                <View style={{ backgroundColor: colors.transparentBlack, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}></View>
                <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                    <RegularText title={item.name} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} textStyle={{ color: colors.white, fontSize: 13 }} />
                    <RegularText title={item.cuisine_type} textStyle={{ color: colors.white, fontSize: 10 }} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, alignItems: 'center' }}>
                <Image source={IMG_PERCENT} resizeMode='contain' />
                <RegularText
                    title={item.cashback + '% ' + Strings.cashback.toLowerCase()}
                    textStyle={{ fontSize: 12, color: colors.grey500, marginLeft: 5 }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10, }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={IMG_STAR} resizeMode='contain' />
                        <RegularText title={item.rating} textStyle={{ fontSize: 12, color: colors.grey700, marginLeft: 5 }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                    <RegularText title={item.opening_closing_status} textStyle={{ fontSize: 12, color: colors.grey700, textTransform: 'capitalize' }} />
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

export default SuperSaverRow;