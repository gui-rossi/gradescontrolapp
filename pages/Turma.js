import React from 'react';
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

function Turma({route, navigation}) {

    const { name, aulas, status } = route.params;

    function goToAdicionarAluno(){
        navigation.navigate('AdicionarAluno')
    }

    function inspectAula () {
        navigation.navigate('Aula', {tema: "Queda da Bastilha", dia: "02/10/1994", hora: "08:00"});
    }

    function goToAdicionarAula(){
        navigation.navigate('AdicionarAula')
    }

    return (
        <>
            <GoBack
                name={name}
                navigation={navigation}
            />

            <SafeAreaView style={styles.scrollview}>
                <ScrollView>
                    <AddAulaCard
                        onPress={goToAdicionarAula}
                    />

                    <AulaCard
                        onPress={inspectAula}
                        tema={"Queda da Bastilha"}
                        horario={"02/10/1994 - 08:00am"}
                        status={"Finalizada"}
                    />
                
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