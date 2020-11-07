import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { DIMENS } from '../../utility/constants';
import { IMG_EMAIL, IMG_PASSWORD } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_REGULAR, } from '../../utility/Typography';
import Ripple from 'react-native-material-ripple';


const CommonTextInput = (props) => {
    const {
        placeholderTextColor,
        placeHolder,
        onChangeText,
        onSubmitEditing,
        borderBottomColor,
        refValue,
        keyboardType,
        returnKeyType,
        secureTextEntry,
        rightIcon,
        onPressRightIcon,
        inputStyle,
        editable,
        value
    } = props
    return (
        <View style={[styles.mainView,
        {
            borderBottomColor: borderBottomColor != undefined ? borderBottomColor : colors.white
        }]}>
            <TextInput
                placeholder={placeHolder}
                placeholderTextColor={placeholderTextColor != undefined ? placeholderTextColor : colors.black}
                style={[styles.textInputStyle, inputStyle]}
                ref={refValue}
                onSubmitEditing={() => onSubmitEditing()}
                onChangeText={value => onChangeText(value)}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                editable={editable != undefined ? editable : true}
                value={value}
            />
            {
                rightIcon != undefined &&
                <Ripple onPress={() => onPressRightIcon()}>
                    <Image source={rightIcon} resizeMode="contain" />
                </Ripple>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        height: DIMENS.txtInptH,
        alignItems: 'center',
        width: '100%'
    },
    textInputStyle: {
        color: colors.white,
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: FONT_FAMILY_ROBOTO_REGULAR
    }
});

export default CommonTextInput;