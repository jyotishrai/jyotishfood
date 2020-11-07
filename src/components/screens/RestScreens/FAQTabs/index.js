import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import colors from '../../../../utility/Colors';
import { BookContext } from '../../../../Contexts';
import { } from '../../../../utility/imageRes';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Strings from '../../../../translation/language'
import { FONT_FAMILY_ROBOTO_REGULAR, FONT_FAMILY_ROBOTO_BLACK, FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_LIGHT } from '../../../../utility/Typography';
import HomeHeader from '../../../common/HomeHeader'

import EarnCashback from './EarnCashback';
import RedeemCashback from './RedeemCashback'
import CommonHeader from '../../../common/CommonHeader';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height)

const FaqTabs = ({ navigation }) => {

    let RouteConfigs = {
        [Strings.redeem]: RedeemCashback,
        [Strings.earn]: EarnCashback,
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
            style: { backgroundColor: colors.appBlack, elevation: 0, marginHorizontal: SCREEN_WIDTH / 9 },
            labelStyle: { fontSize: 12, margin: 0, fontFamily: FONT_FAMILY_ROBOTO_REGULAR, },
        }
    }
    const TopTabNavigator = createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
    const TopTabContainer = createAppContainer(TopTabNavigator)

    return (
        <BookContext.Provider value={{ navigation }}>
            <View style={{ flex: 1, backgroundColor: colors.appBlack }}>
                <CommonHeader title={Strings.faq} />
                <TopTabContainer></TopTabContainer>
            </View>
        </BookContext.Provider>
    )
}

export default FaqTabs;