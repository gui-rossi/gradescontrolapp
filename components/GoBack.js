import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

function GoBack(props) {
    return (
        <View style={styles.backgroundNavbar}>
            <TouchableOpacity
                style={styles.navbar}   
                onPress={() => props.navigation.goBack()}
            >
                {/* <Icon name="arrow-left" size={25} color="#ffffff"/> */}
                <Text style={styles.goback}>❮    {props.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        margin: 12,
        height: '77%',
    },
    goback: {
        fontWeight: "bold", 
        marginLeft: 16, 
        fontSize: 25, 
        color: "#ffffff",
    },
    backgroundNavbar: {
        backgroundColor: "#111D5E",
        padding: 24,
    },
    navbar: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
});



export default GoBack;