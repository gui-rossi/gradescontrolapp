import React from 'react';
import { View, Text, StyleSheet } from "react-native";

function TextLink(props) {
    return (
        <View>
            <Text 
                style={styles.txt}
                onPress={props.function}  
            >
               {props.text} 
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 16,
        color: "rgb(25, 121, 255)",
        textDecorationLine: "underline",
    },
});

export default TextLink;