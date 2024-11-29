import { Alert, Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../constant/Color'
import Buttons from '../compont/Buttons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownButton from '../compont/DropDownButton'
import Footer from './Footer'
import CustomButton from '../components/CustomButton'

const ActivateTag = (probs) => {
    const [selectedVehicleType, setSelectedVehicleType] = useState(""); // State to hold selected vehicle type
    const [otpSend, setOtpSend] = useState(false)
    const [uniqueId, setUniqueId] = useState(probs?.route?.params?.id)

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [vehicleNumber, setVehcleNumber] = useState("")
    const [vehicleDetails, setVehcleDetails] = useState("")
    const [otp, setOtp] = useState("")
    const [generatedOtp, setGeneratedOtp] = useState("")

    const [verifiedOtp, setVerifiedOtp] = useState(false)

    const vehicleTypes = ['Car', 'Bus', 'Truck', 'Motorbike', 'Bicycle']

    const submitButtonHandler = async () => {
        try {
            let data = await AsyncStorage.getItem("Login");
            let newData = JSON.parse(data);

            const body = {
                uniqueId: uniqueId,
                name: name,
                phoneNumber: phoneNumber,
                vehicleNumber: vehicleNumber,
                carDetails: vehicleDetails,
                loginMobileNumber: newData.number,
                vehicleType: selectedVehicleType,
            }

            const res = bodyValidater(body)
            if (res) {
                console.log("body", body);
                let URL = `http://192.168.1.111:8082/api/user/assignQRCode`;
                let response = await axios.post(URL, body)
                Alert.alert("Success", response.data, [
                    {
                        text: "Ok",
                        onPress: () => {
                            probs.navigation.navigate("Home Page");
                        }
                    }
                ])
            }
        } catch (error) {
            console.error("Post Data Error", error);
        }
    }

    const bodyValidater = (body) => {
        if (!body.uniqueId) {
            Alert.alert("Alert", "Id Not Found")
            return false;
        }
        if (!body.name) {
            Alert.alert("Alert", "Enter Valid Name")
            return false;
        }
        if (!body.phoneNumber) {
            Alert.alert("Alert", "Enter Valid Phone Number")
            return false;
        }
        if (!body.vehicleNumber) {
            Alert.alert("Alert", "Enter Valid Vehicle Number")
            return false;
        }
        if (!body.carDetails) {
            Alert.alert("Alert", "Enter Valid Car Details")
            return false;
        }
        if (!body.vehicleType) {
            Alert.alert("Alert", "Please select a vehicle type")
            return false;
        }
        return true;
    }

    const generateOTPHandler = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    };

    const sendOtpHandler = async () => {
        try {
            // let otp = generateOTPHandler();
            let otp = "123123";
            setGeneratedOtp(otp)
            let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=${phoneNumber}&Text=Your%20verification%20code%20is%20${otp}.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
            let response = await axios.post(URL)
            if (response.data.status == "200 Ok") {
                setOtpSend(true)
            }
        } catch (error) {
            console.error("OTP Error", error);
        }
    }

    const verifyOtpHandler = () => {
        if (otp === generatedOtp) {
            setVerifiedOtp(true)
        } else {
            Alert.alert("Alert", "Enter Valid Otp")
            setVerifiedOtp(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Card Container */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Activate Tag</Text>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Phone Number Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                {!verifiedOtp && (
                    otpSend ? (
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Enter OTP</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter Otp'
                                    placeholderTextColor="#aaa"
                                    keyboardType="phone-pad"
                                    value={otp}
                                    onChangeText={setOtp}
                                />
                            </View>

                            <CustomButton title={"Verify OTP"} onPress={verifyOtpHandler} />
                        </>

                    ) : (
                        <CustomButton title={"Send OTP"} onPress={sendOtpHandler} />
                    )
                )}

                {verifiedOtp && (
                    <>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Vehicle Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your vehicle number"
                                placeholderTextColor="#aaa"
                                value={vehicleNumber}
                                onChangeText={text => setVehcleNumber(text.toUpperCase())}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Vehicle Type</Text>
                            <DropDownButton data={vehicleTypes} setDropdownTitle={setSelectedVehicleType} dropdownTitle={selectedVehicleType} />
                        </View>

                        {/* Vehicle Details Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Vehicle Details</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Enter details about your vehicle"
                                placeholderTextColor="#aaa"
                                value={vehicleDetails}
                                onChangeText={setVehcleDetails}
                                multiline={true}
                            />
                        </View>

                        {/* Submit Button */}
                        <CustomButton title={"Submit"} onPress={submitButtonHandler} />
                    </>
                )}
            </View>
        </ScrollView>
    )
}

export default ActivateTag
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f8f9fa", // Light gray background for the entire screen
        justifyContent: "center",
    },
    card: {
        backgroundColor: Color.Card_Background_Color,
        borderColor: Color.Card_Border_Color,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Shadow for Android
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: "#333",
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#f9f9f9",
        fontSize: 14,
        color: "#333",
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
});

// i want remove modal and move content of the modal in to the page 