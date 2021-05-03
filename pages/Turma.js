import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationAction } from "@react-navigation/native"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import BlueButton from '../components/BlueButton';
import AulaCard from '../components/AulaCard';
import GoBack from '../components/GoBack';
import AddAulaCard from '../components/AddAulaCard';

import getAulas from './../services/getAulas'

function Turma({route, navigation}) {

    const { id, mail, index } = route.params;
    const [infos, setInfos] = useState([]);

    async function getInfos() {
        await getAulas.getAulasProf(id, mail)
        .then((v) => {
            setInfos(v.data)
        })
        .catch((e) => {
          throw e;
        })
    }

    useEffect(() => {
        getInfos();
    }, [])

    function goToAdicionarAluno(){
        navigation.navigate('AdicionarAluno')
    }

    function inspectAula () {
        navigation.navigate('Aula', {tema: "Queda da Bastilha", dia: "02/10/1994", hora: "08:00"});
    }

    function goToAdicionarAula(){
        navigation.navigate('AdicionarAula')
    }

    function finalizadaInprogressOrScheduled(data, hora){
        let date = new Date (data.split('/')[2] + "-" + data.split('/')[1] + "-" + data.split('/')[0] + "T" + hora.split(':')[0] + ":" + hora.split(':')[1]);
        let currentTime = new Date();

        if (date >= currentTime.addHours(2))
            return "Agendada"
        else if (date >= currentTime && date <= currentTime.addHours(2))
            return "Em progresso"
        else if (date <= currentTime)
            return "Finalizada"
    }

    return (
        <>
            <GoBack
                name={"Turma " + index}
                navigation={navigation}
            />

            <SafeAreaView style={styles.scrollview}>
                <ScrollView>
                    <AddAulaCard
                        onPress={goToAdicionarAula}
                    />

                    {
                        infos.map((v, i) => {
                            return(
                            <AulaCard
                                key={i}
                                onPress={inspectAula}
                                tema={v.tema}
                                horario={v.data + " - " + v.hora}
                                status={() => finalizadaInprogressOrScheduled(v.data, v.hora)}
                                isProf={true}
                        />)
                        })
                    }

                    {/* <AulaCard
                        onPress={inspectAula}
                        tema={"Queda da Bastilha"}
                        horario={"02/10/1994 - 08:00am"}
                        status={"Finalizada"}
                        isProf={true}
                    /> */}
                
                </ScrollView>
            </SafeAreaView>

            
            <View style={{alignItems: 'center'}}>
                <BlueButton
                    text={"Adicionar aluno"}
                    press={goToAdicionarAluno}
                    disabled={false}
                />
            </View>

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

export default Turma;