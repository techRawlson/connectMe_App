import { NativeModules, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Color from '../../constant/Color'

const AnnouncementReturnCompont = ({ data }) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const renderItem = (item, index) => {

        const handlePress = (id) => {
            setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown
        };

        // console.log("Render Item Colling...", index);
        
        let date = item.date
        date = date.toString().split(" ");
        console.log("Item Date",date);
        // date[1]
        const [hours, minutes] = date[1].toString().split(':');

        // Determine AM or PM suffix
        const suffix = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour to 12-hour format
        const hours12 = (hours % 12) || 12;

        // Return the time in 12-hour format with AM/PM
        date[1] = `${hours12}:${minutes} ${suffix}`;

        return (
            <View key={index} style={[styles.renderItemRootContainer, { marginVertical: 10, marginHorizontal: 10 }]}>
                <Pressable
                    onPress={() => handlePress(item.id)}
                    style={styles.renderItemRootContainer}
                >
                    <View style={styles.textViewContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>{date[0]}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>{date[1]}</Text>
                        </View>
                    </View>
                    <View style={[styles.textView,{flexDirection:"row", flex:1}]}>
                        {/* <View style={[{flexDirection:"row"}]}> */}
                            {/* <Text style={[styles.textItem, styles.textHeader]}>Title:</Text> */}
                            {/* <Text style={styles.textItem}>Title: {item.title}</Text> */}
                            <Text style={styles.textItem}>{item.title}</Text>
                        {/* </View> */}
                    </View>
                </Pressable >
                {openDropdown === item.id && (
                    <View style={[styles.textView]}>
                        {/* <Text style={[styles.textItem, styles.textHeader]}>Message:</Text> */}
                        {/* <Text style={[styles.textItem]}>Message: {item.description}</Text> */}
                        <Text style={[styles.textItem]}>{item.description}</Text>
                    </View>
                )}
            </View >
        )
    }

    return (
        <ScrollView style={{ flex: 1, }}>
            {data.length > 0 ?
                data.map((item, index) => renderItem(item, index)) :
                <View
                    style={[styles.renderItemRootContainer, { marginVertical: 10, marginHorizontal: 10 }]}
                >
                    <View
                        style={styles.renderItemRootContainer}
                    >
                        <View style={styles.textViewContainer}>
                            <View style={styles.textView}>
                                <Text style={styles.textItem}>Null</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textItem}>Null</Text>
                            </View>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.textItem}>Null</Text>
                        </View>
                    </View>
                </View>
            }
        </ScrollView >
    )
}

export default memo(AnnouncementReturnCompont)

const styles = StyleSheet.create({
    renderItemRootContainer: {
        // borderWidth: 1,
        // marginVertical: 10,
        // marginHorizontal: 10,
        // paddingHorizontal: 20,
        // paddingVertical: 15,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 15
    },
    textViewContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    textView: {
        // borderWidth: 1,
        borderColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        flex: 1,
    },
    textItem: {
        // paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: "center",
        color: Color.Table_Row_Text_Color
        // borderWidth: 0.3
    },
    textHeader: {
        marginRight: 5,
        fontWeight: "700"
    }


})