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
import AlunoCard from '../components/AlunoCard';

function Aula({route, navigation}) {

    const { tema, dia, hora } = route.params;

    function removerFalta () {
        console.warn("falta removida")
    }

    return (
        <>
            <GoBack
                name={tema}
                navigation={navigation}
            />

            <View style={styles.subtitle}>
                <Text style={styles.font}>
                    Data: {dia} - {hora} 
                </Text>
            </View>

            <SafeAreaView style={styles.scrollview}>
                <ScrollView>
                    <AlunoCard
                        onPress={removerFalta}
                        aluno={"Chastinbam"}
                        data={"02/10/1994 - 08:00am"}
                        status={"Ausente"}
                    />
                    <AlunoCard
                        aluno={"Guilherme"}
                        data={"02/10/1994 - 08:00am"}
                        status={"Presente"}
                    />
                
                </ScrollView>
            </SafeAreaView>
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