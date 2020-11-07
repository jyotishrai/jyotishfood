import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { DIMENS } from '../../utility/constants';
import { IMG_ARROW_NEXT } from '../../utility/imageRes';
import Ripple from 'react-native-material-ripple'
import RegularText from './RegularText';

const { height, width } = Dimensions.get('window')

const CommonButton = ({ backgroundColor, title, textStyle, buttonStyle, onPressButton }) => {
    return (
        <Ripple
            style={[styles.buttonStyle, buttonStyle, {
                backgroundColor: backgroundColor != undefined ? backgroundColor : colors.buttonColor,
            }]}
            onPress={() => { onPressButton() }}
        >
            <RegularText
                title={title}
                textStyle={textStyle}
            />
        </Ripple>
    )
}


const styles = StyleSheet.create({
    buttonStyle: {
        height: DIMENS.btnH,
        borderRadius: 50,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CommonButton;