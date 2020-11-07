import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as Utils from "./index"

export const USER_DATA = Utils.Constants.KEY_USER_DATA;
export const TIME_OUT_TIME = 'TIME_OUT_TIME';

export const setUserData = (data) => {
    storeItem(USER_DATA, data);
}

export const getUserData = () => {
    return retrieveItem(USER_DATA).then((data) => {
        //this callback is executed when your Promise is resolved
        console.log('userData Value retrieveItem :' + JSON.stringify(data));
    }).catch((error) => {
        //this callback is executed when your Promise is rejected
        console.log('Promise is rejected with error:' + error);
    })
}

export async function retrieveItem(key) {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
        console.log(error.message);
    }
    return
}

export async function storeItem(key, item) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
}

export async function clearData() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        // Error retrieving data
    }
}