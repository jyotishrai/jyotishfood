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

const BirthdayModal = ({ visible, onClose }) => {
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
                    <View>
                        <Image
                            source={IMG_BIRTHDAY_POPUP}
                            resizeMode='contain'
                            style={styles.imageStyle}
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 30,
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}>
                            <RegularText
                                title={Strings.happy_birthday}
                                textStyle={{
                                    fontSize: 30,
                                    color: colors.yellow500,
                                    marginBottom: 15
                                }}
                                fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                            />
                            <RegularText
                                title={Strings.today_you_can_use_your_expired_cashback}
                                numberOfLines={3}
                                textStyle={{
                                    fontSize: 16,
                                    color: colors.white,
                                    width: SCREEN_WIDTH / 1.5,
                                    textAlign: 'center'
                                }}
                            />
                        </View>
                    </View>
                    <Ripple style={{ alignSelf: 'center' }} onPress={() => onClose()}>
                        <Image
                            source={IMG_CLOSE}
                            style={{
                                alignSelf: 'center',
                                marginTop: 20
                            }}
                            resizeMode="contain"
                        />
                    </Ripple>
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
    },
    imageStyle: {
        height: SCREEN_WIDTH
    }
});


export default BirthdayModal;