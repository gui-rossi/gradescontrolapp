import React, { useEffect, useState} from 'react';
import { StyleSheet, CheckBox, Text, View, TouchableOpacity, Button } from 'react-native';
import BlueButton from "../components/BlueButton";
import GoBack from "../components/GoBack";

function GerenciarNotificacoes({route, navigation}) {

    const { somBefore, notificacaoBefore } = route.params;

    const [isSomSelected, setIsSomSelected] = useState(somBefore);
    const [isNotificacaoSelected, setIsNotificacaoSelected] = useState(notificacaoBefore);

    function saveNotificacoes(){

    }


    return (
        <>
            <GoBack
                name={"Gerenciar Notificações"}
                navigation={navigation}
            />

            <View style={styles.container}>
                
                <TouchableOpacity onPress={() => props.alterarSenha()}>
                    <View style={styles.line}>
                        <Text style={styles.options}>Notificação de aviso</Text>
                        <CheckBox
                            value={isNotificacaoSelected}
                            onValueChange={setIsNotificacaoSelected}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.separator}></View>

                <TouchableOpacity onPress={() => props.alterarSenha()}>
                    <View style={styles.line}>
                        <Text style={styles.options}>Notificação de som</Text>
                        <CheckBox
                            value={isSomSelected}
                            onValueChange={setIsSomSelected}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.separator}></View>

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