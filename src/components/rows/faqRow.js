import React from 'react';
import {
    View, StyleSheet, Image
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import RegularText from '../common/RegularText';
import colors from '../../utility/Colors';
import { IMG_PLUS, IMG_MINUS } from '../../utility/imageRes';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_LIGHT } from '../../utility/Typography';

const FaqRow = ({ item, index, onPressDown }) => {
    return (
        <View key={index} style={styles.mainView}>
            <View style={styles.toggleView}>
                <View style={{ flex: 9 }}>
                    <RegularText
                        title={item.question}
                        numberOfLines={10}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}

                    />
                </View>

                <Ripple
                    onPress={() => onPressDown(item, index)}
                    style={{ flex: 0.5 }}
                >
                    <Image
                        source={item.isOpen ? IMG_MINUS : IMG_PLUS}
                        resizeMode='contain'

                    />
                </Ripple>
            </View>
            {
                item.isOpen &&
                <View style={{ marginTop: 10 }}>
                    <RegularText
                        title={item.answer}
                        numberOfLines={100}
                        textStyle={{ color: colors.darkGray, fontSize: 12, }}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: 10,
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.grey200
    },
    toggleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    }
});

export default FaqRow;