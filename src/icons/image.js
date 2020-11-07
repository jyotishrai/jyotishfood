
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native'



function getImage({ style, src, tintColor, mode, }) {

    return (
        // <TouchableOpacity activeOpacity={0.8} style={{height:'100%',width:'12%',justifyContent:'center',alignItems:'center'}}>
        <Image
            style={style || { height: 20, width: 20, }}
            source={src != undefined ? src : null}
            resizeMode={mode}
            tintColor={tintColor || ''}
        />
        // </TouchableOpacity>
    );
}

export default getImage;