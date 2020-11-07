import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Dimensions, Image, View } from 'react-native';
import colors from '../../utility/Colors';
import { IMG_BIRTHDAY_POPUP, IMG_CLOSE, IMG_POP_UP_TOP, IMG_GIFT } from '../../utility/imageRes';
import Ripple from 'react-native-material-ripple';
import RegularText from '../common/RegularText';
import Strings from '../../translation/language';
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../utility/Typography';
import Rating from 'react-native-star-rating'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { rateHotelAction, clearRateHotelAction } from '../../actions/action';
import flashMessage from '../common/CustomFlashAlert';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RatingModal = ({ visible, onClose, restroId, message }) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState(0)

    const { rateHotelRes, fetching, error } = useSelector(state => ({
        rateHotelRes: state.rateHotelReducer.rateHotelRes,
        fetching: state.rateHotelReducer.fetching,
        error: state.rateHotelReducer.error,
    }), shallowEqual);

    useEffect(() => {
        if (rateHotelRes != undefined && rateHotelRes.error == false) {
            dispatch(clearRateHotelAction({}))
            setRating(0)
            flashMessage(rateHotelRes.message, 'success')
            onClose()
        }
    }, [rateHotelRes])

    function onRatingChange(rating) {
        setRating(rating)

        let rateData = {
            hotel_id: restroId,
            rating: rating
        }
        dispatch(rateHotelAction(rateData))
    }

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
                    <View style={{
                        backgroundColor: colors.white,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}>
                        <View>
                            <Image
                                source={IMG_POP_UP_TOP}
                            />
                            <Image
                                source={IMG_GIFT}
                                style={{
                                    // position: 'absolute',
                                    alignSelf: 'center',
                                    marginTop: -60
                                }}
                            />
                        </View>
                        <RegularText
                            title={Strings.congratulations}
                            textStyle={{
                                color: colors.green500,
                                fontSize: 22,
                                alignSelf: 'center'
                            }}
                            fontFamily={FONT_FAMILY_ROBOTO_BOLD}
                        />
                        <RegularText
                            title={message}
                            textStyle={{
                                alignSelf: 'center',
                                fontSize: 16,
                                marginTop: 10,
                                textTransform: 'capitalize'
                            }}
                            fontFamily={FONT_FAMILY_ROBOTO_BOLD}
                            numberOfLines={5}
                        />
                        <View style={{
                            backgroundColor: colors.grey200, padding: 10, marginTop: 30,
                            borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                        }}>
                            <RegularText
                                title={Strings.rate_the_restaurant}
                                textStyle={{
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    marginTop: 2
                                }}
                                fontFamily={FONT_FAMILY_ROBOTO_BOLD}
                            />
                            <View style={{ marginVertical: 10 }}>
                                <Rating
                                    rating={rating}
                                    emptyStarColor={colors.grey400}
                                    maxStars={5}
                                    fullStarColor={colors.green500}
                                    starStyle={{ marginHorizontal: 10 }}
                                    selectedStar={(rating) => onRatingChange(rating)}
                                />
                            </View>
                        </View>
                    </View>
                    <Ripple style={{ alignSelf: 'center', marginTop: 20 }} onPress={() => onClose()}>
                        <Image
                            source={IMG_CLOSE}
                            style={{
                                alignSelf: 'center',
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
        // backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
    },
    imageStyle: {
        height: SCREEN_WIDTH
    }
});


export default RatingModal;