import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function TurmaCard(props) {
    return (
        <TouchableOpacity style={styles.padding}>
            <View>
                <View style={styles.row}>
                    <Text style={styles.font}>Turma {props.numTurma}</Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.subFont}>Número de alunos: </Text>
                    <Text style={styles.subSubFont}>{props.numAlunos}</Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.subFont}>Número de aulas: </Text>
                    <Text style={styles.subSubFont}>{props.numAulas}</Text>
                </View>
            
            </View>
        </TouchableOpacity>
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
    }
});

export default TurmaCard;