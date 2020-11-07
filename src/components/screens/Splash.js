import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Text,
    Image
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { IMG_SPLASH, IMG_LOGO } from '../../utility/imageRes';
import RegularText from '../common/RegularText'
import { SCREEN_LOGIN, KEY_USER_DATA, KEY_USER_TOKEN, KEY_DEVICE_TOKEN, KEY_DEVICE_ID, SCREEN_HOME, KEY_USER_CITY, KEY_USER_STATE, KEY_USER_LAT, KEY_USER_LONG, KEY_CB_HISTORY_TAB } from '../../utility/constants';
import { retrieveItem } from '../../utility/CustomAsyncStorage';
import Strings from '../../translation/language';

const Splash = ({ navigation }) => {

    useEffect(() => {

        retrieveItem(KEY_USER_DATA).then((data) => {
            setTimeout(() => {
                if (data != undefined && data != null) {

                    //1
                    global[KEY_USER_DATA] = data;

                    //2
                    retrieveItem(KEY_USER_TOKEN).then((userToken) => {
                        //alert(JSON.stringify(deviceId))
                        global[KEY_USER_TOKEN] = userToken
                        console.log('userToken>>>>>', userToken);
                    })

                    //3
                    retrieveItem(KEY_DEVICE_ID).then((deviceId) => {
                        //alert(JSON.stringify(deviceId))
                        global[KEY_DEVICE_ID] = deviceId
                        console.log('deviceId>>>>>', deviceId);
                    })

                    //4
                    retrieveItem(KEY_DEVICE_TOKEN).then((deviceToken) => {
                        //alert(JSON.stringify(deviceId))
                        global[KEY_DEVICE_TOKEN] = deviceToken
                        console.log('deviceToken>>>>>', deviceToken);
                    })

                    global[KEY_CB_HISTORY_TAB] = Strings.earn_cashback;

                    navigation.navigate(SCREEN_HOME);
                }
                else {
                    navigation.navigate(SCREEN_LOGIN);
                }
            }, 2500);
        })
            .catch((error) => {
                FlashMessage(error, 'warning')
            })
    })


    return (
        <ImageBackground
            source={IMG_SPLASH}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            resizeMode='cover'
        >
            <StatusBar hidden={true} />
            <Image
                source={IMG_LOGO}
            />
        </ImageBackground>
    );
}
const styles = StyleSheet.create({

});

export default Splash;