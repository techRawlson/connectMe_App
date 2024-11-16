import { Alert, Button, Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Color from '../constant/Color'
import Buttons from '../compont/Buttons'


import {
    AppRegistry,
    // StyleSheet,
    // Text,
    // TouchableOpacity,
    Linking,
    // Alert,
    // useState
} from 'react-native';
import axios from 'axios'


// http://192.162.1.111:8082/api/qrcode/XESwOLY


const ActivateTag = (probs) => {
    console.log(probs.route.params.id);

    const [modalVisible, setModalVisible] = useState(false)
    const [uniqueId, setUniqueId] = useState(probs.route.params.id)

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [vehicleNumber, setVehcleNumber] = useState("")
    const [vehicleDetails, setVehcleDetails] = useState("")



    // http://192.162.1.111:8082/api/qr/generate
    // http://192.162.1.111:8082/api/user/userDetails/usiqueId




    // http://192.162.1.111:8082/api/user/assignQRCode
    // body = {
    //     uniqueId: uniqueId,
    //     name: "",
    //     phoneNumber: "",
    //     carDetails: "",
    //     vehicleNumber: ""
    // }

    const submitButtonHandler = async () => {
        // setModalVisible(false)
        // console.log("Submit Button Handler");
        // setName("")
        // setPhoneNumber("")
        // setVehcleNumber("")
        // setVehcleDetails("")

        try {
            const body = {
                uniqueId: uniqueId,
                name: name,
                phoneNumber: phoneNumber,
                vehicleNumber: vehicleNumber,
                carDetails: vehicleDetails,
            }
            console.log("body", body);

            const res = bodyValidater(body)
            if (res) {
                let URL = `http://192.168.1.111:8082/api/user/assignQRCode`;
                let response = await axios.post(URL, body)
                setModalVisible(false)
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
        if (body.uniqueId == "") {
            Alert.alert("Alert", "Id Not Found")
            return false;
        }
        if (body.name == "") {
            Alert.alert("Alert", "Enter Valid Name")
            return false;
        }
        if (body.phoneNumber == "") {
            Alert.alert("Alert", "Enter Valid Phone Number")
            return false;
        }
        if (body.vehicleNumber == "") {
            Alert.alert("Alert", "Enter Valid Vehicle Number")
            return false;
        }
        if (body.carDetails == "") {
            Alert.alert("Alert", "Enter Valid Car Details")
            return false;
        }
        return true;
    }

    const onSuccess = (e) => {
        Alert.alert('QR Code Scanned!', e.data);
        console.log('QR Code Data:', e.data);
    };

    // useEffect(() => {
    //     if (urls !== "") {
    //         console.log("Scanned URL:", urls);
    //         getIdFromUrl(urls);
    //     }
    // }, [urls]);





    return (
        <View style={styles.rootContainer}>
            <View style={styles.firstChildContainer}>
                <View style={styles.viewContainer}>
                    <View style={styles.textView}>
                        <Text style={[styles.headingText]}>You are about to activate the Tags</Text>
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <View style={styles.textView}>
                        <Text style={styles.paragrafeText}> <MaterialIcons name='error-outline' size={16} /> Please Make sure <Text style={{ fontWeight: "700", color: "black" }}>to activate all your tags, All of them are unique.</Text></Text>
                    </View>
                </View>
                <View style={styles.viewContainer}>
                    <TouchableOpacity
                        style={{ borderRadius: 8, backgroundColor: Color.Header_Fooler_Background_Color, elevation: 8, marginHorizontal: "auto", paddingHorizontal: 20, paddingVertical: 5 }}
                        onPress={() => setModalVisible(true)}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <Text style={[styles.buttonText]}>CLICK TO ACTIVATE TAG</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewContainer, { marginTop: 40 }]}>
                    <View style={[styles.spacialTextView,]}>
                        <Text style={[styles.spacialText,]}>If you need any help please click here WhatsApp Live Support</Text>
                    </View>
                </View>
            </View>

            <View style={styles.secendChildContainer}>
                <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20, paddingHorizontal: 20 }}>
                    <View style={[styles.decTextView,]}>
                        <Text style={[styles.decText,]}>ABC is being Re-branded as XYZ, all services and tags will remain acare as usual always. Its just re-branding the name. Company name remains ABC ONE</Text>
                    </View>
                </View>
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
            </View>

            <Modal
                animationType="slide" // or 'fade'
                transparent={true} // makes the modal's background transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // handles hardware back button on Android
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flexDirection: "row", marginBottom: 15 }}>
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={styles.modalHeaderText}>Vehicle Details Form</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name='close' size={30} color={Color.Modal_Text_Color} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.modalInputView}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.inputLableText}>Name</Text>
                                    <Ionicons name='star' color={"red"} size={7} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={name}
                                    onChangeText={text => setName(text)}
                                    placeholder='Provide your name for registering tags'
                                    placeholderTextColor={"gray"}
                                    multiline={false}
                                    numberOfLines={1}
                                    scrollEnabled
                                />
                            </View>
                            <View style={styles.modalInputView}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.inputLableText}>Contact Number</Text>
                                    <Ionicons name='star' color={"red"} size={7} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={phoneNumber}
                                    onChangeText={text => setPhoneNumber(text)}
                                    placeholder='Primary number where you will get OTP for register'
                                    placeholderTextColor={"gray"}
                                    keyboardType='phone-pad'
                                    multiline={false}
                                    numberOfLines={1}
                                    scrollEnabled
                                    ellipsizeMode="tail" // Truncates the text with an ellipsis (...)
                                />
                            </View>
                            <View style={styles.modalInputView}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.inputLableText}>Vehicle Number</Text>
                                    <Ionicons name='star' color={"red"} size={7} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={vehicleNumber}
                                    onChangeText={text => setVehcleNumber(text.toUpperCase())}
                                    placeholder='Provide your vehicle number'
                                    placeholderTextColor={"gray"}
                                    multiline={false}
                                    inputMode='text'
                                    numberOfLines={1}
                                    scrollEnabled
                                />
                            </View>
                            <View style={styles.modalInputView}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.inputLableText}>Vehicle Details</Text>
                                    <Ionicons name='star' color={"red"} size={7} />
                                </View>
                                <TextInput
                                    style={[styles.textInput, { height: 100 }]}
                                    value={vehicleDetails}
                                    onChangeText={text => setVehcleDetails(text)}
                                    textAlignVertical='top'
                                    multiline
                                    numberOfLines={3}
                                    placeholder='Provide your vehicle details'
                                    placeholderTextColor={"gray"}
                                    scrollEnabled
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                                <View>
                                    <Buttons title={"Submit"} bgColor={Color.Submit_Button_Background_Color} textColor={"black"} onClick={submitButtonHandler} />
                                </View>
                                <View>
                                    <Buttons title={"Cancel"} bgColor={Color.Cansel_Button_Background_Color} textColor={"black"} onClick={() => setModalVisible(false)} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>



        </View >
    )
}

export default ActivateTag

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    centerText: {
        fontSize: 16,
        margin: 10,
        textAlign: "center",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },






    rootContainer: {
        flex: 1,
        // padding: 15,
        backgroundColor: "white"
    },
    firstChildContainer: {
        // borderWidth: 1,
        marginHorizontal: 10,
        paddingBottom: 20,
        borderBottomWidth: 0.5
    },
    viewContainer: {
        marginVertical: 7
    },
    textView: {
        alignItems: "center",
        paddingHorizontal: 10,
    },
    headingText: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "700",
        color: "black"
    },
    paragrafeText: {
        fontSize: 15,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "black"
        // fontWeight: "500"
    },
    buttonTextView: {
        // borderWidth: 1,
        borderRadius: 7,
        paddingVertical: 6,
        backgroundColor: Color.Button_BackGroung_Color,
        elevation: 5
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        color: Color.Button_Text_Color
    },
    spacialTextView: {
        paddingHorizontal: 10,
        // alignItems: "center"
    },
    spacialText: {
        // width: 230,
        fontSize: 16,
        textAlign: "center",
        color: "#535151"
    },
    linkText: {
        fontWeight: "500",
        color: "black"
    },
    decTextView: {
        // paddingHorizontal: 30
    },
    decText: {
        fontSize: 16,
        textAlign: "center",
        color: "#a3a1a1",
    },
    secendChildContainer: {
        flex: 1,
        justifyContent: "space-between",
        // alignItems: "center"
    },
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    },
    modalContent: {
        width: '90%',
        padding: 20,
        // backgroundColor: 'white',
        backgroundColor: Color.Modal_Background_Color,
        borderRadius: 10,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // adds shadow on Android
    },
    scrollContainer: {
        flexGrow: 1, // Ensures the content can scroll
        justifyContent: "center", // Center the content vertically
    },
    modalHeaderText: {
        color: Color.Modal_Text_Color,
        fontSize: 20,
        fontWeight: "600"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInputView: {
        marginVertical: 10,
    },
    inputLableText: {
        marginBottom: 4,
        color: Color.Modal_Text_Color,
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Color.Modal_Text_Color,
        color: Color.Modal_Text_Color,
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 7
    }

})