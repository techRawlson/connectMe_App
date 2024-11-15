import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import Color from '../../constant/Color'
import Bold from '../../constant/Bold'
import Font from '../../constant/Font'

const BirthdayRenderItemComponent = ({ data, index }) => {
    const [profileImageUrl, setProfileImageUrl] = useState("https://th.bing.com/th/id/OIP.n_GnWI6F_1dxWSoX9cNvFQHaHw?w=764&h=800&rs=1&pid=ImgDetMain")

    useEffect(() => {

        // setProfileImageUrl(data.images[0]?.image ? "data:image/jpeg;base64," + data.images[0].image : "https://th.bing.com/th/id/OIP.n_GnWI6F_1dxWSoX9cNvFQHaHw?w=764&h=800&rs=1&pid=ImgDetMain")
        data.images[0]?.image ? setProfileImageUrl("data:image/jpeg;base64," + data.images[0].image) : ""
    }, [])

    return (
        <View key={index} style={styles.rootContainer}>
            <View style={styles.childContainer1}>
                <View style={styles.textView}>
                    {/* Name */}
                    <Text style={styles.text}>{data.name}</Text>
                </View>
                <View style={styles.textView}>
                    {/* Class And Section */}
                    <Text style={styles.text}>Class: {data.className} ({data.section})</Text>
                </View>
                <View style={styles.textView}>
                    {/* Rollno */}
                    <Text style={styles.text}>Rollno: {data.rollNumber}</Text>
                </View>
            </View>
            {/* Image */}
            <View style={styles.childContainer2}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.image}
                        source={{ uri: profileImageUrl }}
                    />
                </View>
            </View>
        </View>
    )
}

export default memo(BirthdayRenderItemComponent)

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 7,
        // borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        elevation: 10,
    },
    childContainer1: {
        // borderWidth:1,
        flex: 3,
    },
    childContainer2: {
        flex: 1,
        // borderWidth:1,
        alignItems: "center",
        justifyContent: "center"
    },
    textView: {
        paddingVertical: 2
    },
    text: {
        color: Color.Table_Head_Text_Color,
        fontWeight: Bold.LableFontWeight,
        fontSize: Font.LableFontSize,
    },
    imageView: {
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: Color.Table_Border_Color,
    }
})