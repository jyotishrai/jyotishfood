import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Utils from '../../utility';
import colors from '../../utility/Colors';
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_THIN, FONT_FAMILY_ROBOTO_REGULAR, FONT_FAMILY_ROBOTO_BLACK, POPPINS } from '../../utility/Typography';

const RegularText = (props) => {
    const {
        title,
        style,
        fontFamily,
        numberOfLines,
        textStyle
    } = props;
    const [isTxtShow, setIsTxtShow] = useState(true);

    return (
        <View style={[styles.constainer, style]}>
            <Text
                numberOfLines={numberOfLines != undefined ? numberOfLines : 1}
                style={[
                    textStyle,
                    {
                        fontFamily: fontFamily != undefined ? fontFamily : FONT_FAMILY_ROBOTO_REGULAR,
                    }
                ]}

            >
                {
                    title
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        justifyContent: 'center',
    },
});

export default RegularText;