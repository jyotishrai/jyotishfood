import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import * as Utils from '../utility'
import DrawerComponent from '../components/common/DrawerComponent'
import HomeScreen from '../components/screens/DrawerScreens/Home'

const MyDrawerNavigator = createDrawerNavigator({
  [Utils.Constants.SCREEN_HOME]: {
    screen: HomeScreen,
  },
}, {
  initialRouteName: Utils.Constants.SCREEN_HOME,
  contentComponent: DrawerComponent,
  drawerType: 'front',
});

const MyApp = createAppContainer(MyDrawerNavigator);

export default MyApp;