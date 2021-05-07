import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationAction } from "@react-navigation/native"
import TextLink from './TextLink';

function AlunoCard(props) {

    return (
        <View style={styles.padding}>
            <View style={styles.row}>
                <Text style={styles.font}>{props.aluno}</Text>
            </View>
            
            <View style={styles.row}>
                <Text style={styles.subFont}>Status de presença: </Text>
                <Text style={props.status == "Ausente" ? styles.subSubFontAusente : styles.subSubFontPresente}>{props.status}</Text>
            </View>

            {
                props.status == "Ausente" &&
                <View style={styles.link}>
                    <TextLink 
                        text={"Remover falta"}
                        function={(id) => props.onPress(id)}
                    />
                </View>
            }
        
        </View>
    );
}

const styles = StyleSheet.create({
    subSubFontAusente: {
        color: "#ff0000",
        fontSize: 15,
        fontWeight: "bold",
    },
    subSubFontPresente: {
        color: "#00cc00",
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

export default AlunoCard;