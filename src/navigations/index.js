import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Splash from '../components/screens/Splash';

import * as Utils from '../utility';
import APPNavigator from './appNavigator';
import AuthNavigator from './authNavigator';


const RootNavigator = createSwitchNavigator({
    [Utils.Constants.KEY_SPLASH]: Splash,
    [Utils.Constants.KEY_AUTH]: AuthNavigator,
    [Utils.Constants.KEY_APP]: APPNavigator
}, {
    initialRouteName: Utils.Constants.KEY_SPLASH
});


export default createAppContainer(RootNavigator);