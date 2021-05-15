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

function Turma({route, navigation}) {
    
    const isFocused = useIsFocused()

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

    //CHAMADO QUANDO O USUARIO RETORNA A TELA 
    useEffect(() => {
        if (isFocused){
          getInfos();
        }
      }, [isFocused])

    // useEffect(() => {
    //     getInfos();
    // }, [])

    function goToAdicionarAluno(){
        navigation.navigate('AdicionarAluno', {id_turma: id})
    }

    function inspectAula (id_aula, tema) {
        navigation.navigate('Aula', {id_aula: id_aula, tema: tema});
    }

    function goToAdicionarAula(){
        navigation.navigate('AdicionarAula', {id_turma: id, mail: mail})
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
                            if (v.id_aula)
                                return(
                                <AulaCard
                                    key={i}
                                    onPress={() => inspectAula(v.id_aula, v.tema)}
                                    tema={v.tema}
                                    horario={v.data + " - " + v.hora}
                                    data={v.data}
                                    hora={v.hora}
                                    id={v.id_aula}
                                    updateAulasAfterDeletion={navigation}
                                    isProf={true}
                            />)
                        })
                    }
                
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