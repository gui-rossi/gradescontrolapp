import React, { useEffect, useState} from 'react';
import { StyleSheet, CheckBox, Text, View, TouchableOpacity, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import BlueButton from "../components/BlueButton";
import GoBack from "../components/GoBack";

import postNotificacoes from './../services/postNotificacoes'
import getAulasTodas from "../services/getAulasTodas"

import { showScheduledNotificationWithoutSound, showScheduledNotificationWithSound, cancelAllNotifications, showNotification } from './../notifications'

function GerenciarNotificacoes({route, navigation}) {

    const { somBefore, notificacaoBefore, mail_aluno } = route.params;

    const [isSomSelected, setIsSomSelected] = useState(somBefore);
    const [isNotificacaoSelected, setIsNotificacaoSelected] = useState(notificacaoBefore);

    function calculaSegundos(data, hora){
        let dataAula = new Date (data.split('/')[2] + "-" + data.split('/')[1] + "-" + data.split('/')[0] + "T" + hora.split(':')[0] + ":" + hora.split(':')[1]);
        let now = new Date();
        now = now.setHours(now.getHours() - 3);
        let nowAux = new Date(now);

        let secondsBetween = dataAula - nowAux;
        return (secondsBetween/1000) //milisegundos
    }

    function recreateAllNotifications(aulas, somNot, notification){
        cancelAllNotifications();
        
        if (notification && !somNot){ //selecionei so notificacao sem som
            for (let i = 0; i < aulas.length; i++){
                console.warn("SEM SOM")
                let segundos = calculaSegundos(aulas[i].data, aulas[i].hora);
                
                if (segundos > 0)
                    showScheduledNotificationWithoutSound(aulas[i].id_aula, 'notifications', 'Sua aula começou!', `Acompanhe a aula de ${aulas[i].tema}`, segundos)
            }
        }
        else if (notification && somNot){ //selecionei notificacao com som
            for (let i = 0; i < aulas.length; i++){
                console.warn("COM SOM")
                let segundos = calculaSegundos(aulas[i].data, aulas[i].hora);
                
                if (segundos > 0)
                    showScheduledNotificationWithSound(aulas[i].id_aula, 'notifications', 'Sua aula começou!', `Acompanhe a aula de ${aulas[i].tema}`, segundos)
            }
        }

    }

    async function editNotifications(somNot, notification){
        await getAulasTodas.getAllAulas(mail_aluno)
        .then((v) => {
            recreateAllNotifications(v.data, somNot, notification)
            navigation.goBack();
        })
        .catch((e) => {
            throw e;
        })
        
    }

    async function saveNotificacoes(){

        await postNotificacoes.putNotificacao(isSomSelected, isNotificacaoSelected, mail_aluno)
        .then((v) => {
            editNotifications(isSomSelected, isNotificacaoSelected);
        })
        .catch((e) => {
            throw e;
        })
    }

    useEffect(() => {
        if (!isNotificacaoSelected)
            setIsSomSelected(false);
    }, [isNotificacaoSelected])

    return (
        <>
            <GoBack
                name={"Gerenciar Notificações"}
                navigation={navigation}
            />

            <View style={styles.container}>
                
                <View style={styles.line}>
                    <Text style={styles.options}>Notificação de aviso</Text>
                    <CheckBox
                        value={isNotificacaoSelected}
                        onValueChange={setIsNotificacaoSelected}
                    />
                </View>

                <View style={styles.separator}></View>

                {
                    isNotificacaoSelected && (
                    <>
                        <View style={styles.line}>
                            <Text style={styles.options}>Notificação de som</Text>
                            <CheckBox
                                value={isSomSelected}
                                onValueChange={setIsSomSelected}
                            />
                        </View>
                        
                        <View style={styles.separator}></View>
                    </>
                    )
                }

                <View style={styles.botao}>
                    <BlueButton
                        text={"Salvar"}
                        press={saveNotificacoes}
                        disabled={somBefore == isSomSelected && notificacaoBefore == isNotificacaoSelected}
                    />
                </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    separator: {
        borderTopWidth: 3,
        borderColor: "#DCDCDC", 
        borderStyle: 'solid',
    },
    container: {
        margin: 24,
    },
    line: {
      marginTop: 24,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },  
    options: {
      flexDirection: 'column',
      fontSize: 18,
      color: "#808080",
    },
    botao: {
        marginTop: 40,
    },
});

export default GerenciarNotificacoes;