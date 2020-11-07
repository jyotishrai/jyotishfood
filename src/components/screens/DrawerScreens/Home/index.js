import React, { useState, useEffect } from 'react';
import { } from 'react-native';
import colors from '../../../../utility/Colors';
import { BookContext } from '../../../../Contexts';
import { } from '../../../../utility/imageRes';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Strings from '../../../../translation/language'
import { FONT_FAMILY_ROBOTO_REGULAR, FONT_FAMILY_ROBOTO_BLACK, FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_LIGHT } from '../../../../utility/Typography';
import HomeHeader from '../../../common/HomeHeader'
import { KEY_USER_CITY, KEY_USER_STATE, KEY_USER_LAT, KEY_USER_LONG } from '../../../../utility/constants';
import Geolocation from '@react-native-community/geolocation';
import { getAddressModelParse, requestLocPermission } from '../../../../utility/Utils'

import Explore from './HomeTabs/Explore'
import SuperSaver from './HomeTabs/SuperSaver'
import HotplateDay from './HomeTabs/HotplateDay'
import NearYou from './HomeTabs/NearYou'

const HomePage = ({ navigation }) => {

    const [userState, setUserState] = useState(undefined)
    const [userCity, setUserCity] = useState(undefined)

    let RouteConfigs = {
        [Strings.explore]: Explore,
        [Strings.superSaver]: SuperSaver,
        [Strings.hotplateDay]: HotplateDay,
        [Strings.nearYou]: NearYou
    }

    const TabNavigatorConfig = {

        initialRouteName: Strings.all,
        backBehavior: 'none',
        scrollEnabled: true,
        lazy: true,
        tabBarOptions: {
            upperCaseLabel: false,
            activeTintColor: colors.white,
            inactiveTintColor: colors.grey500,
            indicatorStyle: {
                backgroundColor: colors.yellow500,
                height: 3,
                marginBottom: 0,
                borderRadius: 10,
            },
            pressColor: colors.transparent,
            swipeEnabled: true,
            animationEnabled: true,
            style: { backgroundColor: colors.appBlack, elevation: 0, },
            labelStyle: { fontSize: 12, margin: 0, fontFamily: FONT_FAMILY_ROBOTO_REGULAR, },
        }
    }
    const TopTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
    const TopTabContainer = createAppContainer(TopTabNavigator)

    useEffect(() => {
        getCurrentLocation()
    }, [])

    function getCurrentLocation() {
        requestLocPermission(position => {
            console.log("response::-location", position);
            if (position && position.coords) {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                getAddressFromRegion(lat, lng)
            }

        })
        // Geolocation.getCurrentPosition(
        //     position => {
        //         // alert(JSON.stringify(position))
        //         let lat = position.coords.latitude;
        //         let lng = position.coords.longitude;
        //         getAddressFromRegion(lat, lng)
        //     },
        //     error => console.log(error.message),
        //     { enableHighAccuracy: true, }
        // );
    }

    async function getAddressFromRegion(lat, lng) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            lat + ',' + lng + '&key=' + 'AIzaSyASFwiTkWBtPIMqo21IAyxXV4566c_87mw')
            .then((response) => response.json())
            .then((responseJson) => {
                //  console.log("googleApiResponse", responseJson)
                getAddressModelParse(responseJson.results, (add) => {
                    setUserState(add.state)
                    setUserCity(add.city)
                    global[KEY_USER_LAT] = lat;
                    global[KEY_USER_LONG] = lng
                })
            })
    }

    return (
        <BookContext.Provider value={{ navigation }}>
            <HomeHeader
                location={userCity != undefined && userState != undefined ? userCity + ', ' + userState : '--'}
                navigation={navigation}
            />
            <TopTabContainer ></TopTabContainer>
        </BookContext.Provider>
    )
}

export default HomePage;