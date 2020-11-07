import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList, Dimensions, Linking, Platform, Share } from 'react-native';
import CommonHeader from '../../common/CommonHeader'
import Strings from '../../../translation/language';
import { DIMENS } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import { IMG_SEARCH, IMG_VEG, IMG_STAR, IMG_PERCENT, IMG_TIME, IMG_DIRECTION, IMG_BACK_WHITE, IMG_LIKE_ACTIVE, IMG_SHARE, IMG_LIKE_INACTIVE } from '../../../utility/imageRes';
import RegularText from '../../common/RegularText';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BOLD } from '../../../utility/Typography';
import SearchScreenRow from '../../rows/searchScreenResultRow';
import MileStoneRow from '../../rows/mileStoneRow';
import Ripple from 'react-native-material-ripple';
import NavigationService from '../../../NavigationService';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { likeDislikeHotelAction, clearLikeDislikeHotelAction } from '../../../actions/action';
import OpenHourModal from '../../modals/openHoursModal'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)

const mileStoneData = [
    { cashback: "100", dish: "Coffee + chips" },
    { cashback: "150", dish: "Burger + Cold drink + chips" },
    { cashback: "100", dish: "Coffee + chips" },
    { cashback: "150", dish: "Burger + Cold drink + chips" },
    { cashback: "100", dish: "Coffee + chips" },
    { cashback: "150", dish: "Burger + Cold drink + chips" },
    { cashback: "100", dish: "Coffee + chips" },
    { cashback: "150", dish: "Burger + Cold drink + chips" },
]

const RestaurantDetailScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [restroData, setRestroData] = useState(undefined)
    const [directionUrl, setDirectionUrl] = useState('')
    const [isRestaurantLiked, setIsRestaurantLiked] = useState(false)
    const [reRender, setReRender] = useState(false)
    const [isOpenHourModalVisible, setIsOpenHourModalVisible] = useState(false)

    const { likeDislikeHotelData, fetching, error } = useSelector(state => ({
        likeDislikeHotelData: state.hotelDetailAndLikeDisLikeReducerReducer.likeDislikeHotelData,
        fetching: state.searchRestaurantReducer.fetching,
        error: state.searchRestaurantReducer.error,
    }), shallowEqual);

    useEffect(() => {
        let restroData = navigation.state.params.data;
        setRestroData(restroData)
        // 'google.navigation:q=' + restroData.lat + '+' + restroData.lng

        return () => {
            dispatch(clearLikeDislikeHotelAction())
        }

    }, [])

    // alert(JSON.stringify(likeDislikeHotelData))

    function onPressBack() {
        NavigationService.back()
    }

    function onPressLike() {
        let data = restroData;
        // data.self_liked = !restroData.self_liked
        if (data.self_liked == 'Y') {
            data.self_liked = 'N'
        } else if (data.self_liked == 'N') {
            data.self_liked = 'Y'
        }
        setRestroData(data)
        setReRender(!reRender)
        dispatch(likeDislikeHotelAction({ hotel_id: restroData.id }))
    }

    async function onPressShare() {
        try {
            const result = await Share.share({
                message: "Hey, i found this " + restroData.name + " a awesome restaurent in " + restroData.address + "|" + " sent from HotPlate App."
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    function onPressOpenHours() {
        setIsOpenHourModalVisible(true)
    }

    function onCloseOpenHoursModal() {
        setIsOpenHourModalVisible(false)
    }

    function onPressDirection() {
        let location = `${restroData.lat},${restroData.lng}`
        let url = Platform.select({
            ios: `maps:${location}`,
            android: `geo:${location}?center=${location}&q=${location}&z=16`,
        });
        Linking.openURL(url)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 15, left: 10, right: 5 }}>
                <Ripple onPress={() => onPressBack()}>
                    <Image source={IMG_BACK_WHITE} resizeMode="contain" />
                </Ripple>
                <View style={{ flexDirection: 'row' }}>
                    <Ripple onPress={() => onPressLike()}>
                        <Image
                            source={restroData != undefined && restroData.self_liked == 'Y' ? IMG_LIKE_ACTIVE : IMG_LIKE_INACTIVE}
                            resizeMode="contain"
                            style={{ marginHorizontal: 5 }}
                        />
                    </Ripple>
                    <Ripple onPress={() => onPressShare()}>
                        <Image source={IMG_SHARE} resizeMode="contain" style={{ marginHorizontal: 5 }} />
                    </Ripple>
                </View>
            </View>
            <View style={styles.imageView}>
                {
                    restroData != undefined &&
                    <Image
                        source={{ uri: restroData.image }}
                        style={{ height: SCREEN_HEIGHT / 3, width: SCREEN_WIDTH }}
                        resizeMode="cover"
                    />
                }
            </View>
            <View style={styles.mainView}>

                <View style={{ marginVertical: 15, marginHorizontal: 15, borderBottomWidth: 4, borderBottomColor: colors.grey200, paddingBottom: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_VEG} resizeMode="contain" />
                            <RegularText title={restroData != undefined && restroData.name} textStyle={{ marginLeft: 5, fontSize: 16 }} fontFamily={FONT_FAMILY_ROBOTO_BOLD} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_STAR} resizeMode="contain" />
                            <RegularText title={restroData != undefined && parseFloat(restroData.rating).toFixed(1)} textStyle={{ marginLeft: 5, fontSize: 12, color: colors.darkGray }} />
                        </View>
                    </View>

                    <RegularText title={restroData != undefined && restroData.cuisine_type} textStyle={{ fontSize: 10, color: colors.darkGray, marginVertical: 2 }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Image source={IMG_PERCENT} resizeMode="contain" />
                        <RegularText title={restroData != undefined && restroData.cashback + '% ' + Strings.cashback_on_total_bill} textStyle={{ fontSize: 11, color: colors.darkGray, marginLeft: 5 }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Ripple onPress={() => onPressOpenHours()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_TIME} resizeMode="contain" />
                            <RegularText title={Strings.openHour} textStyle={{ fontSize: 12, color: colors.darkGray, marginLeft: 5, textDecorationLine: 'underline' }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                        </Ripple>
                        <Ripple onPress={() => { onPressDirection() }} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                            <Image source={IMG_DIRECTION} resizeMode="contain" />
                            <RegularText title={Strings.direction} textStyle={{ fontSize: 12, color: colors.darkGray, marginLeft: 5, textDecorationLine: 'underline' }} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} />
                        </Ripple>
                    </View>
                </View>
                <View style={{}}>
                    <RegularText title={Strings.milestone} textStyle={{ marginLeft: 15, fontSize: 16 }} fontFamily={FONT_FAMILY_ROBOTO_BOLD} />
                    {
                        restroData != undefined && restroData.milestone != [] &&
                        <FlatList
                            data={restroData.milestone}
                            renderItem={({ item, index }) => {
                                return (
                                    <MileStoneRow
                                        item={item}
                                        index={index}
                                    />
                                )
                            }}
                        />
                    }
                </View>
            </View>
            <OpenHourModal
                visible={isOpenHourModalVisible}
                onClose={onCloseOpenHoursModal}
                openHour={restroData != undefined ? restroData.open_hour : ''}
                closeHour={restroData != undefined ? restroData.closing_hour : ''}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        position: 'absolute',
        zIndex: -1,
        height: SCREEN_HEIGHT / 3,
        width: SCREEN_WIDTH,
        top: 0
    },
    mainView: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 0.7,
        zIndex: 1,
    }
});

export default RestaurantDetailScreen;