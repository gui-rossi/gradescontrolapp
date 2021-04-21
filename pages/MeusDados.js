import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BlueButton from '../components/BlueButton';
import GoBack from '../components/GoBack';

function MeusDados({props, route, navigation}) {

    const { name, mail, celular } = route.params;

    return (
        <>
        <GoBack
            name={"Meus dados"}
            navigation={navigation}
        />
        <View style={styles.page}>
            <View style={styles.row}>
                <Text style={{fontSize: 20}}>Nome:</Text>
                <Text style={styles.name}>{name}</Text>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.row}>
                <Text style={{fontSize: 20}}>Email:</Text>
                <Text style={styles.name}>{mail}</Text>
            </View>
            
            <View style={styles.separator}></View>

            <View style={styles.row}>
                <Text style={{fontSize: 20}}>Celular:</Text>
                <Text style={styles.name}>{celular}</Text>
            </View>

            <View style={styles.separator}></View>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    page: {
        margin: 24,
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    name: {
        color: "#111D5E",
        fontWeight: "bold",
        fontSize: 18,
        paddingTop: 10,
    },
    row: {
        padding: 20
    },
    separator: {
        borderTopWidth: 3,
        borderColor: "#DCDCDC", 
        borderStyle: 'solid',
    },
});

export default MeusDados;
