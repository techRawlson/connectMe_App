import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl } from 'react-native';
import Footer from './Footer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';

const MyTags = () => {
    const [vehicles, setVehicles] = useState([]);  // State to hold vehicles
    const [referse, setReferse] = useState(false);  // State for loading

    // Function to fetch data
    const getData = async () => {
        try {
            let data = await AsyncStorage.getItem("Login");
            let newData = JSON.parse(data);

            setReferse(true);
            let URL = `http://192.168.1.111:8082/api/user-login/getUserDetailsByMobile?loginMobileNumber=${newData.number}`;
            console.log("Request URL:", URL);

            let res = (await axios.get(URL)).data;
            console.log("API Response:", res);

            setVehicles(res);  // Set the response data into the vehicles state
            setReferse(false);  // Stop loading
        } catch (error) {
            console.error("Fetching Data Error", error);
            setReferse(false);  // Stop loading on error
        }
    };

    useEffect(() => {
        getData();  // Fetch data when the component mounts
    }, []);

    // FontAwesome5 car
    // FontAwesome5 bus
    // Fontisto truck
    // MaterialCommunityIcons motorbike
    // MaterialCommunityIcons bicycle-cargo


    const getVehicleIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'car':
                return <FontAwesome5 name="car" size={40} />;
            case 'bus':
                return <FontAwesome5 name="bus" size={40} />;
            case 'truck':
                return <FontAwesome5 name="truck" size={40} />;
            case 'bike':
                return <MaterialCommunityIcons name="motorbike" size={40} />;
            case 'bicycle':
                return <MaterialCommunityIcons name="bicycle" size={40} />;
            default:
                return <MaterialCommunityIcons name="car" size={40} />; // Default to car icon
        }
    };


    // Vehicle Card Component
    const VehicleCard = ({ vehicle }) => {
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    {getVehicleIcon(vehicle.vehicleType)}
                    {/* <Text style={styles.model}>{vehicle.vehicleType}</Text> */}
                </View>
                <View>
                    {/* <Text style={styles.model}>{vehicle.vehicleType}</Text> */}
                    <Text style={styles.text}><Text style={styles.label}>Vehicle Number: </Text>{vehicle.vehicleNumber}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Owner Name: </Text>{vehicle.name}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Vehicle Details: </Text>{vehicle.vehicleDetails}</Text>
                    <Text style={styles.text}><Text style={styles.label}>Contact Number: </Text>{vehicle.tagRegisterNumber}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, padding: 16 }}>
                <FlatList
                    data={vehicles}  // Pass the vehicles array
                    keyExtractor={(item, index) => index.toString()}  // Use index as key
                    renderItem={({ item }) => <VehicleCard vehicle={item} />}
                    refreshControl={<RefreshControl refreshing={referse} onRefresh={getData} />}  // Handle pull to refresh
                />
            </View>
            <Footer />
        </View>
    );
};

export default MyTags;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    card: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 8,
        marginRight: 20
    },
    model: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginTop: 6,
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
});
