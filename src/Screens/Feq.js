import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import Color from '../constant/Color';
import HomePageLogoImage from '../components/HomePageLogoImage';

const faqData = [
    {
        title: "Will My Contact details be shared with anyone?",
        dec: "No, all your details are secure and masked. The person who scans the tag will not get any details about you. All calls or messages will be encrypted and safe."
    },
    {
        title: "Will I get notifications automatically if I have parked the vehicle in no parking or wrong parking?",
        dec: "No, EazyTag allows people to contact you in case of wrong parking. Someone will scan the EazyTag on your vehicle and call you."
    },
    {
        title: "Do I need to pay money to recharge my tag?",
        dec: "No, you only need to pay once when you buy the EazyTag. After that, EazyTag is totally free."
    },
    {
        title: "Can I track the current location of my vehicle?",
        dec: "No, we are not using any GPS technology. You cannot track the current location of your vehicle using EazyTag."
    },
    {
        title: "Will My Car details be shared with anyone?",
        dec: "No, EazyTag serves privately. Your car details will not be shared with anyone who scans the code."
    },
    {
        title: "Will I get notifications automatically if my vehicle is towed away?",
        dec: "No, EazyTag allows the traffic police to contact you in case of towing. Only when traffic police scan the CarConnect, you can get on a call with the concerned person and be notified about the towing."
    }
];

const Feq = () => {
    const { width } = Dimensions.get("window");

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.dec}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList   
                style={{ padding: 20, }}
                data={faqData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default Feq;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",

    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: "center"
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        // color: Color.Header_Fooler_Background_Color,
        marginBottom: 10,
        textAlign: "center"
    },
    cardDescription: {
        fontSize: 14,
        color: "#555",
        // textAlign: "center",
    },
});
