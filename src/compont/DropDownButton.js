import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../constant/Color'
import Bold from '../../constant/Bold'

const DropDownButton = ({ dropdownTitle, setDropdownTitle, data }) => {
    // console.log("Data: ",data);

    const [imageChange, setImageChange] = useState(false)
    let datas = ["Select", ...data]
    useEffect(() => {
        // console.log("Every Once Time Render");
        if (dropdownTitle == "") {
            setDropdownTitle(datas[0])
        }else{
            setDropdownTitle(dropdownTitle)
        }
    },[])
    return (
        <View>
            <Pressable style={styles.selectOptionBtn} onPress={() => setImageChange(!imageChange)} onBlur={() => setImageChange(!imageChange)}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
                    <View>
                        <Text style={styles.lableText}>{dropdownTitle}</Text>
                    </View>
                    <View >
                        {imageChange ?
                            <Image style={{ height: 20, width: 20 }} source={require("../../../assrts/image/arrowhead-up.png")} /> :
                            <Image style={{ height: 20, width: 20 }} source={require("../../../assrts/image/arrowhead-down.png")} />
                        }
                    </View>
                </View>
            </Pressable>
            {imageChange ?
                <View style={styles.dropDownArea}>
                    {/* <View style={styles.searchInputView}>
                        <TextInput style={styles.searchInput} placeholder='Search' />
                    </View> */}
                    <ScrollView style={styles.itemScrollView}>
                        {
                            datas.map((item, index) => {
                                return (
                                    <View key={index} style={[styles.dropdownItemView, index == 0 ? { borderTopWidth: 0 } : ""]}>
                                        <Text style={styles.dropdownItem} onPress={() => { setImageChange(!imageChange); setDropdownTitle(item) }}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                : ""
            }
        </View>
    )
}

export default DropDownButton

const styles = StyleSheet.create({
    selectOptionBtn: {
        // marginHorizontal: 10,
        width: '100%',
        height: 30,
        borderWidth: 1,
        borderColor: "#bebebe",
        borderRadius: 5,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    lableText:{
        color:Color.Table_Row_Text_Color,
        fontWeight:Bold.LableFontWeight
    },
    dropDownArea: {
        borderWidth: 0.5,
        minHeight: 90,
        maxHeight: 150,
        top: 35,
        width: "100%",
        // marginHorizontal: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: "absolute",
        backgroundColor: "white",
        zIndex: 1
    },
    searchInput: {
        color: "black",
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderRadius: 3,
        backgroundColor: "white",
        elevation: 5,
    },
    searchInputView: {
        marginBottom: 10
    },
    itemScrollView: {
        paddingHorizontal: 5,
        // flex:1,
        // borderWidth:1,
    },
    dropdownItem: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        color:Color.Table_Row_Text_Color
    },
    dropdownItemView: {
        borderTopWidth: 0.5
    },

})