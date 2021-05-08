import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationAction } from "@react-navigation/native"
import TextLink from './TextLink';

import deleteAula from './../services/deleteAula'
import removeFalta from './../services/removeFalta'

function AulaCard(props) {

    const [estado, setEstado] = useState('');
    const [marqueiPresenca, setMarqueiPresenca] = useState(false);

    async function cancelarAula() {
        await deleteAula.deleteAula(props.id)
        .then((v) => {
            props.updateAulasAfterDeletion;
            //JOGAR O USUARIO PARA TELA DE HOME SCREEN E FAZER RELOAD pelo endpoint OU PASSAR ESSA FUNCAO PARA FORA para tela de turma
        })
        .catch((e) => {
            throw e;
        })
    }

    async function marcarPresenca() {
        await removeFalta.postRemocaoFalta(props.id, props.email_aluno)
        .then((v) => {
            setMarqueiPresenca(true);
        })
        .catch((e) => {
            throw e;
        })
    }

    function finalizadaInprogressOrScheduled(){
        let currentTime = new Date();
        currentTime = new Date(currentTime.setHours(currentTime.getHours() - 3));
        let currentTimeAux = new Date(currentTime);
        let currentTimePlus2 = new Date(currentTimeAux.setHours(currentTimeAux.getHours() + 2));
        let dateAula = new Date (props.data.split('/')[2] + "-" + props.data.split('/')[1] + "-" + props.data.split('/')[0] + "T" + props.hora.split(':')[0] + ":" + props.hora.split(':')[1]);
        let dateAulaPlus2 = new Date(dateAula);
        dateAulaPlus2 = new Date(dateAulaPlus2.setHours(dateAulaPlus2.getHours() + 2));

        if (dateAula > currentTime)
            setEstado("Agendada")
        else if (dateAulaPlus2 < currentTime)
            setEstado("Finalizada")
        else 
            setEstado("Em progresso")

        // if (dateAula > currentTimePlus2)
        //     setEstado("Agendada")
        // else if (dateAula >= currentTime && date <= currentTimePlus2)
        //     setEstado("Em progresso")
        // else if (dateAula < currentTime)
        //     setEstado("Finalizada")
    }

    useEffect(() => {
        finalizadaInprogressOrScheduled();
    }, [])

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
                    <Text style={styles.subSubFont}>{estado}</Text>
                </View>

                {
                    props.isAluno &&
                    <View style={styles.row}>
                        <Text style={styles.subFont}>Presença: </Text>
                        <Text style={props.presenca || marqueiPresenca ? styles.subSubFontPresente : styles.subSubFontAusente}>{props.presenca || marqueiPresenca ? "Presente" : "Ausente"}</Text>
                    </View>
                }
            
            </TouchableOpacity>
            
            {
                props.isAluno && estado == "Em progresso" && !marqueiPresenca &&
                <View style={styles.link}>
                    <TextLink 
                        text={"Marcar presença"}
                        function={() => marcarPresenca()}
                    />
                </View>
            }

            {
                props.isProf && estado == "Agendada" &&
                <View style={styles.link}>
                    <TextLink 
                        text={"Cancelar aula"}
                        function={() => cancelarAula()}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    subSubFont: {
        color: "#111D5E",
        fontSize: 15,
        fontWeight: "bold",
    },
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

export default AulaCard;