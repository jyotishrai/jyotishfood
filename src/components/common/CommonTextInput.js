import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { DIMENS } from '../../utility/constants';
import { IMG_EMAIL, IMG_PASSWORD } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_REGULAR, } from '../../utility/Typography';


const CommonTextInput = (props) => {
    const {
        icon,
        placeHolder,
        onChangeText,
        onSubmitEditing,
        borderBottomColor,
        refValue,
        keyboardType,
        returnKeyType,
        secureTextEntry
    } = props
    return (
        <View style={[styles.mainView,
        {
            borderBottomColor: borderBottomColor != undefined ? borderBottomColor : colors.white
        }]}>
            <Image
                source={icon}
                resizeMode='contain'
                style={{ width: 20, }}
            />
            <TextInput
                placeholder={placeHolder}
                placeholderTextColor={colors.white}
                style={styles.textInputStyle}
                ref={refValue}
                onSubmitEditing={() => onSubmitEditing()}
                onChangeText={value => onChangeText(value)}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
            />
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
        paddingHorizontal: 12,
        fontFamily: FONT_FAMILY_ROBOTO_REGULAR,
    }
});

export default CommonTextInput;