import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    Dimensions,
    Image,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

// http://api/user-login/getUserByMobile/?loginMobileNumber=${localstorage.getItem(%27loginMobileNumber%27)}

const Profile = () => {


    const [isEditing, setIsEditing] = useState(false); // State to toggle between edit and save mode
    const [referse, setReferse] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        loginMobileNumber: "",

    });

    const [profileImage, setProfileImage] = useState("")


    const getData = async () => {
        setReferse(true);
        try {
            let data = await AsyncStorage.getItem("Login");
            let newData = JSON.parse(data);

            let URL = `http://192.168.1.111:8082/api/user-login/getUserLoginByMobile?loginMobileNumber=${newData.number}`;

            let res = await (await axios.get(URL)).data;

            // Set profile image
            setProfileImage(res.file);

            // Set formData with API response
            setFormData({
                name: res.name,
                email: res.email,
                loginMobileNumber: newData.number,
            });

            setReferse(false);
        } catch (error) {
            console.error("Fetching Data Error", error);
            setReferse(false);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };


    const pickFileFromGallery = async () => {
        const options = {
            mediaType: 'photo', // Options: 'photo', 'video', or 'mixed'
            quality: 1, // Image quality (1 is best)
        };

        const MAX_FILE_SIZE = 100 * 1024; // 100 KB (adjust as needed)

        try {
            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorMessage) {
                console.error('Image Picker Error:', result.errorMessage);
            } else {
                const { uri, type, fileName, fileSize } = result.assets[0]; // Get file details

                // Check file size
                if (fileSize > MAX_FILE_SIZE) {
                    alert('File size exceeds the 5MB limit. Please select a smaller file.');
                    return;
                }

                // Process valid file
                setFormData({
                    ...formData,
                    fileUri: uri,
                    fileType: type,
                    fileName: fileName,
                });

                console.log('Selected File:', { uri, type, fileName, fileSize });
            }
        } catch (error) {
            console.error('Error picking file:', error);
        }
    };


    const toggleEditSave = async () => {
        if (isEditing) {
            try {
                const newFormData = new FormData(formData);
                newFormData.append("name", formData.name);
                newFormData.append("email", formData.email);

                // Append the selected file
                const file = {
                    uri: formData.fileUri, // File URI
                    type: formData.fileType, // MIME type
                    name: formData.fileName, // File name
                };
                newFormData.append("file", file);

                const URL = `http://192.168.1.111:8082/api/user-login/${formData.loginMobileNumber}`;
                // console.log("formData", newFormData);

                const response = await axios.put(URL, newFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }
        setIsEditing(!isEditing);
    };




    return (
        <View style={styles.rootContainer}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={referse} onRefresh={getData} />
                }
            >
                {/* Profile Card */}
                <View style={styles.card}>
                    {/* Profile Image */}
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            onPress={pickFileFromGallery}
                            disabled={!isEditing}

                        >
                            <Image
                                style={styles.image}
                                source={profileImage ? { uri: `data:image/jpeg;base64,${profileImage}` } : require("../../assrts/image/ProfileIcon.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Your Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your name"
                            placeholderTextColor="#aaa"
                            editable={isEditing}
                            value={formData.name}
                            onChangeText={(text) => handleInputChange("name", text)}
                        />
                    </View>
                    {/* <View style={styles.inputView}>
                        <Text style={styles.labelText}>Vehicle Number</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter vehicle number"
                            placeholderTextColor="#aaa"
                            editable={isEditing}
                            value={formData.vehicleNumber}
                            onChangeText={(text) => handleInputChange("vehicleNumber", text)}
                        />
                    </View> */}
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your Email"
                            placeholderTextColor="#aaa"
                            editable={isEditing}
                            value={formData.email}
                            onChangeText={(text) => handleInputChange("email", text)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.labelText}>Mobile</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter mobile number"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            editable={false}
                            value={formData.loginMobileNumber}
                            onChangeText={(text) => handleInputChange("mobile", text)}
                        />
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={toggleEditSave}
                        >
                            <Text style={styles.buttonText}>
                                {isEditing ? "Save" : "Edit"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={() => {
                                setIsEditing(false);
                                console.log("Edit Cancelled");
                            }}
                            disabled={!isEditing}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Light background
        padding: 20,
    },
    card: {
        width: Dimensions.get("window").width - 50,
        padding: 20,
        borderRadius: 20,
        backgroundColor: "#fff",
        elevation: 5, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50, // Circular image
    },
    labelText: {
        paddingLeft: 10,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        color: "#333",
    },
    inputView: {
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 1,
        backgroundColor: "#28a745",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#dc3545",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
