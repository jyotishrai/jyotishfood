import React from 'react';
import { Modal, TouchableOpacity, StyleSheet, Dimensions, Image, View } from 'react-native';
import colors from '../../utility/Colors';
import { IMG_BIRTHDAY_POPUP, IMG_CLOSE, IMG_SUCCESSFUL } from '../../utility/imageRes';
import Ripple from 'react-native-material-ripple';
import RegularText from '../common/RegularText';
import Strings from '../../translation/language';
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const profileUpdateModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType={"fade"}
            onRequestClose={() => {
                onClose()
            }}
            transparent={true}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.mainContainer}
                onPress={() => onClose()}
            >
                <TouchableOpacity activeOpacity={1} style={styles.visibleContainer}>
                    <Image
                        source={IMG_SUCCESSFUL}
                        style={{
                            alignSelf: 'center',
                            marginTop: -50
                        }}
                    />
                    <RegularText
                        title={'Profile Updated Successfully'}
                        textStyle={{
                            fontSize: 22,
                            color: colors.appGreen,
                            marginVertical: 20
                        }}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleContainer: {
        backgroundColor: colors.white,
        // height: SCREEN_HEIGHT / 2,
        width: SCREEN_WIDTH - 50,
        borderRadius: 20,
        alignItems: 'center',
        paddingBottom: 15
    },
    imageStyle: {
        height: SCREEN_WIDTH
    }
});


export default profileUpdateModal;