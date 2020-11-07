import { createStackNavigator } from 'react-navigation-stack';
import * as Utils from '../utility';
import DrawerNavigator from './DrawerNavigator'
import { } from '../utility/constants';
import SearchScreen from '../components/screens/RestScreens/SearchScreen'
import RestaurantDetailScreen from '../components/screens/RestScreens/RestaurentDetailScreen';
import NotificationScreen from '../components/screens/RestScreens/NotificationScreen';
import CashbackScreen from '../components/screens/RestScreens/CashbackScreen';
import CashbackHistoryTabs from '../components/screens/RestScreens/CashbackHistoryTabs';
import BalanceTransferFirstScreen from '../components/screens/RestScreens/BalanceTransferFirst';
import BalanceTransferSecondScreen from '../components/screens/RestScreens/BalanceTransferSecond';
import BalanceReceivedScreen from '../components/screens/RestScreens/BalanceReceivedScreen'
import AllBestOffersScreen from '../components/screens/RestScreens/AllBestOfferScreen';
import AllFeaturedRestroScreen from '../components/screens/RestScreens/AllFeaturedRestroScreen';
import AllNearByRestroScreen from '../components/screens/RestScreens/AllNearByRestroScreen';
import FaqTabs from '../components/screens/RestScreens/FAQTabs';
import ReportScreen from '../components/screens/RestScreens/ReportScreen';
import AboutUsScreen from '../components/screens/RestScreens/AboutUsScreen';
import FavoriteRestaurantScreen from '../components/screens/RestScreens/FavoriteRestaurantScreen';
import FilterRestaurantScreen from '../components/screens/RestScreens/FilterRestaurantScreen';
import EditProfileScreen from '../components/screens/RestScreens/EditProfileScreen';
import ExpiredCashbackScreen from '../components/screens/RestScreens/ExpiredCashbackScreen';
import AvailableCashbackScreen from '../components/screens/RestScreens/AvailableCashbackScreen';

const RouteConfig = {
  [Utils.Constants.KEY_DRAWER]: DrawerNavigator,
  [Utils.Constants.SCREEN_SEARCH]: SearchScreen,
  [Utils.Constants.SCREEN_RESTAURANT_DETAIL]: RestaurantDetailScreen,
  [Utils.Constants.SCREEN_NOTIFICATION]: NotificationScreen,
  [Utils.Constants.SCREEN_CASHBACK]: CashbackScreen,
  [Utils.Constants.KEY_CASHBACK_HISTORY]: CashbackHistoryTabs,
  [Utils.Constants.SCREEN_BALANCE_TRANSFER_FIRST]: BalanceTransferFirstScreen,
  [Utils.Constants.SCREEN_BALANCE_TRANSFER_SECOND]: BalanceTransferSecondScreen,
  [Utils.Constants.SCREEN_BALANCE_RECEIVED]: BalanceReceivedScreen,
  [Utils.Constants.SCREEN_ALL_BEST_OFFERS]: AllBestOffersScreen,
  [Utils.Constants.SCREEN_ALL_FEATURED_RESTRO]: AllFeaturedRestroScreen,
  [Utils.Constants.SCREEN_ALL_NEARBY_RESTRO]: AllNearByRestroScreen,
  [Utils.Constants.KEY_FAQ_TABS]: FaqTabs,
  [Utils.Constants.SCREEN_REPORT]: ReportScreen,
  [Utils.Constants.SCREEN_ABOUT_US]: AboutUsScreen,
  [Utils.Constants.SCREEN_FAVORITE_RESTRO]: FavoriteRestaurantScreen,
  [Utils.Constants.SCREEN_FILTER_RESTRO]: FilterRestaurantScreen,
  [Utils.Constants.SCREEN_EDIT_PROFILE]: EditProfileScreen,
  [Utils.Constants.SCREEN_EXPIRED_CASHBACK]: ExpiredCashbackScreen,
  [Utils.Constants.SCREEN_AVAILABLE_CASHBACK]: AvailableCashbackScreen,
};

const APPNavigatorConfig = {
  initialRouteName: Utils.Constants.KEY_DRAWER,
  header: null,
  headerMode: 'none'
};

const APPNavigator = createStackNavigator(RouteConfig, APPNavigatorConfig)

export default APPNavigator;
