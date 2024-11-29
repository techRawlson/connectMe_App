import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import url from '../constant/url';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddressPage = ({ navigation }) => {

    const UserDetails = useSelector(item => item.UserDetails)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = async () => {

        try {
            // 9354111045
            const URL = `${url}/api/address/user/${UserDetails.number}`;
            await axios.get(URL)

            navigation.navigate("Checkout Page")
        } catch (error) {
            if (error.status == 404) {
                if (formData.name && formData.email && formData.phone && formData.address1 && formData.city && formData.state && formData.postalCode && formData.country) {

                    const URL = `${url}/api/address/create`;
                    const body = {
                        userId: UserDetails.number,
                        fullName: formData.name,
                        email: formData.email,
                        phoneNumber: formData.phone,
                        addressLine1: formData.address1,
                        addressLine2: formData.address2,
                        city: formData.city,
                        state: formData.state,
                        postalCode: formData.postalCode,
                        country: formData.country,
                    };
                    try {
                        await axios.post(URL, body)
                        navigation.navigate("Checkout Page")
                    } catch (error) {
                        console.log(error);
                    }

                } else {
                    Alert.alert('Error', 'Please fill all fields.');
                }
            } else {
                console.error("Error in Fetching Address", error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cart Form</Text>

            {/* Name Input */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Phone Number"
                value={formData.phone}
                keyboardType='number-pad'
                onChangeText={(value) => handleInputChange('phone', value)}
            />

            <Text style={styles.label}>Address Line 1</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Address Line 1"
                value={formData.address1}
                onChangeText={(value) => handleInputChange('address1', value)}
            />

            <Text style={styles.label}>Address Line 2</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Address Line 2"
                value={formData.address2}
                onChangeText={(value) => handleInputChange('address2', value)}
            />

            {/* Address Input */}
            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your City"
                value={formData.city}
                onChangeText={(value) => handleInputChange('city', value)}
            />

            <Text style={styles.label}>State</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your State"
                value={formData.state}
                onChangeText={(value) => handleInputChange('state', value)}
            />

            <Text style={styles.label}>Postal Code</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Postal Code"
                value={formData.postalCode}
                keyboardType='number-pad'
                onChangeText={(value) => handleInputChange('postalCode', value)}
            />

            <Text style={styles.label}>Country</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Country"
                value={formData.country}
                onChangeText={(value) => handleInputChange('country', value)}
            />

            {/* Submit Button */}
            <CustomButton title={"Place Order"} onPress={handleSubmit} />
            {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
};

export default AddressPage;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
