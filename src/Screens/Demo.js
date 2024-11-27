import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Linking, Image, useWindowDimensions, Pressable, TouchableHighlight } from 'react-native';

const Demo = () => {
    const { height, width } = useWindowDimensions();
    const openLink = () => {
        const url = 'https://www.youtube.com/watch?v=xUS8c5pp7nI';
        Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
        );
    };

    return (
        <View style={styles.container}>
            {/* <Image style={[styles.image, { width: width - 80 }]} source={require("../../assrts/image/theamnal.png")} /> */}
            <Text style={styles.title}>Welcome to Our App!</Text>
            <Text style={styles.description}>
                Watch the video below to understand how to use this app effectively.
            </Text>

            <TouchableOpacity style={styles.button} onPress={openLink}>
                <Image style={[styles.image, { width: width - 80 }]} source={require("../../assrts/image/theamnal.png")} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 100

    },
    image: {
        height: 150,
        borderRadius: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },


    button: {
        // backgroundColor: '#007BFF',
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Demo;
