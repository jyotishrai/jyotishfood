import React, { useState, useEffect } from 'react';
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


const AllFeaturedRestroScreen = ({ navigation }) => {

    const [featuredData, setFeaturedData] = useState(undefined)

    useEffect(() => {
        let featured = navigation.state.params.data
        setFeaturedData(featured)
    }, [])

    function onPressRestaurant(item, index) {
        navigation.navigate(SCREEN_RESTAURANT_DETAIL, { data: item })
    }

    return (
        <View style={{ backgroundColor: colors.appBlack, flex: 1 }}>
            <CommonHeader title={Strings.featured_restaurent} />
            <View style={styles.mainViewStyle}>
                {
                    featuredData != undefined &&
                    <FlatList
                        data={featuredData}
                        renderItem={({ item, index }) => {
                            return (
                                <SearchScreenRow
                                    item={item}
                                    index={index}
                                    onPressItem={onPressRestaurant}
                                />
                            )
                        }}
                    />
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

export default AllFeaturedRestroScreen;