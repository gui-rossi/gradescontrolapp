import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text } from "react-native";

function MenuButton(props) {
    return (
        <>
        <TouchableOpacity
            onPress={props.press}
        >
            <View style={styles.dash}></View>
            <View style={styles.dash}></View>
            <View style={styles.dash}></View>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    dash: {
        width: 30,
        height: 4,
        backgroundColor: "#ffffff",
        margin: 4,
    }
});

export default MenuButton;