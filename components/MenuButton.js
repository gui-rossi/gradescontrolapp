import React from 'react';
import { View, StyleSheet, Text } from "react-native";

function MenuButton(props) {
    return (
        <>
            <View style={styles.dash}></View>
            <View style={styles.dash}></View>
            <View style={styles.dash}></View>
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