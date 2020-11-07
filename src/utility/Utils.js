import { Dimensions, PermissionsAndroid } from 'react-native'
import flashMessage from '../components/common/CustomFlashAlert';
import Strings from '../translation/language';
import moment from 'moment';
import { PARAMS } from './constants';
import colors from './Colors';
import firebase from 'react-native-firebase';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation'

const { width } = Dimensions.get('window')

export const getMinFromSec = (time) => {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
export let minToHm = (m) => {
    let h = Math.floor(m / 60);
    h += (h < 0) ? 1 : 0;
    let m2 = Math.abs(m % 60);
    m2 = (m2 < 10) ? '0' + m2 : m2;
    return (h < 0 ? '' : '0') + h + ':' + m2;
}
export const emailValidator = (email) => {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    else {
        return false
    }

}

export const passwordValidator = (password) => {
    if (password.length < 2) {
        flashMessage(Strings.too_short, "danger")
    }
    else {
        return (true)
    }
}

export const isTextInputNotEmptyValidator = (text) => {
    if (text == '') {
        return true
    }
    else {
        return false
    }
}

export const mobileNumberValidator = (text) => {
    if (text.length < 10) {
        return false
    }
    else {
        return true
    }
}

export const convertDateTime = (date1, formt) => {
    let date = new Date(parseInt(date1))
    return moment(date1).format(formt)
}
export const getTimeFromTimeStamp = (dateTime, forShowFormat) => {
    var showDateValue = '';
    if (dateTime !== null || dateTime !== undefined) {
        showDateValue = moment.unix(dateTime).format(forShowFormat)
        // showDateValue =  moment(dateTime, forShowFormat).fromNow();
    }
    return showDateValue;


}
export function getAddressModelParse(data, callback) {
    let objAddress = {};
    try {
        if (data != null && data != undefined & data.length > 0) {
            let childobj = data[0];
            if (childobj.address_components != null &&
                childobj.address_components != undefined &&
                childobj.address_components.length > 0) {
                let array = childobj.address_components;

                objAddress.address = childobj.formatted_address;
                for (const key in array) {
                    if (array.hasOwnProperty(key)) {
                        const element = array[key];
                        //if(formatted_address)
                        if (element.types[0] == "premise" || element.types[0] == "subpremise") {
                            objAddress.houseno = element.long_name;
                            //break;
                        }
                        if (element.types[2] == "sublocality_level_2" || element.types[0] == "neighborhood") {
                            objAddress.locality = element.long_name;
                            //break;
                        }
                        if (element.types[0] == "route" || element.types[0] == "street_number" || element.types[0] == "street_address") {
                            objAddress.road = element.long_name;
                            //break;
                        }
                        if (element.types[2] == "sublocality_level_1" || element.types[2] == "sublocality_level_3") {
                            objAddress.area = element.long_name;
                            //break;
                        }
                        if (element.types[0] == "administrative_area_level_2") {
                            objAddress.city = element.long_name;
                            //break;
                        }
                        if (element.types[0] == "administrative_area_level_1") {
                            objAddress.state = element.long_name;
                            //break;
                        }
                        if (element.types[0] == "postal_code") {
                            objAddress.pincode = element.long_name;
                            //break;
                        }
                        if (element.types[0] == "country") {
                            objAddress.country = element.long_name;
                            //break;
                        }
                    }
                }

            }
        }
        callback(objAddress)

    } catch (error) {
        callback(error)
    }

}


export function timeSince(date) {

    // let time = new Date(date).getMilliseconds()

    var seconds = Math.floor((new Date() - date * 1000) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

export function getIsCheck(check, index) {
    let temp = check;

    if (temp == undefined && index != 0) {
        temp = true
    }
    else if (temp == undefined && index == 0) {
        temp = true
    }
    else {
        temp = !temp;
    }
    //console.warn("check--", check, "----index--", index, "-----temp----", temp);
    return temp;
}

export const displayAndroidNotification = (notificatDataObj) => {

    // var notificatDataObj = message;
    try {
        console.log('messageData: ', notificatDataObj)
        const channel = new firebase.notifications.Android.Channel('my_default_channel', 'my_default_channel', firebase.notifications.Android.Importance.Max)
            .setDescription('my_default_channel');
        firebase.notifications().android.createChannel(channel);

        // Create the channel

        var notification = new firebase.notifications.Notification();
        notification.android.setColor(colors.darkSkyBlue);
        var notificationId = (new Date).getTime().toString();
        notification.setNotificationId(notificationId);
        notification.android.setChannelId('my_default_channel');
        notification.setTitle(notificatDataObj.data.title);
        notification.setBody(notificatDataObj.data.body);
        console.log('EMITTER_NOTIFICATION displayAndroidNotification data :::', notificatDataObj.data);

        if (notificatDataObj.data.bigPicture != undefined &&
            notificatDataObj.data.bigPicture != null &&
            notificatDataObj.data.bigPicture != '') {

            notification.android.setBigPicture(notificatDataObj.data.bigPicture)
        }
        else {
            notification.android.setBigText(notificatDataObj.data.body);
        }
        // else if (notificatDataObj.data.bigText != undefined &&
        //   notificatDataObj.data.bigText != null &&
        //   notificatDataObj.data.bigText != '') {
        //   notification.android.setBigText(notificatDataObj.data.bigText)
        // }
        if (notificatDataObj.data[PARAMS.KEY_NOTIFICATION_DATA] != undefined)
            notification.setData(JSON.parse(notificatDataObj.
                data[PARAMS.KEY_NOTIFICATION_DATA]));
        firebase.notifications()
            .displayNotification(notification);

    } catch (error) {
        console.error();

        console.log('error :::', error[PARAMS.KEY_MESSAGE]);
    }
}

export const displayIosNotification = (notification) => {
    console.log('messageData: ', notification);
    const localNotification = new firebase.notifications.Notification();
    localNotification.setNotificationId((new Date).getTime().toString());
    localNotification.setTitle(notification.title);
    localNotification.setBody(notification.body);
    if (notification.data.bigPicture != undefined &&
        notification.data.bigPicture != null &&
        notification.data.bigPicture != '') {
        notification.ios.setLaunchImage(notification.data.bigPicture)
    }
    localNotification.setData(notification.data);
    if (notification[PARAMS.KEY_DATA][PARAMS.KEY_NOTIFICATION_DATA_IOS]
        != undefined) {
        console.log('messageData [Constants.KEY_NOTIFICATION_DATA]: ',
            notification[PARAMS.KEY_DATA][PARAMS.KEY_NOTIFICATION_DATA_IOS])
        localNotification.setData(JSON.parse(notification[PARAMS.KEY_DATA]
        [PARAMS.KEY_NOTIFICATION_DATA_IOS]));
    }

    firebase.notifications()
        .displayNotification(localNotification);
}

export const getFormDataFromObject = (data) => {
    const formData = new FormData();
    for (var key in data) {
        if (typeof data[key] === 'object') {
            var dataValue = data[key];
            if (key == 'image') {
                for (var itemIndex in data[key]) {
                    var keyName = '[' + itemIndex + ']';
                    formData.append(keyName, data[key][itemIndex]);
                }
            }
            else {
                if (dataValue !== null && dataValue.uri !== undefined && dataValue.uri !== null) {
                }
                else {
                    if (dataValue != null) {
                        dataValue = ((JSON.stringify(dataValue)));
                        dataValue = dataValue.replace(/\\/g, '');
                    }
                }
                if (dataValue != undefined && dataValue != null) {
                    formData.append(key, dataValue);
                }
            }
        }
        else {
            if (data[key] != undefined && data[key] != null) {
                formData.append(key, data[key]);
            }
        }
    }
    return formData;
}

export async function requestLocPermission(callback) {


    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 10000 })
        .then(async (data) => {
            // The user has accepted to enable the location services
            // data can be :
            //  - "already-enabled" if the location services has been already enabled
            //  - "enabled" if user has clicked on OK button in the popup

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //console.warn('permission granted watch position');
                if (data === 'already-enabled' || data === 'enabled') {
                    Geolocation.getCurrentPosition(
                        position => {
                            //alert(JSON.stringify(position))

                            callback(position)
                        },
                        error => alert('location:' + error.message),
                        { eenableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
                    );
                }

            } else {
                alert("Permission Denied");
            }
        }).catch(err => {
            alert(err)
            // The user has not accepted to enable the location services or something went wrong during the process
            // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
            // codes : 
            //  - ERR00 : The user has clicked on Cancel button in the popup
            //  - ERR01 : If the Settings change are unavailable
            //  - ERR02 : If the popup has failed to open
        });
}