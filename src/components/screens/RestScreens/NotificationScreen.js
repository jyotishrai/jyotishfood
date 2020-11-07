import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import CommonHeader from '../../common/CommonHeader'
import Strings from '../../../translation/language';
import { DIMENS, SCREEN_RESTAURANT_DETAIL } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import { IMG_SEARCH } from '../../../utility/imageRes';
import RegularText from '../../common/RegularText';
import { FONT_FAMILY_ROBOTO_MEDIUM } from '../../../utility/Typography';
import SearchScreenRow from '../../rows/searchScreenResultRow';
import NotificationsRow from '../../rows/notificationsRow';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNotificationAction } from '../../../actions/action';
import CustomLoader from '../../common/CustomLoader'

const notificationData = [
    {
        name: "Marble Arch",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg",
        date: "27-4-2020/10:03",
        offer: "Marble Arch Restaurant Offers May 2020 : Upto 30% cashback after opening lockdown."
    },
    {
        name: "Apsara Hotel",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg",
        date: "27-4-2020/10:03",
        offer: "Marble Arch Restaurant Offers May 2020 : Upto 30% cashback after opening lockdown."
    },
    {
        name: "Oreo Cafe and Restro",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg",
        date: "27-4-2020/10:03",
        offer: "Marble Arch Restaurant Offers May 2020 : Upto 30% cashback after opening lockdown."
    }
]

const NotificationScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const { notiRes, fetching, error } = useSelector(state => ({
        notiRes: state.getNotificationReducer.notiRes,
        fetching: state.getNotificationReducer.fetching,
        error: state.getNotificationReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getNotification()
    }, [])

    function getNotification() {
        dispatch(getNotificationAction({ page: 1 }))
    }

    // alert(JSON.stringify(notiRes))

    function renderEmptyList() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <RegularText
                    title={'No Data Available!'}
                />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: colors.appBlack, flex: 1 }}>
            <CommonHeader title={Strings.notification} />
            <View style={styles.mainViewStyle}>
                {
                    notiRes != undefined &&
                    <FlatList
                        data={notiRes.response}
                        ListEmptyComponent={renderEmptyList()}
                        renderItem={({ item, index }) => {
                            return (
                                <NotificationsRow
                                    item={item}
                                    index={index}
                                />
                            )
                        }}
                    />
                }
                {
                    fetching &&
                    <CustomLoader />
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

export default NotificationScreen;