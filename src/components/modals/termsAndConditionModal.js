import React from 'react';
import { Modal, TouchableOpacity, StyleSheet, Dimensions, Image, View, ActivityIndicator, ScrollView } from 'react-native';
import colors from '../../utility/Colors';
import { IMG_BIRTHDAY_POPUP, IMG_CLOSE, IMG_SUCCESSFUL } from '../../utility/imageRes';
import Ripple from 'react-native-material-ripple';
import RegularText from '../common/RegularText';
import Strings from '../../translation/language';
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';
import { WebView } from 'react-native-webview'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const termsAndConditionModal = ({ visible, onClose }) => {

    function renderLoading() {
        return (
            <View style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={colors.buttonColor} size='large' />
            </View>
        )
    }

    return (
        <Modal
            visible={visible}
            animationType={"slide"}
            onRequestClose={() => {
                onClose()
            }}
            transparent={true}
        >
            <View
                activeOpacity={1}
                style={styles.mainContainer}
            >
                <View style={styles.header}>
                    {/* <RegularText
                        title={Strings.terms_and_condition}
                        textStyle={{ color: colors.appBlack, fontSize: 18, }}
                    /> */}
                    <TouchableOpacity onPress={() => onClose()}>
                        <Image
                            source={IMG_CLOSE}
                        />
                    </TouchableOpacity>
                </View>
                <WebView
                    source={{ uri: 'http://hotplatefood.in/pages/term-and-conditions' }}
                    style={{
                        height: SCREEN_HEIGHT,
                        width: SCREEN_WIDTH,
                        flex: 1
                    }}
                    scalesPageToFit
                    javaScriptEnabled
                    renderLoading={() => renderLoading()}
                    startInLoadingState
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleContainer: {
        backgroundColor: colors.white,
        height: SCREEN_HEIGHT / 1.5,
        width: SCREEN_WIDTH,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    imageStyle: {
        height: SCREEN_WIDTH
    },
    header: {
        height: 55,
        width: SCREEN_WIDTH,
        backgroundColor: colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    }
});


export default termsAndConditionModal;