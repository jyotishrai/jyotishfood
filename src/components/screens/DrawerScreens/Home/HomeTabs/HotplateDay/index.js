import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    StatusBar
} from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import RegularText from '../../../../../common/RegularText';
import HotPlateDayScreen from './HotPlateDay'

const HotPlateDay = ({ navigation }) => {

    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, }}>
            <HotPlateDayScreen />
        </View>
    )
}

export default HotPlateDay;