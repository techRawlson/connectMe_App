import { Alert, Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Color from '../constant/Color';
import axios from 'axios';
import Buttons from '../compont/Buttons';
import Footer from './Footer';
import HomePageLogoImage from '../components/HomePageLogoImage';
import Font from '../constant/Font';
import Bold from '../constant/Bold';
import CustomButton from '../components/CustomButton';

const ContactVehicleOwner = (probs) => {
    const { width, height, fontScale, scale } = useWindowDimensions()

    let [ownerData, setOwnerData] = useState(probs?.route?.params?.data)
    console.log("ownerData", ownerData);


    // let [ownerData, setOwnerData] = useState({ "carDetails": "Hero", "enabled": true, "id": 8, "name": "Himanshu ", "phoneNumber": "9354111045", "qrCode": { "file": "=", "fileName": "QRCode_2.png", "fileType": "Image", "id": 14, "qrCodeUrl": "http://192.168.1.111:5173/activation/?id=lcqi5EgEJx", "uniqueId": "lcqi5EgEJx", "used": true }, "vehicleNumber": "HR22G8116" })

    const [selectedIndex, setSelectedIndex] = useState(null); // State to track selected item
    const [selectedText, setSelectedText] = useState(""); // State to track selected item

    const [carName, setCarName] = useState(ownerData?.carDetails)
    const [carNumber, setCarNumber] = useState(ownerData?.vehicleNumber)
    const [carType, setCarType] = useState(ownerData?.vehicleType)
    const [modalVisable, setModalVisable] = useState(false)

    const [carNumbers, setCarNumbers] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [modalForCall, setModalForCall] = useState(true)

    const [connectingCallModal, setConnectingCallModal] = useState(false)


    // Map icon category names to actual icon components
    const IconMap = {
        MaterialIcons,
        FontAwesome5,
        MaterialCommunityIcons,
        FontAwesome,
    };

    const data = [
        {
            iconName: "do-not-disturb", // MaterialIcons
            iconCatagery: "MaterialIcons",
            label: "The Light of the vehicle is on",
        },
        {
            iconName: "lightbulb", // FontAwesome5
            iconCatagery: "FontAwesome5",
            label: "Your lost item is with me",
        },
        {
            iconName: "car-crash", // FontAwesome5
            iconCatagery: "FontAwesome5",
            label: "The vehicle is getting towned",
        },
        {
            iconName: "road", // FontAwesome5
            iconCatagery: "FontAwesome5",
            label: "Someone is tampering with vehicle",
        },
        {
            iconName: "car-door-lock", // MaterialCommunityIcons
            iconCatagery: "MaterialCommunityIcons",
            label: "The vehicle is no parking",
        },
        {
            iconName: "pets", // MaterialIcons
            iconCatagery: "MaterialIcons",
            label: "Something wrong with this vehicle",
        },
    ];

    const selectItemHandler = (index, label) => {
        if (index == selectedIndex) {
            setSelectedIndex(null);
            setSelectedText("")
        } else {
            setSelectedIndex(index);
            setSelectedText(label)
        }
    }

    const selecterRenderItem = (item, index) => {
        const IconComponent = IconMap[item.iconCatagery]; // Retrieve the icon component dynamically
        const isSelected = index === selectedIndex; // Check if the current item is selected

        return (
            <TouchableHighlight
                key={index}
                underlayColor="#ddd"
                onPress={() => { selectItemHandler(index, item.label); }} // Update selected index on press
                style={[
                    styles.itemContainer,
                    isSelected && styles.selectedItem, // Apply selected style conditionally
                ]}
            >
                <View style={styles.row}>
                    {/* <View style={styles.iconContainer}>
                        {IconComponent && <IconComponent name={item.iconName} size={isSelected ? 21 : 19} color={"black"} />}
                    </View> */}
                    <View style={styles.labelContainer}>
                        <Text style={[styles.labelText, isSelected && styles.selectedText]}>{item.label}</Text>
                    </View>
                    <View>
                        {isSelected ?
                            <MaterialIcons name="check-box" size={21} color={"black"} /> :
                            <MaterialIcons name="check-box-outline-blank" size={21} color={"black"} />}
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    const sendMessageHandler = async () => {

        try {
            if (carNumber.slice(5) != carNumbers) {
                Alert.alert("Alert", "Enter Valid Car Number")
                return;
            }
            // console.log("Message Handler");
            let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=${ownerData?.phoneNumber}&Text=Your%20verification%20code%20is%20000000.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
            // let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=9671059942&Text=Your%20verification%20code%20is%20123456.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
            // let URL = `https://sms.paragalaxy.com/smpp_api/sms?token=7caab167db42fb832cf6ca9f68eebae6&To=9354111045&Text=Hello%My%20Name%20is%20Ashok%20kumar%20code%20is%20356785.%20Please%20enter%20OTP%20to%20confirm%20mobile%20number.%20Parahittech.com&tid=1607100000000107353`
            let data = await (await axios.post(URL)).data
            // console.log(data)
            if (data) {

                Alert.alert("Alert", "Message send",
                    [
                        {
                            text: "Ok",
                            isPreferred: true,
                            onPress: () => { closeModal() }
                        }
                    ]
                )
            }
        } catch (error) {
            console.error("Messaging Error", error);
        }
    }

    const connectCollHandler = async () => {
        try {
            console.log("Coll Handler");
            if (carNumber.slice(5) != carNumbers) {
                Alert.alert("Alert", "Enter Valid Car Number")
                return;
            }
            if (phoneNumber.length > 12 || phoneNumber.length < 9) {
                Alert.alert("Alert", "Enter valid nummber")
                return;
            }
            let URL = `https://click.paragalaxy.com/api/click2call.php?TID=8c6b2ca531&CID=MTAxOA==&BID=bWRtY2xpY2t0b2NhbGxfYzJjXzA0TWF5MjQ=&FPN=${phoneNumber}&SPN=${ownerData.phoneNumber}&BST=`;
            // let URL = `https://click.paragalaxy.com/api/click2call.php?TID=8c6b2ca531&CID=MTAxOA==&BID=bWRtY2xpY2t0b2NhbGxfYzJjXzA0TWF5MjQ=&FPN=${phoneNumber}&SPN=9671059942&BST=`;
            const data = (await axios.post(URL)).data;
            // console.log(data);
            if (data.status == 200) {
                closeModal()
                setConnectingCallModal(true)
                // Alert.alert("Alert", "Call conneting",
                //     [
                //         {
                //             text: "Ok",
                //             isPreferred: true,
                //             onPress: closeModal()
                //         }
                //     ]
                // )
            }
        } catch (error) {
            console.error("Colling Error", error);
        }
    }

    const collMessageHandler = (text) => {
        if (text == "Message") {
            setModalForCall(false)
        } else {
            setModalForCall(true)
        }
        setModalVisable(true)
    };

    const closeModal = () => {
        setModalVisable(false)
        setCarNumbers("")
        setPhoneNumber("")
        setSelectedIndex(null)
        setSelectedText("")
    }

    const RenderButton = ({ text }) => {
        return (
            <TouchableOpacity
                onPress={() => collMessageHandler(text)}
            >
                <View style={{ width: 130, paddingVertical: 10, alignItems: "center", backgroundColor: "black" }}>
                    <Text style={{ color: "white" }}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10 }}>
                    <View style={styles.logoimageView}>
                        <HomePageLogoImage style={styles.logoImage} />
                    </View>
                    <View style={styles.headerTextView}>
                        {/* <Text style={styles.headerText}>Vehicle Details</Text> */}
                    </View>
                    <View style={[styles.detailsViewContainer, { width: width - 100 }]}>
                        <View style={styles.detailsView}>
                            <Text style={styles.detailsLable}>Vehicle Type</Text>
                            <Text style={styles.detailsText}>{carType}</Text>
                        </View>
                        <View style={styles.detailsView}>
                            <Text style={styles.detailsLable}>Vehicle No.</Text>
                            <Text style={styles.detailsText}>{carNumber.slice(0, 4)}####</Text>
                        </View>
                        <View style={styles.detailsView}>
                            <Text style={styles.detailsLable}>Vehicle Details</Text>
                            <Text style={styles.detailsText} numberOfLines={1}>{carName}</Text>
                        </View>
                    </View>

                    <View style={styles.list}>
                        <View style={[styles.itemViewContainer, { width: Dimensions.get("window").width - 50, }]}>
                            {data.map((item, index) => selecterRenderItem(item, index))}
                        </View>
                    </View>
                    <View style={[styles.buttonViewContainer, { marginTop: 20 }]}>
                        <CustomButton title={"Message"} onPress={() => collMessageHandler("Message")} />
                        <CustomButton title={"Private Call"} onPress={() => collMessageHandler("Call")} />
                        <CustomButton title={"Emergency"} bgColor={Color.Cansel_Button_Background_Color} />
                    </View>
                    {/* <View style={styles.buttonViewContainer}>
                    </View> */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: "#bfbfbf", fontSize: 12, textAlign: "center" }}>Dlease note any kind of spam will get your ip and number blocked on platform for 6 months.</Text>
                    </View>
                </View>
                {/* <Footer /> */}
            </ScrollView>
            <Modal
                transparent={true}
                animationType='slide'
                visible={modalVisable}
                onRequestClose={closeModal}
            >
                <View style={styles.modalRootContainer}>
                    <View style={styles.modalChildView}>
                        {/* Modal Header */}
                        {/* <View style={{ alignItems: "flex-end" }}>
                            <Ionicons name='close' color={Color.Button_Background_Color} size={30} onPress={closeModal} />
                        </View> */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeading}>Vehicle Details Form</Text>
                        </View>

                        {/* Car Number Input */}
                        <View style={styles.inputContainer}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.modallabelText}>Last four digit vehicle number</Text>
                                <Ionicons name='star' color={"red"} size={7} />
                            </View>

                            <Text style={styles.carNumberPreview}>
                                {carNumber?.slice(0, 4)}####
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Enter last four digit of vehicle num'
                                placeholderTextColor='gray'
                                keyboardType='phone-pad'
                                maxLength={4}
                                numberOfLines={1}
                                value={carNumbers}
                                onChangeText={setCarNumbers}

                            />
                        </View>

                        {/* Phone Number Input */}
                        <View style={styles.inputContainer}>
                            {
                                modalForCall ?
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.modallabelText}>Enter your phone number here </Text>
                                        <Ionicons name='star' color={"red"} size={7} />
                                    </View> :
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.modallabelText}>Enter your phone number here</Text>
                                    </View>
                            }

                            <TextInput
                                style={styles.textInput}
                                placeholder={modalForCall ? "Enter your phone number" : "Your phone number (Optional)"}
                                placeholderTextColor='gray'
                                keyboardType='phone-pad'
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>

                        {/* Information Text */}
                        <Text style={styles.infoText}>Your phone number will remain secure and private during this Message communication and will not be shared anywhere else.</Text>

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                                {
                                    modalForCall ?
                                        <CustomButton title={"Call"} onPress={connectCollHandler} /> :
                                        <CustomButton title={"Send"} onPress={sendMessageHandler} />
                                    // <Buttons title={"Call"} bgColor={Color.Submit_Button_Background_Color} textColor={Color.Button_Text_Color} onClick={connectCollHandler} /> :
                                    // <Buttons title={"Message"} bgColor={Color.Submit_Button_Background_Color} textColor={Color.Button_Text_Color} onClick={sendMessageHandler} />
                                }
                            </View>
                            <View style={styles.button}>
                                <CustomButton title={"Cancel"} onPress={closeModal} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal
                transparent={true}
                animationType='slide'
                visible={connectingCallModal}
                onRequestClose={() => setConnectingCallModal(false)}
            >
                <View style={styles.modalRootContainer}>
                    <View style={styles.modalChildView}>
                        {/* Modal Header */}
                        <View style={[styles.modalHeader, { marginBottom: 7 }]}>
                            <Text style={[styles.modalHeading, { textAlign: "left" }]}>Connecting the call.</Text>
                        </View>
                        <View>
                            <Text style={styles.infoText}>you will receive a call from our system within 30 seconds. <MaterialIcons name='error-outline' /> Incase of abuse / spam your number and IP will be blocked for upto 6 months</Text>
                        </View>
                        <View>
                            <Text style={[styles.modallabelText, { fontSize: 19 }]}>You will recieve a call at the</Text>
                            <Text style={[styles.modallabelText, { fontSize: 19 }]}>9671059942</Text>
                        </View>
                        <View style={{ marginVertical: 15 }}>
                            <View style={{ backgroundColor: "#232222", borderRadius: 7, paddingVertical: 9, }}>
                                <Text style={{ color: "red", textAlign: "center", fontSize: 20 }}>Connecting the call...</Text>
                            </View>
                        </View>

                        <Text style={styles.infoText}>
                            incase you did not receive a call please check your phone number given above and check if its blocked by any sending the message instead
                        </Text>

                        <View style={{ borderWidth: 0.5, borderColor: "white" }}></View>

                        <View style={styles.buttonContainer}>
                            <Text style={{ color: Color.Button_Background_Color }} onPress={() => setConnectingCallModal(false)}>Close</Text>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

export default ContactVehicleOwner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        // paddingHorizontal: 20,
        backgroundColor: '#f9f9f9',
    },
    logoimageView: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        width: 150,
        objectFit: "contain"
    },
    headerTextView: {
        alignItems: "center",
        marginTop: 30

    },
    headerText: {
        color: Color.Header_Font_Color,
        fontSize: Font.HeaderFontSize,
        fontWeight: Bold.HeaderFontWeight,
    },

    detailsViewContainer: {
        marginTop: 10,
        // borderWidth: 1,
        marginHorizontal: "auto"
        // alignItems: "center",
    },
    detailsView: {
        flexDirection: "row",
    },
    detailsLable: {
        color: Color.Header_Fooler_Background_Color,
        fontSize: Font.LableFontSize,
        fontWeight: Bold.LableFontWeight,
        width: 150,
    },
    detailsText: {
        flex: 1,
        color: Color.Data_Font_Color,
        fontSize: Font.DataFontSize,
        fontWeight: Bold.DataFontWeight,
    },








    title: {
        fontSize: 22,
        fontWeight: '400',
        color: "black"
        // marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        // marginBottom: 5,
    },
    vehicleDetails: {
        fontWeight: 'bold',
        color: "red",
    },
    hiddenText: {
        color: 'black',
        // backgroundColor: "black",
    },
    description: {
        fontSize: 16,
        color: '#555',
    },
    list: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContainer: {
        // padding: 10,
        paddingVertical: 8,
        // paddingHorizontal: 30,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
    },
    selectedItem: {
        backgroundColor: Color.Button_Background_Color, // Highlight color for selected item
        borderWidth: 2,
        borderColor: "gray"
    },
    iconContainer: {
        marginRight: 15,
    },
    labelContainer: {
        flex: 1,
    },
    labelText: {
        fontSize: 16,
        color: "black",
        fontWeight: "700"
    },
    selectedText: {
        color: Color.Button_Text_Color, // Change text color for selected item
        fontWeight: "800"
    },
    itemViewContainer: {
        marginHorizontal: "auto"
    },

    buttonViewContainer: {
        marginTop: 10,
        // marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around"
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
    modalRootContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalChildView: {
        width: '90%',
        backgroundColor: '#fff',
        // backgroundColor: 'black',
        borderRadius: 10,
        padding: 20,
        elevation: 5, // Shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Shadow position for iOS
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalHeader: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.Button_Background_Color,
        textAlign: "center",
        flex: 1,
    },
    modalCloseButton: {
        padding: 5,
    },
    modalCloseText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    modallabelText: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.Button_Background_Color,
        marginBottom: 5,
    },
    carNumberPreview: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.Button_Background_Color,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Color.Button_Background_Color,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        // backgroundColor: "black",
        color: Color.Button_Background_Color,
    },
    infoText: {
        fontSize: Font.SimpalFontSize,
        color: Color.Simple_Text_Color,
        // textAlign: 'center',
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: "center"
    },
    button: {
        width: 100
        // flex: 1,
        // padding: 10,
        // borderRadius: 8,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    callButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});
