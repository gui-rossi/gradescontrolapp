import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";


function BlueButton(props) {

    return (
        <TouchableOpacity style={styles.button}
            onPress={props.press}
        >
            <Text style={styles.text}>
                {props.text}
            </Text>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    button: {
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