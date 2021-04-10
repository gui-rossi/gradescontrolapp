import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import BlueButton from "../components/BlueButton";
import InputField from '../components/InputField';

import cadastroService from "../services/cadastroService"

function Cadastro({ navigation }) {

    const [nome, onChangeNome] = useState("");
    const [celular, onChangeCelular] = useState("");
    const [mail, onChangeEmail] = useState("");
    const [senha, onChangeSenha] = useState("");
    const [repetirSenha, onChangeRepetirSenha] = useState("");

    async function cadastrarProfessor (){
        await cadastroService.postCadastroProfessor(mail, senha)
            .catch(e => {throw e})
            .then(() => navigation.navigate('Login'))
    }

    async function cadastrarAluno (){
        
    }

    async function onClickCadastrar () {
        if (repetirSenha != senha){
            console.warn("Os campos de senha diferem um do outro");
        }else{
            if (mail.split('@').pop().contains('utfpr'))
                cadastrarAluno();
            else if (mail.split('@').pop().contains('gmail'))
                cadastrarProfessor();
        }
    }

    return (
        <View style={styles.page}>
            <SafeAreaView>
                <ScrollView>
                    <Text>
                        Insira seus dados:
                    </Text>

                    <InputField
                        placeholder="Nome Completo*"
                        isSecure={false}
                        changeText={onChangeNome}
                    />

                    <InputField
                        placeholder="Celular*"
                        isSecure={false}
                        changeText={onChangeCelular}
                    />

                    <InputField
                        placeholder="E-mail*"
                        isSecure={false}
                        changeText={onChangeEmail}
                    />

                    <InputField
                        placeholder="Senha*"
                        isSecure={true}
                        changeText={onChangeSenha}
                    />

                    <InputField
                        placeholder="Repetir senha*"
                        isSecure={true}
                        changeText={onChangeRepetirSenha}
                    />

                    <View style={styles.botao}>
                        <BlueButton
                            text={"Cadastrar"}
                            press={onClickCadastrar}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    page: {
        margin: 24,
    },
    botao: {
        marginTop: 40,
    }
});

export default Cadastro;