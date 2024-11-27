import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpInput = ({ length, value, onChangeText }) => {
    const inputRefs = useRef([]);

    const handleChange = (text, index) => {
        const newValue = value.split("");
        newValue[index] = text;
        onChangeText(newValue.join(""));

        if (text && index < length - 1) {
            // Move focus to the next input field
            inputRefs.current[index + 1]?.focus();
        } else if (!text && index > 0) {
            // Move focus to the previous input field if backspace
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array.from({ length }, (_, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value[index] || ""}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        fontSize: 18,
        borderRadius: 5,
    },
});

export default OtpInput;
