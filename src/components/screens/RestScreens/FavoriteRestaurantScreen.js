import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import CommonHeader from '../../common/CommonHeader'
import Strings from '../../../translation/language';
import { SCREEN_RESTAURANT_DETAIL, KEY_USER_LAT, KEY_USER_LONG } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import FavoriteRestaurantRow from '../../rows/FavoriteRestaurantRow';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getFavoriteRestaurantAction } from '../../../actions/action';
import RegularText from '../../common/RegularText';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)

const d = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const FavoriteRestaurantScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const { favoriteRestaurant, fetching, error } = useSelector(state => ({
        favoriteRestaurant: state.getFavoriteRestaurantReducer.favoriteRestaurant,
        fetching: state.getFavoriteRestaurantReducer.fetching,
        error: state.getFavoriteRestaurantReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getFavoriteRestro()
    }, [])

    function getFavoriteRestro() {
        let location = {
            lat: global[KEY_USER_LAT],
            lng: global[KEY_USER_LONG]
        }
        dispatch(getFavoriteRestaurantAction(location))
    }

    // alert(JSON.stringify(favoriteRestaurant))

    function onPressRestaurant(item, index) {
        navigation.navigate(SCREEN_RESTAURANT_DETAIL, { data: item })
    }

    function renderEmptyList() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <RegularText
                    title={favoriteRestaurant.message}
                    textStyle={{
                        color: colors.grey400
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: colors.appBlack, flex: 1 }}>
            <CommonHeader title={Strings.favorite_restaurant} />
            <View style={styles.mainViewStyle}>
                {
                    favoriteRestaurant != undefined &&
                    <FlatList
                        data={favoriteRestaurant.response}
                        ListEmptyComponent={renderEmptyList()}
                        renderItem={({ item, index }) => {
                            return (
                                <FavoriteRestaurantRow
                                    item={item}
                                    index={index}
                                    fetching
                                    onPressItem={onPressRestaurant}
                                />
                            )
                        }}
                    />
                }
                {
                    fetching && d.map((item, index) => {
                        return (
                            <SkeletonPlaceholder key={index.toString()}>
                                <View style={{ flexDirection: 'row', padding: 20 }}>
                                    <View style={{ height: SCREEN_WIDTH / 5, width: SCREEN_WIDTH / 5, borderRadius: 10 }} ></View>
                                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                        <View style={{ height: 15, width: SCREEN_WIDTH / 3, borderRadius: 5 }}></View>
                                        <View style={{ height: 10, width: SCREEN_WIDTH / 1.5, marginTop: 7, borderRadius: 5 }}></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                                            <View style={{ height: 10, width: SCREEN_WIDTH / 4, borderRadius: 5 }}></View>
                                            <View style={{ height: 10, width: SCREEN_WIDTH / 3, borderRadius: 5 }}></View>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <View style={{ height: 12, width: SCREEN_WIDTH / 6, borderRadius: 5 }}></View>
                                            <View style={{ height: 12, width: SCREEN_WIDTH / 6, borderRadius: 5, marginLeft: 15 }}></View>
                                        </View>
                                    </View>
                                </View>
                            </SkeletonPlaceholder>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainViewStyle: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    }
});

export default FavoriteRestaurantScreen;