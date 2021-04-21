import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationAction } from "@react-navigation/native"
import TextLink from './TextLink';

function AulaCard(props) {

    function cancelarAula() {
        console.warn("cancelando aula")
    }

    return (
        <View style={styles.padding}>
            <TouchableOpacity
                onPress={() => props.onPress()}
            >
                <View style={styles.row}>
                    <Text style={styles.font}>{props.tema}</Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.subFont}>Horário da aula: </Text>
                    <Text style={styles.subSubFont}>{props.horario}</Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.subFont}>Status da aula: </Text>
                    <Text style={styles.subSubFont}>{props.status}</Text>
                </View>
                
            </TouchableOpacity>
            <View style={styles.link}>
                <TextLink 
                    text={"Cancelar aula"}
                    function={() => cancelarAula()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subSubFont: {
        color: "#111D5E",
        fontSize: 15,
        fontWeight: "bold",
    },
    font: {
        color: "#111D5E",
        fontWeight: "bold",
        fontSize: 18,
    },
    subFont: {
        fontSize: 15,
    },
    padding: {
        margin: 12,
        padding: 16,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
        },
    row: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8
    },
    link: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 8,
        alignSelf: 'flex-end'
    }
});

export default AulaCard;