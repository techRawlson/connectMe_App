import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'


const HomePageLogoImage = ({ style }) => {
    const route = useRoute();

    const changeScreen = () => {
        if (!(route.name === "Home Page")) {
            navigation.replace("Home Page")
        }
    }

    const navigation = useNavigation();
    return (
        <Pressable onPress={() => changeScreen()}>
            <Image style={[style]} source={require("../../assrts/image/easylogo.png")} />
        </Pressable>
    )
}

export default HomePageLogoImage

const styles = StyleSheet.create({})