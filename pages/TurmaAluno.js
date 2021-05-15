import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationAction, useIsFocused } from "@react-navigation/native"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import BlueButton from '../components/BlueButton';
import AulaCard from '../components/AulaCard';
import GoBack from '../components/GoBack';
import AddAulaCard from '../components/AddAulaCard';

import getAulas from './../services/getAulas'

function TurmaAluno({route, navigation}) {

    const isFocused = useIsFocused()
    
    const { id_turma, mail_aluno, index } = route.params;
    const [infos, setInfos] = useState([]);

    async function getInfos() {
        await getAulas.getAulasAluno(id_turma, mail_aluno)
        .then((v) => {
            setInfos(v.data)
        })
        .catch((e) => {
          throw e;
        })
    }

    //CHAMADO QUANDO O USUARIO RETORNA A TELA 
    useEffect(() => {
        if (isFocused){
            getInfos();
        }
    }, [isFocused])

    // useEffect(() => {
    //     getInfos();
    // }, [])

    return (
        <>
            <GoBack
                name={"Turma " + index}
                navigation={navigation}
            />

            <SafeAreaView style={styles.scrollview}>
                <ScrollView>

                    {
                        infos.map((v, i) => {
                            return(
                            <AulaCard
                                key={i}
                                tema={v.tema}
                                horario={v.data + " - " + v.hora}
                                data={v.data}
                                hora={v.hora}
                                id={v.id_aula}
                                email_aluno={mail_aluno}
                                isAluno={true}
                                presenca={v.presente}
                        />)
                        })
                    }
                
                </ScrollView>
            </SafeAreaView>

        </>
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

export default TurmaAluno;