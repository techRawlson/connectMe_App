import React from "react";
import { StyleSheet, Text, View, Pressable, Linking, TouchableOpacity, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Color from "../constant/Color";
import { RecyclerViewBackedScrollView } from "react-native";

const Social = () => {

    const data = [
        {
            icon: require("../../assrts/image/icon/instagram.png"),
            title: "Instagram",
            link: "https://www.instagram.com",
        },
        {
            icon: require("../../assrts/image/icon/facebook.png"),
            title: "Facebook",
            link: "https://www.facebook.com",
        },
        {
            icon: require("../../assrts/image/icon/youtube.png"),
            title: "YouTube",
            link: "https://www.youtube.com",
        },
        {
            icon: require("../../assrts/image/icon/Linkedin.png"),
            title: "LinkedIn",
            link: "https://www.linkedin.com",
        },
        {
            icon: require("../../assrts/image/icon/web.png"),
            title: "Website",
            link: "https://www.example.com",
        },
    ];

    const handleLinkPress = (url) => {
        if (url) {
            Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
        } else {
            console.log("No URL provided");
        }
    };

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => handleLinkPress(item.link)} key={index} style={styles.socialItem}>
                <View style={styles.iconContainer}>
                    <Image
                        style={{ height: 50, width: 50 }}
                        source={item.icon}
                    />
                </View>
                <View style={styles.pressableArea}>
                    <View style={styles.textContainer}>
                        <Text style={styles.linkText}>{item.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Social</Text>
            {data.map((item, index) => renderItem(item, index))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 20,
    },
    socialItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Color.Card_Background_Color,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderColor: Color.Button_Background_Color,
        borderWidth: 1,
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "center"
    },
    linkText: {
        fontSize: 16,
        // color: "#007bff",
        // textDecorationLine: "underline",
    },
    pressableArea: {
        flex: 1,
    },
    iconColor: Color.Button_Background_Color
});

export default Social;
