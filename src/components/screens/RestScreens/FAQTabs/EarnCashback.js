import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import colors from '../../../../utility/Colors';
import CachbackHistoryRow from '../../../rows/cashbackHistoryRow';
import FaqRow from '../../../rows/faqRow';
import { getIsCheck } from '../../../../utility/Utils'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getFaqAction } from '../../../../actions/action';
import CustomLoader from '../../../common/CustomLoader'

const EarnCashbackScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const [faqData, setFaqData] = useState(undefined)

    const [reRender, setReRender] = useState(false)

    const { faqList, fetching, error } = useSelector(state => ({
        faqList: state.getFaqReducer.faqList,
        fetching: state.getFaqReducer.fetching,
        error: state.getFaqReducer.error,
    }), shallowEqual);

    useEffect(() => {
        if (faqList == undefined) {
            getFaq()
        }
        if (faqList != undefined) {
            setFaqData(faqList.response.earn)
        }
    }, [faqList])

    function getFaq() {
        dispatch(getFaqAction({ type: 'e' }))
    }

    function onPressDown(item, index) {
        let OldArray = faqData;
        let selected = item
        let temp = getIsCheck(selected.isOpen, index)
        selected.isOpen = temp
        OldArray[index] = selected;
        setFaqData(OldArray)
        setReRender(!reRender)
    }

    return (
        <View style={styles.mainViewStyle}>
            {faqData != undefined &&
                <FlatList
                    data={faqData}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <FaqRow
                                item={item}
                                onPressDown={onPressDown}
                            />
                        )
                    }}
                />
            }
            {
                fetching &&
                <CustomLoader />
            }
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

export default EarnCashbackScreen;