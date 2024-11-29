import { Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { setUserDetails } from '../Redux/action'


const HomePage = ({ navigation }) => {
    const dispatch = useDispatch();

    const { getFromStorage } = useAsyncStorage()
    const UserDetails = useSelector((item) => item.UserDetails)

    const [isScannerActive, setIsScannerActive] = useState(false); // State to toggle scanner

    const IconMap = {
        AntDesign,
        Entypo,
        FontAwesome,
        FontAwesome6,
        FontAwesome5,
        MaterialCommunityIcons,
    };



    const getIdFromUrl = async (url) => {
        try {
            console.log("url", url);
            const match = url.match(/[?&]id=([^&]+)/); // Find `id` in the query string
            const id = match ? match[1] : null; // Extract the value
            await getData(id)
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
        if (profile == "My Tags" && !UserDetails?.login) {
            Alert.alert("Alert", "Plese Login first", [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "Login",
                    // style: "destructive",
                    onPress: () => { logOutHandler() }
                }
            ])
        } else {
            navigation.navigate(profile)
        }
    }

    const logOutHandler = async () => {
        await AsyncStorage.removeItem("Login")
        dispatch(setUserDetails({}));
        navigation.replace("Login")
    }

    let data = [
        // { title: "Profile", iconName: "user-alt", iconLable: "FontAwesome5" },
        { title: "Demo", iconName: "youtube", iconLable: "AntDesign", onPress: () => { changeScreen("Demo") } },
        { title: "Activate Tag", iconName: "tag", iconLable: "AntDesign", onPress: toggleScanner },
        { title: "Log out", iconName: "log-out", iconLable: "Entypo", onPress: logOutHandler },
        { title: "Support", iconName: "headset", iconLable: "FontAwesome5", onPress: () => { changeScreen("Support") } },
        { title: "Shop", iconName: "shopping-cart", iconLable: "FontAwesome5", onPress: () => { changeScreen("Shop Page") } },
        { title: "My Tags", iconName: "car", iconLable: "FontAwesome5", onPress: () => { changeScreen("My Tags") } },
        { title: "Social", iconName: "twitter", iconLable: "AntDesign", onPress: () => { changeScreen("Social") } },
        { title: "About", iconName: "circle-with-cross", iconLable: "Entypo" },
        { title: "FAQ", iconName: "info-circle", iconLable: "FontAwesome5", onPress: () => { changeScreen("Faq") } },

    ]

    // const getProfileData = async () => {
    //     try {
    //         let URL = `http://192.168.1.111:8082/api/user-login/getUserLoginByMobile?loginMobileNumber=${UserDetails.number}`
    //         let data = (await axios.get(URL)).data
    //         console.log("pro", data);
    //     } catch (error) {
    //         console.error("Fetching Data Error", error);
    //     }
    // }
    // useEffect(() => {
    //     getProfileData()
    // }, [])

    const RenderBox = ({ title, iconName, iconLable, onPress }) => {
        let Icon = IconMap[iconLable];
        return (
            < View style={styles.iconContainerView}>
                <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                    <View style={styles.iconView}>
                        <Icon name={iconName} size={30} color={Color.Icon_Color} />
                    </View>
                    <Text style={styles.iconText}>{title}</Text>
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <View style={styles.rootContainer} >
            <View style={styles.childContainer}>
                <View style={styles.animatedImageView}>
                    <AnimatedImageSlider />
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <RenderBox
                                key={index}
                                title={item.title}
                                iconName={item.iconName}
                                iconLable={item.iconLable}
                                onPress={item.onPress ? item.onPress : () => item.onPress}
                            />
                        )
                    }}
                    numColumns={3}
                />
            </View>
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
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0,0.7)" }}>
                    <QRCodeScanner
                        onRead={(data) => getIdFromUrl(data.data)}
                        reactivate={true}
                        reactivateTimeout={500}
                        showMarker={true}
                    />
                </View>
            </Modal >
        </View >
    )
}

export default HomePage

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // paddingHorizontal: 10,
        paddingTop: 20
    },
    childContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    animatedImageView: {
        marginBottom: 50,
        marginHorizontal: 10,
        overflow: "hidden",
        borderRadius: 20,
    },
    iconContainerView: {
        margin: "auto",
        marginBottom: 15,
        height: 80,
        width: 100,
        borderRadius: 10,
        padding: 10,
    },
    iconView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    iconText: {
        color: Color.Icon_Text,
        alignSelf: "center",
    }
})