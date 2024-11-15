import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Color from '../../constant/Color';

const Buttons = ({ title, onClick, fontSize, textColor, bgColor, style}) => {
    return (
        <View style={[{ overflow: "hidden", borderRadius: 5}, style]}>
            <Pressable android_ripple={{ color: Color.Buttons_Hover_Color }} style={[styles.btn,bgColor?{backgroundColor:bgColor}:""]} onPress={onClick}>
                <View style={styles.btnView}>
                    <Text style={[styles.btnText, fontSize ? { fontSize: fontSize, } : "", textColor ? { color: textColor } : ""]}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Buttons;

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 3,
        backgroundColor: Color.Buttons_Color,
        borderRadius: 5,
    },
    btnView: {
        paddingHorizontal: 10
    },
    btnText: {
        color: "white",
        margin: "auto",
        fontWeight: "bold",
        fontSize: 16
    }
})