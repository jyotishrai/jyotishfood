import NetInfo from "@react-native-community/netinfo";
import flashMessage from "../components/common/CustomFlashAlert";
import { DEVICE_ID, DEVICE_TOKEN, USER_TOKEN, KEY_USER_DATA, KEY_USER_TOKEN, KEY_DEVICE_TOKEN, KEY_DEVICE_ID } from "../utility/constants";
import { USER_DATA } from "../utility/CustomAsyncStorage";
import { getFormDataFromObject } from "../utility/Utils";
import { DeviceEventEmitter } from "react-native";
import * as Utils from "../utility";
import { API_GET_NEARBY_RESTAURANT_METHOD } from "../utility/ApiTypes";

export default async (method) => {
    let networkStatus = undefined;
    await NetInfo.fetch().then(state => {
        console.log('NETINFO ME AAYA')
        networkStatus = state.isConnected;
    });
    if (networkStatus != undefined && networkStatus) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (method.payload == undefined) {
                    return resolve(await getApiCall(method.type));
                } else {
                    return resolve(await getPostApiCall(method));
                }
            }, 100);
        })
    } else {
        return flashMessage("You are offline.", "danger");;
    }
}

export async function getApiCall(url) {
    console.log('url :::: ', url)
    try {
        let response = await fetch(url, {
            method: 'GET',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            // }
            headers: {
                //'DEVICEINFO': '',
                'TOKEN': global[KEY_DEVICE_TOKEN],
                'USERTOKEN': global[KEY_USER_TOKEN],
                'DEVICEID': global[KEY_DEVICE_ID],
                'Content-Type': 'multipart/form-data',
            }
        })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

async function getPostApiCall(method) {
    let header = {
        'TOKEN': global[KEY_DEVICE_TOKEN],
        'USERTOKEN': global[KEY_USER_TOKEN],
        'DEVICEID': global[KEY_DEVICE_ID],
        'Content-Type': 'multipart/form-data',
    }
    console.log(" Api Type : ", method.type + '   requestData :::: ', JSON.stringify(method.payload), "header:-", header);
    let formData = new FormData();

    try {
        for (const [key, value] of Object.entries(method.payload)) {
            formData.append(`${key}`, value);
        }
        let response = await fetch(method.type, {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            // }
            headers: header,
            body: formData
        })
        let responseJson = await response.json();
        console.log('response>>>>>>>>>>', responseJson)
        if (method.type == API_GET_NEARBY_RESTAURANT_METHOD && responseJson.authorization == 401) {
            console.log('response>>>>>>>>>>unaurgorized', responseJson)
            DeviceEventEmitter.emit(Utils.Constants.KEY_SESSION_OUT)
            return;
        }
        return responseJson;
    } catch (error) {
        console.warn(error)
        flashMessage(error.message, "danger");
    }
}

export async function updateProfileApiCall(method) {
    // console.log("Update Milestone Api Type : ", method.type + '   requestData :::: ', JSON.stringify(method.payload));

    let formData = await getFormDataFromObject(method.payload)

    console.log('formData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', formData);

    try {

        let response = await fetch(method.type, {
            method: 'POST',
            headers: {
                //'DEVICEINFO': '',
                'TOKEN': global[KEY_DEVICE_TOKEN],
                'USERTOKEN': global[KEY_USER_TOKEN],
                'DEVICEID': global[KEY_DEVICE_ID],
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        let responseJson = await response.json();
        console.log('response>>>>>>>>>>', responseJson)
        return responseJson;
    } catch (error) {
        console.warn(error)
        flashMessage(error.message, "danger");
    }
}