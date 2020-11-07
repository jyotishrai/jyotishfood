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
import SuperSaverScreen from './SuperSaver'

const SuperSaver = ({ navigation }) => {

    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, }}>
            <SuperSaverScreen />
        </View>
    )
}

export default SuperSaver;