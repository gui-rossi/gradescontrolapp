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

function TurmaAluno({route, navigation}) {

    const { name, aulas, andamento, status } = route.params;

    function goToAdicionarAluno(){
        navigation.navigate('AdicionarAluno')
    }

    return (
        <>
            <GoBack
                name={name}
                navigation={navigation}
            />

            <SafeAreaView style={styles.scrollview}>
                <ScrollView>
                    <AulaCard
                        tema={"Queda da Bastilha"}
                        horario={"02/10/1994 - 08:00am"}
                        status={"Em andamento"}
                        presenca={"Presente"}
                        isEmAndamento={true}
                    />
                    <AulaCard
                        tema={"Cálculo diferencial e integral II"}
                        horario={"04/10/1994 - 08:00am"}
                        status={"Finalizada"}
                        presenca={"Presente"}
                        isEmAndamento={false}
                    />
                
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