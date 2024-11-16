import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Color from '../constant/Color'

import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';


const HomePage = ({ navigation }) => {

    const [isScannerActive, setIsScannerActive] = useState(false); // State to toggle scanner



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
        try {
            let URL = `http://192.168.1.111:8082/api/user/userDetails/${id}`

            let data = await (await axios.get(URL)).data

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
        setIsScannerActive(!isScannerActive);
    };
    return (
        <View style={styles.rootContainer}>
            <Text>HomePage</Text>
            <View style={styles.buttonViewContainer}>
                {isScannerActive ?
                    <View style={styles.container}>
                        {isScannerActive ? (
                            <QRCodeScanner
                                onRead={(data) => getIdFromUrl(data.data)}
                                reactivate={true}
                                reactivateTimeout={500}
                                showMarker={true}
                            />
                        ) : (
                            <Text style={styles.centerText}>QR Code Scanner is Off</Text>
                        )}
                    </View> :
                    <TouchableOpacity style={styles.buttonView}
                        onPress={toggleScanner}
                    >
                        <View style={styles.iconView}>
                            <AntDesign name='camera' size={40} />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>Scan Tag</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
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
    }

})