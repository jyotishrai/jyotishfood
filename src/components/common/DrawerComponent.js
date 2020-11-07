import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import colors from '../../utility/Colors';
import { IMG_NAV_BG, IMG_USER_DEFAULT, IMG_EDIT, IMG_HOME, IMG_ARROW_RIGHT, IMG_FAVORITE, IMG_NOTIFICATION, IMG_CASHBACK, IMG_ABOUT, IMG_LOGOUT, IMG_NAV_FAQ, IMG_NAV_REPORT } from '../../utility/imageRes';
import RegularText from './RegularText';
import { FONT_FAMILY_ROBOTO_MEDIUM, FONT_FAMILY_ROBOTO_BLACK, FONT_FAMILY_ROBOTO_LIGHT } from '../../utility/Typography';
import Ripple from 'react-native-material-ripple';
import Strings from '../../translation/language';
import { SCREEN_HOME, SCREEN_NOTIFICATION, SCREEN_CASHBACK, SCREEN_LOGIN, KEY_USER_DATA, KEY_FAQ_TABS, SCREEN_REPORT, SCREEN_ABOUT_US, SCREEN_FAVORITE_RESTRO, SCREEN_EDIT_PROFILE } from '../../utility/constants';
import { clearData, getUserData, retrieveItem, USER_DATA } from '../../utility/CustomAsyncStorage';
import { useDispatch } from 'react-redux';
import { clearLoginAction, clearSignupAction, clearLoginWithOtpVerifyAction, clearLoginWithOtpAction } from '../../actions/action'

const DrawerOption = ({ icon, title, onPress }) => {
    return (
        <Ripple style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            padding: 10
        }}
            onPress={() => onPress()}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={icon}
                    resizeMode="contain"
                />
                <RegularText
                    title={title}
                    textStyle={{ marginLeft: 10, color: colors.appBlack, fontSize: 12 }}
                    fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                />
            </View>
            <Image source={IMG_ARROW_RIGHT} resizeMode='contain' />
        </Ripple>
    )
}

const DrawerComponent = ({ navigation }) => {

    const dispatch = useDispatch();

    const [userData, setUserData] = useState(undefined)

    useEffect(() => {
        retrieveItem(KEY_USER_DATA).then((data) => {
            setUserData(data)
        })
    }, [])

    function onPressHome() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_HOME)
    }

    function onPressFavoriteRestro() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_FAVORITE_RESTRO)
    }

    function onPressNotification() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_NOTIFICATION)
    }

    function onPressCashback() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_CASHBACK)
    }

    function onPressAboutUs() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_ABOUT_US)
    }

    function onPressFaq() {
        navigation.closeDrawer()
        navigation.navigate(KEY_FAQ_TABS)
    }

    function onPressReport() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_REPORT)
    }

    function onPressLogout() {
        dispatch(clearLoginAction())
        dispatch(clearLoginWithOtpVerifyAction())
        dispatch(clearLoginWithOtpAction())
        global[KEY_USER_DATA] = undefined
        clearData().then(() => {
            navigation.navigate(SCREEN_LOGIN)
        })
    }

    function onPressEdit() {
        navigation.closeDrawer()
        navigation.navigate(SCREEN_EDIT_PROFILE)
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={{}}>
                <Image source={IMG_NAV_BG} style={{ width: '100%' }} resizeMode="cover" />
                <View style={{
                    position: 'absolute', top: 0, bottom: 0, right: 0, left: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        // source={userData != undefined && userData.image != '' ? { uri: userData.image } : IMG_USER_DEFAULT}
                        source={global[KEY_USER_DATA] != undefined && global[KEY_USER_DATA].image != '' ? { uri: global[KEY_USER_DATA].image } : IMG_USER_DEFAULT}
                        style={{
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                            borderWidth: 2,
                            borderColor: colors.redA200
                        }}
                        resizeMode="cover"
                    />
                    <RegularText
                        title={userData != undefined ? userData.full_name : ''}
                        textStyle={{
                            color: colors.white,
                            fontSize: 14,
                            marginTop: 10
                        }}
                        fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                    />
                    <RegularText
                        title={userData != undefined ? userData.phone_number : ''}
                        textStyle={{
                            color: colors.white,
                            fontSize: 12
                        }}
                        fontFamily={FONT_FAMILY_ROBOTO_LIGHT}
                    />
                    <Ripple
                        style={{ position: 'absolute', top: 10, right: 10 }}
                        onPress={() => onPressEdit()}
                    >
                        <Image source={IMG_EDIT} resizeMode="contain" />
                    </Ripple>
                </View>
            </View>

            <DrawerOption
                icon={IMG_HOME}
                title={Strings.home}
                onPress={onPressHome}
            />
            <DrawerOption
                icon={IMG_FAVORITE}
                title={Strings.favorite_restaurant}
                onPress={onPressFavoriteRestro}
            />
            <DrawerOption
                icon={IMG_NOTIFICATION}
                title={Strings.notification}
                onPress={onPressNotification}
            />
            <DrawerOption
                icon={IMG_CASHBACK}
                title={Strings.cashback}
                onPress={onPressCashback}
            />
            <DrawerOption
                icon={IMG_NAV_FAQ}
                title={Strings.faq}
                onPress={onPressFaq}
            />

            <DrawerOption
                icon={IMG_NAV_REPORT}
                title={Strings.report}
                onPress={onPressReport}
            />
            <DrawerOption
                icon={IMG_ABOUT}
                title={Strings.about_us}
                onPress={onPressAboutUs}
            />

            <View style={{ height: 3, backgroundColor: colors.grey200 }}></View>

            <DrawerOption
                icon={IMG_LOGOUT}
                title={Strings.logout}
                onPress={onPressLogout}
            />

        </ScrollView>
    )
}

export default DrawerComponent