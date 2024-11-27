import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Color from "../constant/Color";

const CustomButton = ({ title, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.Button_Background_Color,
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: Color.Disable_Button_Background_Color,
    },
    buttonText: {
        color: Color.Button_Text_Color,
        fontWeight: "bold",
        fontSize: 16,
    },
});

