import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Image,
    RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Install this package for the dropdown picker
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Footer from "./Footer";
import SingleSelectDropdown from "../../SingleSelectDropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Redux/action";

const LoginScreen = ({ navigation }) => {
    let dispatch = useDispatch()

    const [selectedCountry, setSelectedCountry] = useState("India (+91)");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
    const [referse, setReferse] = useState(false)

    const [otpSend, setOtpSend] = useState(false)
    const [ownerOtp, setOwnerOtp] = useState("")
    const [generatedOtp, setGeneratedOtp] = useState("")


    const changeScreenHandler = async () => {
        let data = JSON.parse(await AsyncStorage.getItem("Login"))
        // console.log(data)

        if (data) {
            dispatch(setUserDetails(data))
            navigation.replace("Home Page")
        }
    }

    useEffect(() => {
        changeScreenHandler()
    }, [])



    const handleNext = () => {
        if (mobileNumber.length < 10 || isNaN(mobileNumber)) {
            Alert.alert("Invalid Input", "Please enter a valid 10-digit number.");
        } else if (!isCaptchaChecked) {
            Alert.alert("CAPTCHA Required", "Please verify you are not a robot.");
        } else {
            // Alert.alert("Success", "Proceeding to the next step.");s
            sendOtpHandler()
        }
    };


    const generateOTPHandler = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    };

    const sendOtpHandler = async () => {
        try {
            // let otp = generateOTPHandler();
            let otp = "123123";
            setGeneratedOtp(otp)
            console.log(otp);

            console.log(mobileNumber);

            let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=${mobileNumber}&Text=Your%20verification%20code%20is%20${otp}.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
            // let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=9671059942&Text=Your%20verification%20code%20is%20999999.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
            console.log(URL);

            let response = await axios.post(URL)
            if (response.data.status == "200 Ok") {
                setOtpSend(true)
            }
            console.log(response.data);
        } catch (error) {
            console.error("Send Otp Error", error);
        }
    }

    const verifyOtpHandler = async () => {
        console.log("Verify Otp Handler");
        console.log(generatedOtp);

        if (generatedOtp == ownerOtp) {
            try {
                const formData = new FormData();
                formData.append('loginMobileNumber', mobileNumber);
                let URL = `http://192.168.1.111:8082/api/user-login`
                let res = await axios.post(URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                console.log("res.data", res.data);
            } catch (error) {
                console.log("Login Error", error);
            }




            let newData = JSON.stringify({ login: true, number: mobileNumber })
            AsyncStorage.setItem("Login", newData)
            navigation.replace("Home Page")

        } else {
            Alert.alert("Alert", "Enter valid otp")
        }

    }


    let data = [
        "India (+91)",
        "USA (+1)",
        "UK (+44)",
    ]

    const selectedCountryHandler = (item) => {
        console.log(item);
        setSelectedCountry(item);
    }

    const toggleCaptcha = () => {
        setIsCaptchaChecked(!isCaptchaChecked);
    };

    const pageReferseHandler = () => {
        setReferse(true)
        setMobileNumber("")
        setOwnerOtp("")
        setGeneratedOtp("")
        setIsCaptchaChecked(false)
        setOtpSend(false)
        setReferse(false)
    }

    return (
        <View style={styles.rootContainer}>

            <ScrollView contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl refreshing={referse} onRefresh={pageReferseHandler} />
                }
            >
                <Text style={styles.heading}>Login</Text>

                {/* Login Card */}
                <View style={styles.card}>
                    {/* Country Picker */}
                    <View style={{ marginBottom: 10 }}>
                        <SingleSelectDropdown items={data} defaultValue={selectedCountry} onSelectionChange={selectedCountryHandler} />
                    </View>

                    {/* Mobile Number Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
                        keyboardType="numeric"
                        maxLength={10}
                        value={mobileNumber}
                        editable={!otpSend}
                        onChangeText={(text) => setMobileNumber(text)}
                        placeholderTextColor="#ccc"
                    />

                    {/* Info Text */}
                    <Text style={styles.infoText}>
                        Please do not use any "0" or "91" in the number.
                    </Text>

                    {/* CAPTCHA */}
                    <TouchableOpacity
                        style={[
                            styles.captchaBox,
                            isCaptchaChecked && styles.captchaChecked,
                        ]}
                        onPress={toggleCaptcha}
                    >
                        {isCaptchaChecked ?
                            <MaterialCommunityIcons name="checkbox-marked" size={20} /> :
                            <MaterialCommunityIcons name="checkbox-blank" size={20} />
                        }
                        <Text style={styles.captchaText}>I'm not a robot</Text>
                    </TouchableOpacity>

                    {
                        otpSend ?
                            <TextInput
                                style={styles.input}
                                placeholder="Otp"
                                keyboardType="numeric"
                                maxLength={6}
                                value={ownerOtp}
                                onChangeText={setOwnerOtp}
                                placeholderTextColor="#ccc"
                            />
                            : ""
                    }


                    {/* Next Button */}
                    <TouchableOpacity
                        style={[styles.button, !isCaptchaChecked && styles.buttonDisabled]}
                        onPress={otpSend ? verifyOtpHandler : handleNext}
                        disabled={!isCaptchaChecked}
                    >
                        <Text style={styles.buttonText}>{otpSend ? "Verify" : "Next"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            {/* Footer */}
            {/* < Footer /> */}
        </View >
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#90ee90", // Light green
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    scrollContainer: {
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        // textAlign: "center",
        marginBottom: 20,
    },
    card: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        elevation: 5,
    },
    picker: {
        height: 50,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
        color: "#000",
        borderRadius: 5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: "#ccc",
        backgroundColor: "#f9f9f9",
        color: "#000",
    },
    infoText: {
        fontSize: 12,
        color: "#555",
        marginBottom: 20,
    },
    captchaBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        borderColor: "#ccc",
        backgroundColor: "#f9f9f9",
    },
    captchaChecked: {
        borderColor: "green",
    },
    captchaText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#000",
    },
    button: {
        backgroundColor: "#000",
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "#90ee90",
    },
    footerButton: {
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        marginTop: 5,
        color: "#000",
    },
});
