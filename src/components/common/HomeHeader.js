import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconX, ICON_TYPE } from '../../icons';
import * as Utils from '../../utility'
import colors from '../../utility/Colors';
import { IMG_BACK, IMG_BACK_WHITE, IMG_USER_DEFAULT, IMG_SEARCH } from '../../utility/imageRes';
import NavigationService from '../../NavigationService';
import Ripple from 'react-native-material-ripple';
import RegularText from './RegularText';
import Strings from '../../translation/language';
import { SCREEN_SEARCH, KEY_USER_DATA } from '../../utility/constants';

function HomeHeader({
    title,
    location,
    navigation
}) {

    const [reRender, setReRender] = useState(false)

    useEffect(() => {
        navigation.addListener(
            'didFocus',
            () => {
                setReRender(!reRender)
            }
        );
    }, [])

    function onDrawerButton() {
        navigation.openDrawer()
    }

    function onPressSearch() {
        navigation.navigate(SCREEN_SEARCH)
    }
    console.log("image:-", global[KEY_USER_DATA].image);

    // alert(JSON.stringify(global[KEY_USER_DATA]))

    return (
        <View style={{
            flexDirection: 'row',
            paddingVertical: 10, height: 50,
            alignItems: 'center',
            backgroundColor: colors.appBlack,
            justifyContent: 'space-between',
            paddingHorizontal: 10
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Ripple style={{

                }}
                    onPress={() => onDrawerButton()}
                >
                    <Image
                        source={global[KEY_USER_DATA] != undefined && global[KEY_USER_DATA].image != '' ? { uri: global[KEY_USER_DATA].image } : IMG_USER_DEFAULT}
                        style={{ width: 35, aspectRatio: 1, borderRadius: 17.5 }}
                    //resizeMode='contain'
                    />
                </Ripple>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <RegularText
                        title={Strings.now + ' : '}
                        textStyle={{ color: colors.mediumGray, fontSize: 13 }}
                    />
                    <RegularText
                        title={location}
                        textStyle={{ color: colors.white, fontSize: 13 }}
                    />
                </View>
            </View>
            <Ripple onPress={() => onPressSearch()}>
                <Image source={IMG_SEARCH} />
            </Ripple>
        </View>
    );
}
const styles = StyleSheet.create({

})

export default HomeHeader;