//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'

const options = {
    title: 'Select Image',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export function OpenGallary(callback) {
    ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true,
        includeBase64: true
    }).then(image => {
        var fileNameA = image.path.split('/')
        var fileName = fileNameA[fileNameA.length - 1];
        let tempImageObject = {
            uri: image.path,
            type: image.mime,
            name: fileName,
            base64: image.data
        }
        callback(tempImageObject)
        console.warn(tempImageObject);
        return tempImageObject;
    });
}

export function OpenCamera(callback) {
    ImagePicker.openCamera({
        width: 200,
        height: 200,
        cropping: true,
        includeBase64: true
    }).then(image => {
        var fileNameA = image.path.split('/')
        var fileName = fileNameA[fileNameA.length - 1];
        let tempImageObject = {
            uri: image.path,
            type: image.mime,
            name: fileName,
            base64: image.data
        }
        callback(tempImageObject)
        //console.warn(tempImageObject);
        return tempImageObject;
    });
}