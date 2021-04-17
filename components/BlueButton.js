import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";


function BlueButton(props) {

    return (
        <TouchableOpacity style={props.disabled ? styles.buttonDisabled : styles.buttonEnabled}
            onPress={props.press}
            disabled={props.disabled}
        >
            <Text style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    buttonDisabled: {
        opacity: 0.9,
        padding: 16,
        borderRadius: 6,
        backgroundColor: "#58608E",
    },
    buttonEnabled: {
        padding: 16,
        borderRadius: 6,
        backgroundColor: "#111D5E",
    },
    text: {
        fontSize: 20,
        color: "white",
        alignSelf: "center",
    }
});

export default BlueButton;