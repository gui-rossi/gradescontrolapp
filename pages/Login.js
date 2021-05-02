import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Picture from "../components/Picture";
import EmailSenha from "../components/EmailSenha";
import TextLink from "../components/TextLink";
import BlueButton from "../components/BlueButton";
import GenericModal from '../components/GenericModal';

import login from "../services/loginUser"

function Login ({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");

    const [mail, onChangeEmail] = useState("");
    const [senha, onChangeSenha] = useState("");

    async function pressEntrar () {
        await login.loginAlunoOrProf(mail, senha)
            .then((v) => {
                if (v.data == 1)
                    navigation.navigate('HomeAluno', {mail: mail})
                else if (v.data == 2)
                    navigation.navigate('HomeProfessor', {mail: mail})
            })
            .catch(e => {
                setMessage("Usuário ou senha incorretos."); 
                setModalVisible(!modalVisible);
            })
    };

    function devProf () {
        navigation.navigate('HomeProfessor', {mail: "profteste1@gmail.com"});
    }

    return (
        <View style={styles.page}>
            <View style={styles.pic}>
                <Picture
                    uri = {'https://reactnative.dev/img/tiny_logo.png'}
                />
            </View>

            <EmailSenha 
                changeEmail={onChangeEmail}
                changeSenha={onChangeSenha}
            />

            <View style={styles.esqueci}>
                <TextLink
                    text={"Esqueci a senha"}
                    function={() => navigation.navigate('Recuperacao')}
                />
            </View>

            <View style={styles.botao}>
                <BlueButton
                    text={"Entrar"}
                    press={pressEntrar}
                    disabled={!(mail.length && senha.length >= 8)}
                />
            </View>

            <View style={styles.cadastro}>
                <Text style={styles.cadastroTxt}>
                    Ainda não possui uma conta?
                </Text>
                <TextLink
                    text={"Cadastre-se"}
                    function={() => navigation.navigate('Cadastro')}
                />
            </View>

            <View style={{marginTop: 20}}>
                <BlueButton
                    text={"Entrar DEVELOPMENT"}
                    press={devProf}
                    disabled={false}
                />
            </View>

            <GenericModal 
                message={message}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        margin: 24,
    },
    pic: {
        marginTop: 25,
        alignItems: 'center',
    },
    esqueci: {
        alignItems: "flex-end",
    },
    botao: {
        marginTop: 60,
    },
    cadastro: {
        marginTop: 35,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
    },
    cadastroTxt: {
        fontSize: 16,
        paddingRight: 8,
    }
});

export default Login;
