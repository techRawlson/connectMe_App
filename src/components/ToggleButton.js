import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Color from '../constant/Color';

const ToggleButton = ({ isEnabled, setIsEnabled }) => {
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.label}>QR Code:</Text> */}
            <TouchableOpacity
                style={[
                    styles.switch,
                    isEnabled ? styles.switchEnabled : styles.switchDisabled,
                ]}
                onPress={toggleSwitch}
                activeOpacity={0.8}
            >
                <Animated.View
                    style={[
                        styles.slider,
                        isEnabled ? styles.sliderEnabled : styles.sliderDisabled,
                    ]}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20,
    },
    label: {
        marginRight: 10,
        fontSize: 16,
        color: '#000',
    },
    switch: {
        position: 'relative',
        width: 60,
        height: 34,
        borderRadius: 34,
        backgroundColor: '#ccc',
        justifyContent: 'center',
    },
    switchEnabled: {
        backgroundColor: Color.Button_Background_Color,
    },
    switchDisabled: {
        backgroundColor: Color.Disable_Button_Background_Color,
    },
    slider: {
        position: 'absolute',
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: '#fff',
        bottom: 4,
        left: 4,
        transform: [{ translateX: 0 }],
        transition: 'transform 0.4s ease',
    },
    sliderEnabled: {
        transform: [{ translateX: 26 }],
    },
    sliderDisabled: {
        transform: [{ translateX: 0 }],
    },
});

export default ToggleButton;
