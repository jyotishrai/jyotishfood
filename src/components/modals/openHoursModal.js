import React from 'react';
import { Modal, TouchableOpacity, StyleSheet, Dimensions, Image, View } from 'react-native';
import colors from '../../utility/Colors';
import { IMG_BIRTHDAY_POPUP, IMG_CLOSE } from '../../utility/imageRes';
import Ripple from 'react-native-material-ripple';
import RegularText from '../common/RegularText';
import Strings from '../../translation/language';
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const OpenHoursModal = ({ visible, onClose, openHour, closeHour }) => {
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
                    <RegularText
                        title={Strings.opening_and_closing_time}
                        textStyle={{
                            fontSize: 16
                        }}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <RegularText
                            title={Strings.openHour + ' : '}
                        />
                        <RegularText
                            title={openHour}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <RegularText
                            title={Strings.closeHour + ' : '}
                        />
                        <RegularText
                            title={closeHour}
                        />
                    </View>
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
        width: SCREEN_WIDTH - 50,
        // height: SCREEN_WIDTH / 3
        alignItems: 'center',
        padding: 15,
        borderRadius: 10
    },
});


export default OpenHoursModal;