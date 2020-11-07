import React, { Component } from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import colors from '../../utility/Colors';
import RegularText from '../common/RegularText';
import { Constants, Typography } from '../../utility';
import CommonButton from '../common/CommonButton';
import Strings from '../../translation/language';
import * as Utils from '../../utility'
import { DIMENS } from '../../utility/constants';
import { FONT_FAMILY_ROBOTO_BOLD } from '../../utility/Typography';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const customImagePickerModal = (props) => {
    const {
        visible,
        onClose,
        onCameraClick,
        onGallaryClick
    } = props

    return (
        <View style={{ marginTop: 22 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose()
                }}>
                <TouchableOpacity
                    style={styles.modalMainContainer}
                    activeOpacity={1}
                    onPress={() => onClose()}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>

                        <CommonButton
                            buttonStyle={styles.button}
                            title={Strings.camera.toUpperCase()}
                            onPressButton={() => onCameraClick()}
                            textStyle={{ color: colors.white, }}
                        />

                        <CommonButton
                            buttonStyle={styles.button}
                            title={Strings.gallary.toUpperCase()}
                            onPressButton={() => onGallaryClick()}
                            textStyle={{ color: colors.white }}
                        />

                        <CommonButton
                            buttonStyle={[styles.button, { backgroundColor: colors.APP_GRAY }]}
                            title={Strings.cancel.toUpperCase()}
                            onPressButton={() => onClose()}
                            textStyle={{ color: colors.white }}
                        />

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        //flex: 1,
        width: screenWidth,
        height: screenHeight / 3,
        alignItems: "center",
        justifyContent: 'space-evenly',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    button: {
        width: screenWidth - 30
    }
})

export default customImagePickerModal;