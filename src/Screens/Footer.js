import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'
import Color from '../constant/Color'

const Footer = () => {
    return (
        <View style={styles.bottomButtonViewContainer}>
            <TouchableOpacity style={[styles.bottomButtonView]}>
                <View>
                    <Ionicons name='arrow-back' size={22} />
                </View>
                <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButtonView}>
                <View>
                    <Ionicons name='camera' size={22} />
                </View>
                <Text>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButtonView}>
                <View>
                    <AntDesign name='question' size={22} />
                </View>
                <Text>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomButtonView]}>
                <View>
                    <Foundation name='indent-more' size={22} />
                </View>
                <Text>More</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    bottomButtonViewContainer: {
        flexDirection: "row",
        justifyContent: "center",
        // borderWidth: 1,
        height: 50,
        backgroundColor: Color.Header_Fooler_Background_Color,
    },
    bottomButtonView: {
        flex: 1,
        // borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})