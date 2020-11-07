import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    CheckBox,
    Keyboard,
    StatusBar, ImageBackground
} from 'react-native';
import * as Utils from '../../../utility';
import CommonButton from '../../common/CommonButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import flashMessage from '../../common/CustomFlashAlert';
import colors from '../../../utility/Colors';
import Strings from '../../../translation/language'
import RegularText from '../../common/RegularText';
import { DIMENS, SCREEN_SIGNUP, SCREEN_LOGIN_WITH_OTP_SECOND, SCREEN_BALANCE_TRANSFER_SECOND, SCREEN_EARN_USER_SECOND, KEY_USER_DATA, SCREEN_HOME } from '../../../utility/constants';
import { IMG_SPLASH, IMG_LOGO, IMG_LOGIN_BG, IMG_EMAIL, IMG_PASSWORD, IMG_USER_NAME, IMG_MOBILE_NUMBER, IMG_BACK_WHITE, IMG_USER_DEFAULT, IMG_CAMERA } from '../../../utility/imageRes'
import { KEYBOARD_NUMBER_PAD, FONT_FAMILY_ROBOTO_MEDIUM, KEYBOARD_DEFAULT } from '../../../utility/Typography';
import { } from '../../../utility/Utils';
import { storeItem } from '../../../utility/CustomAsyncStorage'
import CommonSimpleTextInput from '../../common/CommonSimpleTextInput';
import { FONT_SIZE_BIG, FONT_SIZE_MEDIUM, FONT_SIZE_REGULAR } from '../../../utility/Typography'
import Ripple from 'react-native-material-ripple'
import NavigationService from '../../../NavigationService'
import CommonHeader from '../../common/CommonHeader'
import { aboutUsAction, editProfileAction, clearEditProfileAction } from '../../../actions/action';
import HTML from 'react-native-render-html';
import CustomImagePickerModal from '../../modals/customImagePickerModal';
import { OpenCamera, OpenGallary } from '../../common/CommonImagePicker';
import ProfileUpdateModal from '../../modals/profileUpdateModal'
import CustomLoader from '../../common/CustomLoader'

const { height, width } = Dimensions.get('window')

const EditProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [isImagePickerModal, setIsImagePickerModal] = useState(false)
    const [isProfileUpdateModalVisible, setIsProfileUpdateModalVisible] = useState(false)
    const [image, setImage] = useState(undefined)
    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const { editProfileRes, fetching, error } = useSelector(state => ({
        editProfileRes: state.editProfileReducer.editProfileRes,
        fetching: state.editProfileReducer.fetching,
        error: state.editProfileReducer.error,
    }), shallowEqual);

    useEffect(() => {
        getDetails()
        if (editProfileRes != undefined && editProfileRes.error == false) {
            // alert(JSON.stringify(editProfileRes))
            setIsProfileUpdateModalVisible(true)
            updateUserData()
        }
    }, [editProfileRes])

    function getDetails() {
        Utils.CustomStorage.retrieveItem(KEY_USER_DATA).then(data => {
            // alert(JSON.stringify(data))
            setName(data.full_name)
            setMobileNumber(data.phone_number)
            setEmail(data.email)
            setImage({ uri: data.image, type: "image/jpeg", name: data.image })
            setAddress(data.address)
        })
    }

    function onpenImagePicker() {
        setIsImagePickerModal(true)
    }

    function onCloseImagePickerModal() {
        setIsImagePickerModal(false)
    }

    async function onCameraClick() {
        setIsImagePickerModal(false)
        OpenCamera((selectedImageUri) => {
            setImage(selectedImageUri)
        })
    }

    function onGallaryClick() {
        setIsImagePickerModal(false)
        OpenGallary((selectedImageUri) => {
            setImage(selectedImageUri)
        })
    }

    function onChangeName(name) {
        setName(name)
    }

    function onChangeAddress(address) {
        setAddress(address)
    }

    function onSubmit() {
        let data = {
            full_name: name,
            address: address,
            image: 'data:' + image.type + ';base64,' + image.base64
        }
        dispatch(editProfileAction(data))
    }

    function updateUserData() {
        storeItem(KEY_USER_DATA, editProfileRes.data)
        getDetails()
        global[KEY_USER_DATA] = editProfileRes.data
    }

    function onCloseSuccessModal() {
        setIsProfileUpdateModalVisible(false)
        navigation.navigate(SCREEN_HOME)
        dispatch(clearEditProfileAction())
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: colors.appBlack
            }}
        >
            <CommonHeader
                title={Strings.edit_profile}
            />
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: colors.white,
                    // paddingHorizontal: 10,
                    alignItems: 'center',
                }}
                keyboardShouldPersistTaps={"always"}
            >

                <Ripple style={{
                    height: width / 5,
                    width: width / 5,
                    borderRadius: 500,
                    marginTop: 20
                }}
                    rippleContainerBorderRadius={500}
                    onPress={() => onpenImagePicker()}
                >
                    {/* <Image
                        source={image.uri == '' ? IMG_USER_DEFAULT : { uri: image != undefined && image.uri }}
                        resizeMode='cover'
                        style={{
                            height: width / 5,
                            width: width / 5,
                            borderRadius: 500
                        }}
                    /> */}
                    {image != undefined ?
                        <Image
                            style={{
                                height: width / 5,
                                width: width / 5,
                                borderRadius: 500
                            }}
                            source={image.uri == '' ? IMG_USER_DEFAULT : { uri: image.uri }} /> :
                        <Image
                            resizeMode='contain'
                            style={{
                                height: width / 5,
                                width: width / 5,
                                borderRadius: 500
                            }}
                            source={IMG_USER_DEFAULT} />
                    }
                    <Image
                        source={IMG_CAMERA}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }}
                    />
                </Ripple>

                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.name}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeName}
                        keyboardType={KEYBOARD_DEFAULT}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.appBlack }}
                        value={name}
                    />
                </View>

                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.mobile_number}
                        borderBottomColor={colors.lightGray}
                        // onChangeText={onChangeMobile}
                        keyboardType={KEYBOARD_DEFAULT}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.grey600 }}
                        editable={false}
                        value={mobileNumber}
                    />
                </View>

                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.email_address}
                        borderBottomColor={colors.lightGray}
                        // onChangeText={onChangeMobile}
                        keyboardType={KEYBOARD_DEFAULT}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.grey600 }}
                        editable={false}
                        value={email}
                    />
                </View>

                <View style={styles.textInputView}>
                    <CommonSimpleTextInput
                        placeHolder={Strings.address}
                        borderBottomColor={colors.lightGray}
                        onChangeText={onChangeAddress}
                        keyboardType={KEYBOARD_DEFAULT}
                        returnKeyType={'done'}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        secureTextEntry={false}
                        inputStyle={{ color: colors.appBlack }}
                        value={address}
                    />
                </View>

                <CommonButton
                    title={Strings.submit}
                    onPressButton={onSubmit}
                    textStyle={{ color: colors.white }}
                    buttonStyle={{ width: width / 2, marginVertical: 40, alignSelf: 'center' }}
                />
                <CustomImagePickerModal
                    visible={isImagePickerModal}
                    onClose={onCloseImagePickerModal}
                    onCameraClick={onCameraClick}
                    onGallaryClick={onGallaryClick}
                />
                <ProfileUpdateModal
                    visible={isProfileUpdateModalVisible}
                    onClose={onCloseSuccessModal}
                />
            </ScrollView>
            {
                fetching &&
                <CustomLoader />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    textInputView: {
        height: DIMENS.txtInptH,
        marginTop: 30,
        marginHorizontal: 20
    }
});

export default EditProfileScreen;