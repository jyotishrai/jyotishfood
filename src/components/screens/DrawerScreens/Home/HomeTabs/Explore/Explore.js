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
    RefreshControl,
    DeviceEventEmitter,
    Alert
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
import { getHomeBannersAction, getNearbyRestaurantAction, getFeaturedRestaurantAction, clearLoginAction, HotPlateDayHotelAction, getSuperSaverDealsAction } from '../../../../../../actions/action'
import FastImage from 'react-native-fast-image';
import { KEY_USER_LAT, KEY_USER_LONG, SCREEN_RESTAURANT_DETAIL, SCREEN_ALL_NEARBY_RESTRO, SCREEN_ALL_FEATURED_RESTRO, SCREEN_FILTER_RESTRO, KEY_USER_DATA, SCREEN_ALL_BEST_OFFERS, SCREEN_LOGIN, KEY_AUTH, KEY_APP, KEY_SPLASH } from '../../../../../../utility/constants';
import Geolocation from '@react-native-community/geolocation';
import { getOpenCloseStatus, convertDateTime, requestLocPermission } from '../../../../../../utility/Utils';
import { BookContext } from '../../../../../../Contexts'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { clearData } from '../../../../../../utility/CustomAsyncStorage';
import NavigationService from '../../../../../../NavigationService';
import * as Utils from '../../../../../../utility';

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

const ExploreScreen = ({ }) => {

    let sessionOut = undefined;

    const dispatch = useDispatch();
    const { navigation } = useContext(BookContext)

    const [isBirthdayModalVisible, setIsBirthdayModalVisible] = useState(false)
    const [bannerData, setBannerData] = useState(undefined)
    const [nearByData, setNearByData] = useState(undefined)

    const { homeBanner, nearbyRestaurant, featuredRestaurant, fetching, error } = useSelector(state => ({
        homeBanner: state.getHomeBannerReducer.homeBanner,
        nearbyRestaurant: state.getNearByRestaurantReducer.nearbyRestaurant,
        featuredRestaurant: state.getFeaturedRestaurantReducer.featuredRestaurant,
        fetching: state.getHomeBannerReducer.fetching,
        error: state.getHomeBannerReducer.error,
    }), shallowEqual);

    // alert(JSON.stringify(homeBanner))

    useEffect(() => {

        navigation.addListener(
            'didFocus',
            () => {
                fechlocation()
            }
        );

        sessionOut && sessionOut.remove()
        sessionOut = DeviceEventEmitter.addListener(Utils.Constants.KEY_SESSION_LOG_OUT, sessionLogOut)

        showBirthDayModal()

        fechlocation()
        // getCurrentLocation()

        return () => {
            sessionOut && sessionOut.remove()
        }

    }, [])

    function getRestTabsData(lat, lng) {
        let location = {
            lat: lat,
            lng: lng
        }
        dispatch(HotPlateDayHotelAction(location))
    }

    function sessionLogOut() {
        Alert.alert(
            "",
            "Session Out",
            [
                {
                    text: "OK", onPress: () => {
                        dispatch(clearLoginAction())
                        clearData()
                            .then(() => {
                                // NavigationService.clearStack(KEY_SPLASH)
                                navigation.navigate(SCREEN_LOGIN)
                            })
                    }
                }
            ],
            { cancelable: false })
    }

    function fechlocation() {
        requestLocPermission(response => {
            console.log("response::-location", response);
            if (response && response.coords) {
                let lat = response.coords.latitude;
                let lng = response.coords.longitude;
                getNearByRestaurants(lat, lng)
                getHomeBanners()
                getFeaturedrestaurant(lat, lng)
                getRestTabsData(lat, lng)
            }

        })

    };

    function getRestTabsData(lat, lng) {
        let location = {
            lat: lat,
            lng: lng
        }
        dispatch(HotPlateDayHotelAction(location))
        dispatch(getNearbyRestaurantAction(location))
        dispatch(getSuperSaverDealsAction(location))
    }

    function showBirthDayModal() {
        let userBirthday = global[KEY_USER_DATA].dob
        let bDay = convertDateTime(userBirthday, 'DD/MM')
        let todayDate = convertDateTime(new Date(), 'DD/MM')
        if (bDay == todayDate) {
            setIsBirthdayModalVisible(true)
        }
    }

    function onRefreshCompleteHome() {
        getHomeBanners()
        fechlocation()
        // getCurrentLocation()
    }

    function getCurrentLocation() {
        Geolocation.getCurrentPosition(
            position => {
                console.log("Location:-", position)
                // alert(JSON.stringify(position))
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                getNearByRestaurants(lat, lng)
                getHomeBanners()
                getFeaturedrestaurant(lat, lng)
            },
            error => console.log(error.message),
            { enableHighAccuracy: true, }
        );
    }

    function getHomeBanners() {
        dispatch(getHomeBannersAction({ page: 1 }))
    }

    function getNearByRestaurants(lat, lng) {

        let location = {
            lat: lat,
            lng: lng
        }
        dispatch(getNearbyRestaurantAction(location))
    }

    function getFeaturedrestaurant(lat, lng) {
        let location = {
            lat: lat,
            lng: lng
        }
        dispatch(getFeaturedRestaurantAction(location))
    }

    function closeBirthdayModal() {
        setIsBirthdayModalVisible(false)
    }

    function renderNearByRestaurent(item, index) {
        return (
            <Ripple style={{
                width: SCREEN_WIDTH / 1.5,
                marginRight: 10,
                marginLeft: index == 0 ? 10 : 0,
                borderRadius: 5,
                elevation: 3,
                backgroundColor: colors.white,
                marginTop: 10,
                marginBottom: 20
            }}
                key={index.toString()}
                onPress={() => onPressNearByRestro(item)}
            >
                <View style={{
                    height: 150,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5
                }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            height: 150,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                        }}
                        resizeMode='cover'
                    />
                    <View style={{ backgroundColor: colors.transparentBlack, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}></View>
                    <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
                        <RegularText title={item.name} fontFamily={FONT_FAMILY_ROBOTO_MEDIUM} textStyle={{ color: colors.white, fontSize: 13 }} />
                        <RegularText title={item.cuisine_type} textStyle={{ color: colors.white, fontSize: 10 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, alignItems: 'center' }}>
                    <Image source={IMG_PERCENT} resizeMode='contain' />
                    <RegularText
                        title={item.cashback + '% ' + Strings.cashback.toLowerCase()}
                        textStyle={{ fontSize: 12, color: colors.grey500, marginLeft: 5 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10, }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={IMG_STAR} resizeMode='contain' />
                            <RegularText title={parseFloat(item.rating).toFixed(1)} textStyle={{ fontSize: 12, color: colors.grey700, marginLeft: 5 }} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <RegularText title={item.opening_closing_status} textStyle={{ fontSize: 12, color: colors.grey700, textTransform: 'capitalize' }} />
                    </View>

                </View>
            </Ripple>
        )
    }

    function onPressNearByRestro(item) {
        console.warn("onPRESS::-");

        navigation.navigate(SCREEN_RESTAURANT_DETAIL, { data: item })
    }

    function renderEmptyNearByRestro() {
        return (
            <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: SCREEN_WIDTH }}>
                <RegularText title={Strings.no_nearby_restaurant_available} textStyle={{ alignSelf: 'center' }} />
            </View>
        )
    }

    function onPressSeeAllNearByRestro() {
        navigation.navigate(SCREEN_ALL_NEARBY_RESTRO, { data: nearbyRestaurant.response })
    }

    function renderBestOffers(item, index) {
        return (
            <Ripple style={{
                width: SCREEN_WIDTH / 3,
                height: SCREEN_WIDTH / 3,
                marginLeft: index == 0 ? 10 : 0,
                marginRight: 10,
                borderRadius: 5,
                backgroundColor: colors.white,
                marginTop: 10,
                marginBottom: 10
            }}
                key={index.toString()}
            //onPress={()=>onPressNearByRestro(item)}
            >
                <Image
                    source={item}
                    resizeMode="cover"
                    style={{
                        borderRadius: 5,
                        width: SCREEN_WIDTH / 3,
                        height: SCREEN_WIDTH / 3,
                    }}
                />
            </Ripple>
        )
    }


    function renderFeaturedRestaurants(item, index) {
        return (
            <Ripple style={{
                width: SCREEN_WIDTH / 4,
                height: SCREEN_WIDTH / 4,
                marginLeft: index == 0 ? 10 : 0,
                marginRight: 10,
                borderRadius: 5,
                backgroundColor: colors.white,
                marginTop: 10,
                marginBottom: 10
            }}
                key={index.toString()}
                onPress={() => onPressFeaturedRestro(item)}
            >
                <Image
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    style={{
                        borderRadius: 5,
                        width: SCREEN_WIDTH / 4,
                        height: SCREEN_WIDTH / 4,
                    }}
                />
                <View style={{ backgroundColor: colors.transparentBlack, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 5 }}></View>
                <RegularText
                    title={item.name}
                    textStyle={{
                        position: 'absolute',
                        bottom: 5,
                        left: 5,
                        right: 5,
                        fontSize: 12,
                        color: colors.white,
                        textTransform: 'capitalize'
                    }}
                />
            </Ripple>
        )
    }

    function renderEmptyFeatuedRestro() {
        return (
            <View style={{ height: SCREEN_WIDTH / 4, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: SCREEN_WIDTH }}>
                <RegularText title={Strings.no_featured_restro_available} textStyle={{ alignSelf: 'center' }} />
            </View>
        )
    }

    function onPressFeaturedRestro(item) {
        navigation.navigate(SCREEN_RESTAURANT_DETAIL, { data: item })
    }

    function onPressSeeAllFeaturedRestro() {
        navigation.navigate(SCREEN_ALL_FEATURED_RESTRO, { data: featuredRestaurant.response })
    }

    function onPressCategory(cat, type) {
        navigation.navigate(SCREEN_FILTER_RESTRO, { cat: cat, type: type })
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.grey200 }}
            refreshControl={<RefreshControl refreshing={fetching} onRefresh={onRefreshCompleteHome} />}
        >
            <View style={{
                backgroundColor: colors.white,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                paddingBottom: 10,
            }}>
                <View style={{ height: 200, }}>
                    <View style={{
                        position: 'absolute',
                        zIndex: -1,
                        width: SCREEN_WIDTH + 50,
                        height: 120,
                        backgroundColor: colors.appBlack,
                        borderBottomLeftRadius: 100,
                        borderBottomRightRadius: 100,
                        alignSelf: 'center'
                    }}></View>
                    <Swiper
                        showsButtons={false}
                        height={200}
                        width={SCREEN_WIDTH}
                        containerStyle={styles.swiperContainer}
                        autoplay={true}
                        autoplayTimeout={2.5}
                        showsPagination={true}
                        paginationStyle={{}}
                        loop={true}
                        activeDot={<View style={{ height: 4, width: 12, backgroundColor: 'white', borderRadius: 10, marginHorizontal: 2 }}></View>}
                        dot={<View style={{ height: 4, width: 4, backgroundColor: 'white', borderRadius: 10, marginHorizontal: 2 }}></View>}
                    >
                        {
                            homeBanner != undefined ? homeBanner.response.map((item, index) => {
                                return (
                                    <View key={index.toString()} >
                                        <FastImage
                                            // key={index.toString()}
                                            source={{ uri: item.image }}
                                            style={styles.swiperImage}
                                        />
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.swiperImage}
                                        />
                                    </View>
                                )
                            })
                                :
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 180,
                                    alignSelf: 'center',
                                    backgroundColor: colors.grey100,
                                    width: SCREEN_WIDTH - 20,
                                    borderRadius: 10,
                                    margin: 10
                                }}>
                                    <ActivityIndicator color={colors.white} />
                                </View>
                        }
                    </Swiper>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Ripple style={{ marginHorizontal: 10, width: SCREEN_WIDTH / 7, marginTop: 10 }} onPress={() => onPressCategory('vo', Strings.veg_only)} >
                        <View style={styles.homeCatStyle}></View>
                        <Image source={homeCatData[0].image} resizeMode='cover' style={{ marginTop: 5, alignSelf: 'center', height: 30, width: 30, }} />
                        <RegularText title={homeCatData[0].name} textStyle={{ fontSize: 11, textAlign: 'center', flexWrap: 'wrap', marginTop: 5, color: colors.darkGray }} numberOfLines={3} />
                    </Ripple>

                    <Ripple style={{ marginHorizontal: 10, width: SCREEN_WIDTH / 7, marginTop: 10 }} onPress={() => onPressCategory('nl', Strings.newly_launched)}>
                        <View style={styles.homeCatStyle}></View>
                        <Image source={homeCatData[1].image} resizeMode='cover' style={{ marginTop: 5, alignSelf: 'center', height: 30, width: 30, }} />
                        <RegularText title={homeCatData[1].name} textStyle={{ fontSize: 11, textAlign: 'center', flexWrap: 'wrap', marginTop: 5, color: colors.darkGray }} numberOfLines={3} />
                    </Ripple>

                    <Ripple style={{ marginHorizontal: 10, width: SCREEN_WIDTH / 7, marginTop: 10 }} onPress={() => onPressCategory('tr', Strings.top_rated)}>
                        <View style={styles.homeCatStyle}></View>
                        <Image source={homeCatData[2].image} resizeMode='cover' style={{ marginTop: 5, alignSelf: 'center', height: 30, width: 30, }} />
                        <RegularText title={homeCatData[2].name} textStyle={{ fontSize: 11, textAlign: 'center', flexWrap: 'wrap', marginTop: 5, color: colors.darkGray }} numberOfLines={3} />
                    </Ripple>
                </View>
            </View>

            {/* nearby restaurants */}

            <View style={{
                backgroundColor: colors.white,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                marginVertical: 15,
                // paddingVertical: 15
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginHorizontal: 10 }}>
                    <RegularText
                        title={Strings.restaurent_near_you}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ fontSize: 13 }}
                    />
                    {
                        nearbyRestaurant != undefined &&
                        <Ripple
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => onPressSeeAllNearByRestro()}
                        >
                            <RegularText
                                title={Strings.see_all}
                                textStyle={{ fontSize: 12, marginRight: 5, color: colors.red800 }}
                            />
                            <Image source={IMG_ARROW_RED_FILLED} />
                        </Ripple>
                    }
                </View>
                {
                    nearbyRestaurant != undefined ?
                        <FlatList
                            data={nearbyRestaurant.response}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={renderEmptyNearByRestro()}

                            renderItem={({ item, index }) => renderNearByRestaurent(item, index)}
                        />
                        :
                        <View style={{ flexDirection: 'row' }}>
                            {
                                skeletonCount.map((item, index) => {
                                    return (
                                        <SkeletonPlaceholder
                                            backgroundColor={colors.grey200}
                                            highlightColor={colors.grey300}
                                            key={index.toString()}
                                        >
                                            <View style={{ width: SCREEN_WIDTH / 1.5, marginHorizontal: 10, marginVertical: 10, }}>
                                                <View style={{ height: 150, borderRadius: 10, }}></View>
                                                <View style={{ height: 12, marginVertical: 5, borderRadius: 5, width: SCREEN_WIDTH / 2 }}></View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View style={{ height: 12, borderRadius: 5, width: SCREEN_WIDTH / 3.2 }}></View>
                                                    <View style={{ height: 12, borderRadius: 5, width: SCREEN_WIDTH / 3.2 }}></View>
                                                </View>
                                            </View>
                                        </SkeletonPlaceholder>
                                    )
                                })
                            }
                        </View>
                }

            </View>

            {/* best offers */}
            {/* <View style={{
                backgroundColor: colors.white,
                marginBottom: 15,
                // paddingVertical: 15
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginHorizontal: 10 }}>
                    <RegularText
                        title={Strings.best_offers}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ fontSize: 13 }}
                    />
                    <Ripple style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => navigation.navigate(SCREEN_ALL_BEST_OFFERS)}>
                        <RegularText
                            title={Strings.see_all}
                            textStyle={{ fontSize: 12, marginRight: 5, color: colors.red800 }}
                        />
                        <Image source={IMG_ARROW_RED_FILLED} />
                    </Ripple>
                </View>
                <FlatList
                    data={carouselData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => renderBestOffers(item, index)}
                />

            </View> */}

            {/* featured restro */}
            <View style={{
                backgroundColor: colors.white,
                marginBottom: 15,
                // paddingVertical: 15
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginHorizontal: 10 }}>
                    <RegularText
                        title={Strings.featured_restaurent}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                        textStyle={{ fontSize: 13 }}
                    />
                    {
                        featuredRestaurant != undefined &&
                        <Ripple
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => onPressSeeAllFeaturedRestro()}
                        >
                            <RegularText
                                title={Strings.see_all}
                                textStyle={{ fontSize: 12, marginRight: 5, color: colors.red800 }}
                            />
                            <Image source={IMG_ARROW_RED_FILLED} />
                        </Ripple>
                    }

                </View>
                {
                    featuredRestaurant != undefined ?
                        <FlatList
                            data={featuredRestaurant.response}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => renderFeaturedRestaurants(item, index)}
                            ListEmptyComponent={renderEmptyFeatuedRestro()}
                        />
                        :
                        <View style={{ flexDirection: 'row' }}>
                            {
                                skeletonCount.map((item, index) => {
                                    return (
                                        <SkeletonPlaceholder
                                            backgroundColor={colors.grey200}
                                            highlightColor={colors.grey300}
                                            key={index.toString()}
                                        >
                                            <View style={{ width: SCREEN_WIDTH / 4, height: SCREEN_WIDTH / 4, marginLeft: 10, marginVertical: 10, borderRadius: 5 }}></View>
                                        </SkeletonPlaceholder>
                                    )
                                })
                            }
                        </View>
                }

            </View>
            <BirthdayModal
                visible={isBirthdayModalVisible}
                onClose={closeBirthdayModal}
            />
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

export default ExploreScreen;