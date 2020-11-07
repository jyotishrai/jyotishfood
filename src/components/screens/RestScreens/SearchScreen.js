import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import CommonHeader from '../../common/CommonHeader'
import Strings from '../../../translation/language';
import { DIMENS, SCREEN_RESTAURANT_DETAIL, KEY_USER_LAT, KEY_USER_LONG } from '../../../utility/constants';
import colors from '../../../utility/Colors';
import { IMG_SEARCH, IMG_AVAILABLE_CASHBACK, IMG_CAT_POCKET_FRIENDLY } from '../../../utility/imageRes';
import RegularText from '../../common/RegularText';
import { FONT_FAMILY_ROBOTO_MEDIUM } from '../../../utility/Typography';
import SearchScreenRow from '../../rows/searchScreenResultRow';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { searchRestaurantAction, clearSearchRestaurantAction } from '../../../actions/action';

const searchResult = [
    {
        name: "Marble Arch",
        address: "Jal Mahal, Jacob Rd, Civil Lines, Jaipur, Rajasthan",
        price_for_two: "300",
        type: "North Indian, South Indian, Chineses",
        rating: "4.5",
        discount: "33%",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg"
    },
    {
        name: "Apsara Hotel",
        address: "Gol Pyayu Circle, Bhilwara, Rajasthan",
        price_for_two: "500",
        type: "North Indian, South Indian",
        rating: "4.5",
        discount: "20%",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg"
    },
    {
        name: "Oreo Cafe and Restro",
        address: "Triveni Nagar,Jaipur, Rajasthan",
        price_for_two: "300",
        type: "North Indian, South Indian, Italian",
        rating: "4.5",
        discount: "33%",
        image: "https://m.economictimes.com/thumb/msid-74723587,width-1200,height-900,resizemode-4,imgsize-245027/talli-turmeric-fb.jpg"
    }
]

const SearchScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('')

    const { searchRestaurantData, fetching, error } = useSelector(state => ({
        searchRestaurantData: state.searchRestaurantReducer.searchRestaurantData,
        fetching: state.searchRestaurantReducer.fetching,
        error: state.searchRestaurantReducer.error,
    }), shallowEqual);

    useEffect(() => {

        return () => {
            dispatch(clearSearchRestaurantAction())
        }
    }, [])
    useEffect(() => {
     if(searchText==""){
        dispatch(clearSearchRestaurantAction())
     }
    }, [searchRestaurantData])

    function onChangeSearchText(value) {
        setSearchText(value)

        if (value == '') {
            dispatch(clearSearchRestaurantAction())
        } else {
            let searchData = {
                search: value,
                lat: global[KEY_USER_LAT],
                lng: global[KEY_USER_LONG]
            }
            dispatch(searchRestaurantAction(searchData))
        }
    }

    function onPressRestaurant(item, index) {
        navigation.navigate(SCREEN_RESTAURANT_DETAIL, { data: item })
    }

    return (
        <View style={{ backgroundColor: colors.appBlack, flex: 1 }}>
            <CommonHeader title={Strings.search} />
            <View>
                <View style={styles.textInputView}>
                    <Image source={IMG_SEARCH} style={{ tintColor: colors.mediumGray }} />
                    <TextInput
                        placeholder={Strings.search_by_restaurants_cusine_etc}
                        placeholderTextColor={colors.mediumGray}
                        style={styles.searchBarStyle}
                        onChangeText={value => onChangeSearchText(value)}
                    />
                </View>
            </View>
            <View style={styles.mainViewStyle}>
                {
                    searchRestaurantData != undefined ?
                        <View>
                            <View style={{
                                backgroundColor: colors.grey100, borderTopLeftRadius: 20, borderTopRightRadius: 20,
                            }}>
                                <RegularText
                                    title={searchRestaurantData != undefined && Strings.showing_results_for + ' ' + "'" + searchText + "'"}
                                    textStyle={{ fontSize: 12, alignSelf: 'center', marginVertical: 10, }}
                                    fontFamily={FONT_FAMILY_ROBOTO_MEDIUM}
                                />
                            </View>
                            <View>
                                <FlatList
                                    data={searchRestaurantData.response}
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
                            </View>
                        </View>
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Image
                                source={IMG_SEARCH}
                                style={{
                                    height: 50,
                                    width: 50,
                                    tintColor: colors.grey200
                                }}
                            />
                            <RegularText
                                title={Strings.search_something}
                                textStyle={{
                                    color: colors.grey300,
                                    marginTop: 20
                                }}
                            />
                        </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInputView: {
        height: DIMENS.txtInptH,
        backgroundColor: colors.appBlack,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 50,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    searchBarStyle: {
        flex: 1,
        marginLeft: 10
    },
    mainViewStyle: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        marginTop: 10
    }
});

export default SearchScreen;