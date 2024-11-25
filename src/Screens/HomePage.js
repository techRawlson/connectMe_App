import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import Footer from './Footer'
import Color from '../constant/Color'
import AnimatedImageSlider from './AnimatedImageSlider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'


const HomePage = ({ navigation }) => {

    const UserDetails = useSelector((item) => item.UserDetails)
    console.log("userDetails", UserDetails);

    const [isScannerActive, setIsScannerActive] = useState(false); // State to toggle scanner

    const IconMap = {
        AntDesign,
        Entypo,
        FontAwesome,
        FontAwesome6,
        FontAwesome5,
        MaterialCommunityIcons,
    };



    const getIdFromUrl = (url) => {
        try {
            console.log("url", url);
            const match = url.match(/[?&]id=([^&]+)/); // Find `id` in the query string
            const id = match ? match[1] : null; // Extract the value
            getData(id)
            setIsScannerActive(false);
        } catch (error) {
            console.error("Error parsing URL:", error.message);
        }
    };

    const getData = async (id) => {
        console.log(id);

        try {
            let URL = `http://192.168.1.111:8082/api/user/userDetails/${id}`

            let data = await (await axios.get(URL)).data
            console.log(data);


            if (data) {
                navigation.navigate("Contact Vehicle Owner", { data });
            }

        } catch (error) {
            if (error.status == 404) {
                navigation.navigate("Activate Tag", { id });
            } else {
                console.error("Get Data Error", error)
            }
        }
    }
    const toggleScanner = () => {
        console.log("toggleScanner");

        setIsScannerActive(true);
    };

    const changeScreen = (profile) => {
        navigation.navigate(profile)
    }

    const logOutHandler = async () => {
        await AsyncStorage.removeItem("Login")
        navigation.replace("Login")
    }

    let data = [
        // { title: "Profile", iconName: "user-alt", iconLable: "FontAwesome5" },
        { title: "Demo", iconName: "youtube", iconLable: "AntDesign" },
        { title: "Activate Tag", iconName: "tag", iconLable: "AntDesign", onPress: toggleScanner },
        { title: "Log out", iconName: "log-out", iconLable: "Entypo", onPress: logOutHandler },
        { title: "Support", iconName: "headset", iconLable: "FontAwesome5" },
        { title: "Shop", iconName: "shopping-cart", iconLable: "FontAwesome5", onPress: () => { changeScreen("Shop Page") } },
        { title: "My Tags", iconName: "car", iconLable: "FontAwesome5", onPress: () => { changeScreen("My Tags") } },

        { title: "Social", iconName: "twitter", iconLable: "AntDesign" },
        { title: "About", iconName: "circle-with-cross", iconLable: "Entypo" },
        { title: "Feq", iconName: "circle-with-cross", iconLable: "Entypo" },

    ]

    const getProfileData = async () => {
        try {
            console.log("getProfileData");
            let savedData = JSON.parse(await AsyncStorage.getItem("Login"))
            let number = savedData.number
            // let URL = `http://192.168.1.111:8082/api/user-login/getUserLoginByMobile?loginMobileNumber=${number}`
            // let data = (await axios.get(URL)).data
            // console.log("pro", data);
        } catch (error) {
            console.error("Fetching Data Error", error);
        }
    }
    useEffect(() => {
        getProfileData()
    }, [])

    const RenderBox = ({ title, iconName, iconLable, onPress }) => {
        let Icon = IconMap[iconLable];
        return (
            < View style={{ borderWidth: 1, borderColor: "#ddd", margin: "auto", marginBottom: 10, height: 80, width: 100, borderRadius: 10, padding: 10, }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Icon name={iconName} size={30} />
                    </View>
                    <Text style={{ textAlign: "center" }}>{title}</Text>
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <View style={styles.rootContainer} >
            {/* <ScrollView> */}
            < View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={{ marginBottom: 50, overflow: "hidden" }}>
                    <AnimatedImageSlider />
                </View>
                <View style={{}}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderBox key={index} title={item.title} iconName={item.iconName} iconLable={item.iconLable} onPress={item.onPress ? item.onPress : () => item.onPress} />
                            )
                        }}
                        numColumns={3}
                    />

                </View>
            </View>
            {/* </ScrollView> */}
            <Footer
                isScannerActive={isScannerActive}
                setIsScannerActive={setIsScannerActive}
            />


            < Modal
                visible={isScannerActive}
                transparent={true}
                onRequestClose={() => setIsScannerActive(false)
                }
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {/* <View style={{}}> */}
                    <QRCodeScanner
                        onRead={(data) => getIdFromUrl(data.data)}
                        reactivate={true}
                        reactivateTimeout={500}
                        showMarker={true}
                    />
                    {/* </View> */}
                </View>

            </Modal >
        </View >
    )
}

export default HomePage

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
        // paddingHorizontal: 10,
        paddingTop: 20
    },
    buttonViewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonView: {
        alignItems: "center",
        // borderWidth: 0.3,
        padding: 10,
        borderRadius: 15,
        overflow: "hidden",
        backgroundColor: Color.Button_BackGroung_Color,
        elevation: 5,

    },
    iconView: {

    },
    textView: {

    },
    text: {
        color: Color.Button_Text_Color
    },
})