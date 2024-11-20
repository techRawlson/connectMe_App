import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import hooks

const Footer = ({ isScannerActive, setIsScannerActive }) => {
    const route = useRoute(); // Get current route
    const navigation = useNavigation(); // For navigation if needed

    // Handle scan button click
    const handleScanClick = () => {
        setIsScannerActive(!isScannerActive); // Toggle the scanner state
    };

    // Conditionally disable the button or not render it based on route
    const isHomePage = route.name === 'Home Page'; // Assuming 'Home' is the name of the home route

    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Back clicked')}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            {/* Render scan button only if on the Home page */}

            <TouchableOpacity
                style={[styles.scanButton, styles.centerButton]}
                onPress={isHomePage ? handleScanClick : null}
            >
                <MaterialIcons name="qr-code-scanner" size={32} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Help clicked')}>
                <MaterialIcons name="help" size={24} color="black" />
                <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#89f336',
        height: 70,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    button: {
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        color: 'black',
    },
    scanButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    centerButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
