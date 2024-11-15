import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import Color from '../../constant/Color'

const HomeBox = ({ title, onClick, source }) => {
    return (
        <Pressable
            onPress={onClick}
            style={styles.boxContainer}
            android_ripple={{ color: "#e2dbdb" }}
        >
            <Image style={styles.image}
                source={source}
            />
            <Text style={styles.boxText}>{title}</Text>
        </Pressable>
    )
}

export default HomeBox

const styles = StyleSheet.create({
    boxContainer: {
        // borderWidth: 1,
        // margin: "auto",
        // minHeight: 95,
        // minWidth: 95,
        // maxHeight: 100,
        // maxWidth: 100,
        height:100,
        width:100,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 10,
        padding: 5,
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    boxText: {
        fontSize: 13,
        textAlign: "center",
        color:Color.Table_Row_Text_Color,
    },
    image: {
        height: 35,
        width: 35,
        resizeMode: "contain",
        // borderWidth:1,
        // borderColor:"black"
    }
})