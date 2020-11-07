import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import RegularText from '../../../../../common/RegularText';
import { HOMEBANNER1, HOMEBANNER2, HOMEBANNER3, IMG_CAT_BEST_SELLER, IMG_CAT_VEG, IMG_CAT_NEW, IMG_CAT_TOP_RATED, IMG_CAT_POCKET_FRIENDLY, IMG_PERCENT, IMG_STAR, IMG_ARROW_RED_FILLED } from '../../../../../../utility/imageRes';
import Swiper from 'react-native-swiper'
import colors from '../../../../../../utility/Colors';
import Strings from '../../../../../../translation/language';
import Ripple from 'react-native-material-ripple'
import { FONT_FAMILY_ROBOTO_BOLD, FONT_FAMILY_ROBOTO_MEDIUM } from '../../../../../../utility/Typography';
import BirthdayModal from '../../../../../modals/birthdayModal';
import { HotPlateDayHotelAction } from '../../../../../../actions/action'
import FastImage from 'react-native-fast-image';
import { KEY_USER_LAT, KEY_USER_LONG, SCREEN_RESTAURANT_DETAIL, SCREEN_ALL_NEARBY_RESTRO, SCREEN_ALL_FEATURED_RESTRO, SCREEN_FILTER_RESTRO } from '../../../../../../utility/constants';
import Geolocation from '@react-native-community/geolocation';
import { getOpenCloseStatus, requestLocPermission } from '../../../../../../utility/Utils';
import { BookContext } from '../../../../../../Contexts'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SuperSaverRow from '../../../../../rows/superSaverRow';

const skeletonCount = [1, 2, 3]

const carouselData = [HOMEBANNER1, HOMEBANNER2, HOMEBANNER3]
const homeCatData = [
    { name: Strings.veg_only, image: IMG_CAT_VEG },
    { name: Strings.newly_launched, image: IMG_CAT_NEW },
    { name: Strings.top_rated, image: IMG_CAT_TOP_RATED },
    { name: Strings.best_sellers, image: IMG_CAT_BEST_SELLER },
    { name: Strings.pocket_friendly, image: IMG_CAT_POCKET_FRIENDLY },
]

const nearbyRestaurent = [
    { name: "Giando Italian Restaurent & Bar", image: 'https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg', type: "North Indian", discount: "33%", rating: "4.5", estimate_time_of_delivery: "15 min", price_for_two: "300", status: "Open" },
    { name: "Apsara Food Court", image: 'https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/master/pass/Alo-Restaurant__2018_Raffi-Photo-2.jpg', type: "Chinese and Fast Food", discount: "10%", rating: "4.0", estimate_time_of_delivery: "10 min", price_for_two: "500", status: "Close" },
    { name: "Kamal Restaurent", image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/03/05/09/ampeli-restaurant-review-steven-joyce.jpg', type: "Dinner and Lunch", discount: "50%", rating: "5.0", estimate_time_of_delivery: "15 min", price_for_two: "200", status: "Open" },
    { name: "Hari Chaya Fast Food", image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', type: "Snacks and Fast Food", discount: "20%", rating: "4.5", estimate_time_of_delivery: "30 min", price_for_two: "300", status: "Open" }
]

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HotPlateDayScreen = ({ }) => {

    const dispatch = useDispatch();
    const { navigation } = useContext(BookContext)

    const { hotPlateDayRes, fetching, error } = useSelector(state => ({
        hotPlateDayRes: state.getHotPlateDayHotelsReducer.hotPlateDayRes,
        fetching: state.getHotPlateDayHotelsReducer.fetching,
        error: state.getHotPlateDayHotelsReducer.error,
    }), shallowEqual);

    useEffect(() => {

        navigation.addListener(
            'focus',
            () => {
                getCurrentLocation()
            }
        );

        getCurrentLocation()
    }, [])

    function getCurrentLocation() {
        requestLocPermission(position => {
            console.log("response::-location", position);
            if (position && position.coords) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                getHotPlateDayHotels(lat, lng)
            }

        })
        // Geolocation.getCurrentPosition(
        //     position => {
        //         // alert(JSON.stringify(position))
        //         let lat = position.coords.latitude;
        //         let lng = position.coords.longitude;
        //         getHotPlateDayHotels(lat, lng)

        //     },
        //     error => console.log(error.message),
        //     { enableHighAccuracy: true, }
        // );
    }

    function getHotPlateDayHotels(lat, lng) {
        let location = {
            lat: lat,
            lng: lng
        }
        dispatch(HotPlateDayHotelAction(location))
    }

    function renderEmptyList() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RegularText
                    title={hotPlateDayRes.message}
                    textStyle={{ marginTop: 20, color: colors.grey400 }}
                />
            </View>
        )
    }

    function onPressItem(item) {
        navigation.navigate(SCREEN_RESTAURANT_DETAIL, { data: item })
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
            refreshControl={<RefreshControl refreshing={fetching} onRefresh={() => getCurrentLocation()} />}
        >
            {
                hotPlateDayRes != undefined &&
                <FlatList
                    data={hotPlateDayRes.response}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyList}
                    renderItem={({ item, index }) => {
                        return (
                            <SuperSaverRow
                                item={item}
                                index={index}
                                onPressItem={onPressItem}
                            />
                        )
                    }}
                />
            }
            {
                fetching && skeletonCount.map((index, item) => {
                    return (
                        <SkeletonPlaceholder
                            backgroundColor={colors.grey200}
                            highlightColor={colors.grey300}
                        >
                            <View style={{ alignSelf: 'center' }}>
                                <View style={{ height: 200, width: SCREEN_WIDTH - 20, marginVertical: 10, borderRadius: 5, }}></View>
                                <View style={{ height: 10, width: SCREEN_WIDTH / 2, borderRadius: 2, }}></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ height: 10, width: SCREEN_WIDTH / 5, marginVertical: 10, borderRadius: 2, }}></View>
                                    <View style={{ height: 10, width: SCREEN_WIDTH / 5, marginVertical: 10, borderRadius: 2, }}></View>
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    )
                })
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    swiperContainer: {
        height: 200,
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    swiperImage: {
        height: 180,
        width: SCREEN_WIDTH - 20,
        borderRadius: 10,
        margin: 10,
        backgroundColor: colors.grey400
    },
    homeCatStyle: {
        backgroundColor: colors.grey300,
        borderRadius: 3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 25
    }
});

export default HotPlateDayScreen;