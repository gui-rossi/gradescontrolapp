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
import AlunoCard from '../components/AlunoCard';
import GenericModal from '../components/GenericModal';

import infosAlunosAula from './../services/infosAlunosAula'
import removeFalta from './../services/removeFalta'


function Aula({route, navigation}) {
    
    const isFocused = useIsFocused()

    const { id_aula, tema } = route.params;
    const [infos, setInfos] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    
    async function removerFalta (mail_aluno) {
        await removeFalta.postRemocaoFalta(id_aula, mail_aluno)
        .then((v) => {
            setMessage("Falta removida.");
            setModalVisible(!modalVisible);
            infos.map((v, i) => { if (v.mail == mail_aluno) v.presente = true; return v })
        })
        .catch((e) => {
            setMessage("Aconteceu um erro.");
            setModalVisible(!modalVisible);
        })
    }

    async function getInfos(){
        await infosAlunosAula.getStatusPresencaAlunos(2)
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
                name={tema}
                navigation={navigation}
            />

            <View style={styles.subtitle}>
                <Text style={styles.font}>
                    Data: {infos[0] ? infos[0].data : ''} - { infos[0] ? infos[0].hora : ''} 
                </Text>
            </View>

            <SafeAreaView style={styles.scrollview}>
                <ScrollView>

                    {
                        infos.map((v, i) => {
                            return(
                            <AlunoCard
                                key={i}
                                onPress={() => removerFalta(v.mail) ? !v.presente : ''}
                                aluno={v.nomeAluno}
                                id_aluno={v.mail}
                                data={v.data + " - " + v.hora}
                                status={v.presente ? "Presente" : "Ausente"}
                        />)
                        })
                    }
                
                </ScrollView>
            </SafeAreaView>
            <GenericModal 
                message={message}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
        </>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        margin: 12,
        height: '85%',
    },
    font: {
        fontSize: 20,
        color: "#111D5E",
    },
    subtitle: {
        marginTop: 24,
        marginLeft: 24,
    }
});

export default Aula;