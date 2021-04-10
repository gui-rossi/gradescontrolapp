import React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';

function InputField(props) {
    return (
        <View style={styles.cont}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                underlineColorAndroid={"black"}
                secureTextEntry={props.isSecure}
                onChangeText={text => props.changeText(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        marginTop: 24,
        width: "100%",
    },
    input: {
        margin: 7,
    },
    
});

export default InputField;