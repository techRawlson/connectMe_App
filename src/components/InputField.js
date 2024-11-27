import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Color from "../constant/Color";

const InputField = ({ placeholder, value, onChangeText, ...props }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={Color.Input_Fild_PlaceHolder_Text_Color}
            {...props}
        />
    );
};

export default InputField;

const styles = StyleSheet.create({
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: Color.Input_Fild_Border_Color,
        backgroundColor: Color.Input_Fild_Background_Color,
        color: Color.Input_Fild_Text_Color,

    },
});
