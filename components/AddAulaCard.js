import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationAction } from "@react-navigation/native"
import TextLink from './TextLink';

function AddAulaCard(props) {

    function cancelarAula() {
        console.warn("cancelando aula")
    }

    return (
        <View style={styles.padding}>
            <TouchableOpacity
                onPress={() => props.onPress()}
                
            >
                    <View style={styles.row}>
                        <Text style={styles.font}>Adicionar aula</Text>
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.subFont}>Seleciona dia, hora e tema da aula a ser adicionada.</Text>
                    </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    font: {
        textDecorationLine: "underline",
        color: "#111D5E",
        fontWeight: "bold",
        fontSize: 18,
    },
    subFont: {
        color: "#BEBEBE",
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
    }
});

export default AddAulaCard;