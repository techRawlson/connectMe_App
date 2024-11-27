import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";
import CustomButton from "../components/CustomButton";
import Font from "../constant/Font";
import Bold from "../constant/Bold";
import Color from "../constant/Color";

const Support = ({ navigation }) => {
    console.log(navigation);

    const imageURL = "https://your-image-url.com"; // Replace with the hosted image URL

    const handleEmail = () => {
        Linking.openURL("mailto:support@eazytag.com");
    };

    const handlePhone = () => {
        // Linking.openURL("tel:+1234567890");
        Linking.openURL("tel:+911234567890");
    };
    const goToHome = () => {
        navigation.navigate("Home Page")
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../assrts/image/easylogo.png")} style={styles.logo} />
            <Text style={styles.heading}>Support</Text>
            <Text style={styles.description}>If you have any questions or need assistance, feel free to reach out to us.</Text>
            <View style={styles.contactContainer}>
                <Text style={styles.contactHeading}>Contact Us</Text>
                <TouchableOpacity onPress={handleEmail}>
                    <Text style={styles.contactText}>Email: <Text style={{ color: Color.Link_Text_Color, }}>support@eazytag.com</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePhone}>
                    <Text style={styles.contactText}>Phone: <Text style={{ color: Color.Link_Text_Color, }}>+1 234 567 890</Text></Text>
                </TouchableOpacity>
            </View>
            <CustomButton
                title={"Go Back To Home"}
                onPress={goToHome}
            />
        </View>
    );
};

export default Support;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.Page_Background_Color,
        padding: 20,
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 50,
        resizeMode: "contain",
        marginTop: 20,
    },
    heading: {
        fontSize: Font.HeaderFontSize,
        fontWeight: Bold.HeaderFontWeight,
        color: Color.Header_Font_Color,
        marginVertical: 15,
    },
    description: {
        fontSize: Font.DataFontSize,
        color: Color.Data_Font_Color,
        textAlign: "center",
        marginBottom: 20,
    },
    contactContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    contactHeading: {
        fontSize: Font.DataFontSize,
        fontWeight: Bold.DataFontWeight,
        color: Color.Data_Font_Color,
        marginBottom: 10,
    },
    contactText: {
        fontSize: Font.SimpalFontSize,
        marginVertical: 5,
        textDecorationLine: "underline",
    },
});
