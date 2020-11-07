import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import { IMG_BACK, IMG_BACK_WHITE } from '../../utility/imageRes';
import NavigationService from '../../NavigationService';
import Ripple from 'react-native-material-ripple';
import RegularText from './RegularText';
import Strings from '../../translation/language';

function CommonHeader({ title }) {

    function onPressBack() {
        NavigationService.back()
    }

    return (
        <View style={{
            flexDirection: 'row', justifyContent: 'center',
            paddingVertical: 10, height: 50,
            alignItems: 'center',
            backgroundColor: colors.appBlack
        }}>
            <Ripple style={{
                position: 'absolute',
                left: 15,
                padding: 5
            }}
                onPress={() => onPressBack()}
            >
                <Image
                    source={IMG_BACK_WHITE}
                    resizeMode='contain'
                />
            </Ripple>
            <RegularText
                title={title}
                textStyle={{ color: colors.white, fontSize: 15 }}
            />
        </View>
    );
}
const styles = StyleSheet.create({

})

export default CommonHeader;