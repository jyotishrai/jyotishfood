import React, { useEffect, useState } from 'react';
import {
  StatusBar, DeviceEventEmitter, AppState
} from 'react-native';

import 'react-native-gesture-handler';
import Navigator from './src/navigations';
import configureStore from './src/ConfigStore';
import { Provider, useDispatch, shallowEqual, useSelector } from 'react-redux';
import FlashMessage from "react-native-flash-message";
import colors from './src/utility/Colors';
import { SafeAreaView } from 'react-navigation';
import NavigationService from './src/NavigationService'
import { displayAndroidNotification, displayIosNotification } from './src/utility/Utils';
import { PARAMS } from './src/utility/constants';
import firebase from 'react-native-firebase';
import RatingModal from './src/components/modals/ratingModal'
import { rateHotelAction, clearRateHotelAction } from './src/actions/action';
import * as Utils from './src/utility';

const store = configureStore();

const App = () => {

  let sessionOutListner = undefined

  let appState = AppState.currentState;

  const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false)
  const [restroId, setRestroId] = useState(undefined)
  const [message, setMessage] = useState('')

  async function callNoti() {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        console.log("fire base error :", error);

        alert(error);
      }
      try {
        getNotifications();
      } catch (error) {
        console.warn("callNoti:::11:", error);

      }
    } else {

      try {
        getNotifications();
      } catch (error) {
        console.warn("getNotifications::::", error);

      }
    }

    if (Platform.OS == PARAMS.OS_TYPE_ANDROID) {
      firebase.notifications().getInitialNotification()
        .then((notificationOpen) => {
          if (notificationOpen) {
            const action = notificationOpen.action;
            const notification = notificationOpen.notification;
            notificationCalled(notification);
          }
        });
    }
    else {
      let launchData = 'launchData'//this.props
      if (launchData != undefined) {
        let notiFicationFromIosLaunch = launchData["noti"]
        if (notiFicationFromIosLaunch != undefined) {
          global[PARAMS.EMITTER_NOTIFICATION] = notiFicationFromIosLaunch;
        }
      }
    }
  }

  async function getNotifications() {

    console.log('here:: in getnotification');

    const channel = await new firebase.notifications.Android.Channel(
      'my_default_channel', 'my_default_channel', firebase.notifications.Android.Importance.Max)
      .setDescription('my_default_channel');
    firebase.notifications().android.createChannel(channel);

    const notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log('EMITTER_NOTIFICATION data displayed::: ', notification.data)
    });

    const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      var notification = notificationOpen.notification;
      notificationCalled(notification);
    });

    if (Platform.OS === PARAMS.OS_TYPE_ANDROID) {

      try {
        // const messageListener = firebase.messaging().onMessage((notification) => {
        //   console.log('notification.data value onMessage EMITTER_NOTIFICATION: ', JSON.stringify(notification));
        //   // displayAndroidNotification(notification)
        // });

        const messageListener = firebase.notifications().onNotification(notification => {
          // console.log('notification.data value onMessage EMITTER_NOTIFICATION: ', notification);
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', notification.data)
          // setIsRedeemModalVisible(true)
          global[PARAMS.EMITTER_NOTIFICATION] = notification
          let d = notification.data;
          let type = JSON.parse(d.notification_data).type;
          if (type == "redeem_user" || type == "earn_user") {
            setRestroId(JSON.parse(d.notification_data).restro_id)
            setMessage(JSON.parse(d.notification_data).message)
            setIsRedeemModalVisible(true)
          }
          displayAndroidNotification(notification)
        });

      } catch (error) {
        console.log(error)
        // alert(error)
      }
    }
    else if (Platform.OS === PARAMS.OS_TYPE_IOS) {
      const notificationListener = firebase.notifications().onNotification((notification) => {
        // alert(notification)
        console.log('notificationData value onNotification EMITTER_NOTIFICATION: ', notification);
        global[PARAMS.EMITTER_NOTIFICATION] = notification
        let d = notification.data;
        let type = JSON.parse(d.notification_data).type;
        if (type == "redeem_user" || type == "earn_user") {
          setRestroId(JSON.parse(d.notification_data).restro_id)
          setMessage(JSON.parse(d.notification_data).message)
          setIsRedeemModalVisible(true)
        }
        displayIosNotification(notification);
      });
    }

  }

  async function notificationCalled(notif) {
    console.log('noticlick>>>>>>>>', notif.data);
    console.warn('iiiiiiiiiiiiii', isRedeemModalVisible);

    global[PARAMS.EMITTER_NOTIFICATION] = notif;


    if (appState == 'background' || appState == 'inactive') {
      let d = global[PARAMS.EMITTER_NOTIFICATION].data;
      let type = JSON.parse(d.notification_data).type;
      console.warn('type>>>>>>>', type)
      if (type == "redeem_user" || type == "earn_user") {
        setRestroId(JSON.parse(d.notification_data).restro_id)
        setMessage(JSON.parse(d.notification_data).message)
        setIsRedeemModalVisible(true)
        console.warn('gggggggggg', isRedeemModalVisible);
      }
    }

    // firebase.notifications().removeDeliveredNotification(notif.notificationId);
  }

  function _handleAppStateChange(nextAppState) {
    appState = nextAppState;
  };

  useEffect(() => {
    sessionOutListner && sessionOutListner.remove()
    sessionOutListner = DeviceEventEmitter.addListener(Utils.Constants.KEY_SESSION_OUT, sessionOut)

    AppState.addEventListener('change', _handleAppStateChange);
    callNoti();
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    }
  }, [])




  function sessionOut() {
    global[Utils.Constants.KEY_GLOBAL_UN_AUTHORIZED] = false
    DeviceEventEmitter.emit(Utils.Constants.KEY_SESSION_LOG_OUT)
  }

  function onCloseRedeemModal() {
    setRestroId(undefined)
    setIsRedeemModalVisible(false)
    global[PARAMS.EMITTER_NOTIFICATION] != undefined
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, }} forceInset={{ bottom: 'always' }}>
        <StatusBar backgroundColor={colors.appBlack} barStyle="light-content" />
        <Provider store={store}>
          <Navigator
            ref={navigationRef => {
              NavigationService.setTopLevelNavigator(navigationRef, (this))
            }}>
          </Navigator>
          <FlashMessage position="top" />
          <RatingModal
            visible={isRedeemModalVisible}
            onClose={onCloseRedeemModal}
            restroId={restroId}
            message={message}
          />
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;
