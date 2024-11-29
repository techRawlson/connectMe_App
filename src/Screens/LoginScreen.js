import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    Image,
    useWindowDimensions,
    Text,
} from "react-native";
import { useDispatch } from "react-redux";
import SingleSelectDropdown from "../../SingleSelectDropdown";
import { setUserDetails } from "../Redux/action";
import Color from "../constant/Color";

import InputField from "../components/InputField";
import OtpInput from "../components/OtpInput";
import CustomButton from "../components/CustomButton";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useOtp } from "../hooks/useOtp";
import Font from "../constant/Font";
import HomePageLogoImage from "../components/HomePageLogoImage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const dispatch = useDispatch();

    const [selectedCountry, setSelectedCountry] = useState("India (+91)");
    const [mobileNumber, setMobileNumber] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [ownerOtp, setOwnerOtp] = useState("");
    const [sendedOTP, setSendedOTP] = useState("")

    const { generateOtp, sendOtp } = useOtp();
    const { saveToStorage, getFromStorage } = useAsyncStorage();

    useEffect(() => {
        const checkLogin = async () => {
            const userData = await getFromStorage("Login");
            if (userData?.login) {
                console.log("Logins", userData);
                dispatch(setUserDetails(userData));
                navigation.replace("Home Page");
            }
        };
        checkLogin();
    }, []);

    const handleSendOtp = async () => {
        // const otp = generateOtp(4);
        const otp = "1234";
        setSendedOTP(otp)
        const success = await sendOtp(mobileNumber, otp);
        if (success) {
            setOtpSent(true);
        } else {
            Alert.alert("Error", "Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async () => {
        if (ownerOtp === sendedOTP) {
            const userData = { login: true, number: mobileNumber };
            await saveToStorage("Login", JSON.stringify(userData));
            dispatch(setUserDetails(userData));
            navigation.replace("Home Page");
        } else {
            Alert.alert("Alert", "Invalid OTP. Please try again.");
        }
    };

    const countries = ["India (+91)", "USA (+1)", "UK (+44)"];

    return (
        <View style={styles.rootContainer}>
            <View style={[styles.childView, { width: width - 80 }]}>
                <View style={styles.imageView}>
                    {/* <Image
                        style={styles.logoImage}
                        source={require("./../../assrts/image/easylogo.png")}
                    /> */}
                    <HomePageLogoImage style={styles.logoImage} />

                </View>
                <View style={styles.inputView}>
                    <SingleSelectDropdown
                        items={countries}
                        defaultValue={selectedCountry}
                        onSelectionChange={setSelectedCountry}
                    />
                </View>
                <View style={styles.inputView}>
                    <InputField
                        placeholder="Mobile Number"
                        keyboardType="numeric"
                        maxLength={10}
                        value={mobileNumber}
                        editable={!otpSent}
                        onChangeText={setMobileNumber}
                    />
                </View>
                <View style={styles.inputView}>
                    {otpSent && (
                        <>
                            <Text style={styles.otpText}>Plese enter your OTP</Text>

                            <OtpInput
                                length={4}
                                value={ownerOtp}
                                onChangeText={setOwnerOtp}
                            />
                        </>
                    )}
                </View>
                <View style={styles.inputView}>
                    <CustomButton
                        title={otpSent ? "Verify" : "Send OTP"}
                        onPress={otpSent ? handleVerifyOtp : handleSendOtp}
                        disabled={mobileNumber.length !== 10}
                    />
                </View>
                <View style={styles.inputView}>
                    <CustomButton
                        title={"Cancel"}
                        onPress={() => navigation.replace("Home Page")}
                    />
                </View>

            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Color.Page_Background_Color,
    },
    childView: {
        marginTop: 150,
    },
    imageView: {
        alignItems: "center",
    },
    logoImage: {
        height: 90,
        width: 150,
        resizeMode: "contain",
    },
    otpText: {
        fontSize: Font.LableFontSize,
        color: Color
    },
    inputView: {
        marginVertical: 4,
    }
});
