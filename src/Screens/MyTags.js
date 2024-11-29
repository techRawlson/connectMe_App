import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    Pressable,
    Modal,
    TextInput,
    Button,
    ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Color from '../constant/Color';
import CustomButton from '../components/CustomButton';
import ToggleButton from '../components/ToggleButton';

const MyTags = () => {
    const [vehicles, setVehicles] = useState([]);
    const [referse, setReferse] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    // States for enable/disable functionality
    const [messageEnabled, setMessageEnabled] = useState(false);
    const [callsEnabled, setCallsEnabled] = useState(false);
    const [qrCodeEnabled, setQrCodeEnabled] = useState(false);

    const getData = async () => {
        try {
            let data = await AsyncStorage.getItem("Login");
            let newData = JSON.parse(data);

            setReferse(true);
            let URL = `http://192.168.1.111:8082/api/user-login/getUserDetailsByMobile?loginMobileNumber=${newData.number}`;
            console.log("Request URL:", URL);

            let res = (await axios.get(URL)).data;
            console.log("API Response:", res);

            setVehicles(res);
            setReferse(false);
        } catch (error) {
            console.error("Fetching Data Error", error);
            setReferse(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getVehicleIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'car':
                return <FontAwesome5 name="car" size={40} color={Color.Icon_Color} />;
            case 'bus':
                return <FontAwesome5 name="bus" size={40} color={Color.Icon_Color} />;
            case 'truck':
                return <FontAwesome5 name="truck" size={40} color={Color.Icon_Color} />;
            case 'bike':
                return <MaterialCommunityIcons name="motorbike" size={40} color={Color.Icon_Color} />;
            case 'bicycle':
                return <MaterialCommunityIcons name="bicycle" size={40} color={Color.Icon_Color} />;
            default:
                return <MaterialCommunityIcons name="car" size={40} color={Color.Icon_Color} />;
        }
    };

    const showDetails = (vehicle) => {
        setSelectedVehicle(vehicle);
        setModalVisible(true);
    };
    const handleSave = () => {
        const updatedVehicles = vehicles.map((v) =>
            v.TagId === selectedVehicle.TagId ? selectedVehicle : v
        );
        setVehicles(updatedVehicles);
        setModalVisible(false);
    };

    const VehicleCard = ({ vehicle }) => {
        return (
            <Pressable onPress={() => showDetails(vehicle)}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        {getVehicleIcon(vehicle.vehicleType)}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Tag Id: </Text>
                            {vehicle?.TagId}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Vehicle Number: </Text>
                            {vehicle.vehicleNumber}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Owner Name: </Text>
                            {vehicle.name}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.label}>Contact Number: </Text>
                            {vehicle.tagRegisterNumber}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ padding: 20 }}>
                <FlatList
                    data={vehicles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <VehicleCard vehicle={item} />}
                    refreshControl={<RefreshControl refreshing={referse} onRefresh={getData} />}
                />
            </View>
            {selectedVehicle && (
                <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                                <Text style={styles.modalTitle}>Edit Vehicle Details</Text>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Vehicle Details</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={selectedVehicle.vehicleDetails}
                                        onChangeText={(text) =>
                                            setSelectedVehicle({ ...selectedVehicle, vehicleDetails: text })
                                        }
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Contact Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={selectedVehicle.tagRegisterNumber}
                                        onChangeText={(text) =>
                                            setSelectedVehicle({ ...selectedVehicle, tagRegisterNumber: text })
                                        }
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Owner Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={selectedVehicle.name}
                                        onChangeText={(text) =>
                                            setSelectedVehicle({ ...selectedVehicle, name: text })
                                        }
                                    />
                                </View>


                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Tag Id</Text>
                                    <TextInput
                                        style={styles.input}
                                        editable={false}
                                        value={selectedVehicle.TagId}

                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Vehicle Number</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={selectedVehicle.vehicleNumber}
                                        onChangeText={(text) =>
                                            setSelectedVehicle({ ...selectedVehicle, vehicleNumber: text })
                                        }
                                    />
                                </View>

                                {/* Enable/Disable Buttons */}
                                <View style={styles.statusContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text style={styles.inputLabel}>Message:</Text>
                                        <ToggleButton isEnabled={messageEnabled} setIsEnabled={setMessageEnabled} />
                                    </View>
                                    {/* <Text>User will not be able to contact you via SMS.</Text> */}
                                </View>

                                <View style={styles.statusContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text style={styles.inputLabel}>Calls:</Text>
                                        <ToggleButton isEnabled={callsEnabled} setIsEnabled={setCallsEnabled} />
                                    </View>
                                    {/* <Text>User will not be able to contact you via Calls.</Text> */}
                                </View>


                                <View style={styles.statusContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Text style={styles.inputLabel}>QR Code:</Text>
                                        <ToggleButton isEnabled={qrCodeEnabled} setIsEnabled={setQrCodeEnabled} />
                                    </View>
                                    {/* <Text>QR code will be deactivated until re-enabled.</Text> */}
                                </View>

                                <View style={styles.buttonRow}>
                                    <CustomButton title={"Save"} onPress={handleSave} />
                                    <CustomButton title={"Cancel"} onPress={() => setModalVisible(false)} />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    card: {
        flexDirection: 'row',
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
        borderColor: Color.Card_Border_Color,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginTop: 6,
    },
    label: {
        fontWeight: 'bold',
        color: Color.Modal_Text_Color,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: '90%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    statusContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default MyTags;