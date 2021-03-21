import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import TextLink from './TextLink';

function EmailSenha(props) {

    return (
        <View style={styles.cont}>
            <TextInput
                style={styles.input}
                placeholder={"usuario@email.br"}
                underlineColorAndroid={"black"}
                onChangeText={text => props.changeEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={"senha"}
                underlineColorAndroid={"black"}
                secureTextEntry={true}
                onChangeText={text => props.changeSenha(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        marginTop: 58,
        width: "100%",
    },
    input: {
        margin: 7,
    },
    
});

export default EmailSenha;