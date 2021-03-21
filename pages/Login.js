import Realm from "realm";
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Picture from "../components/Picture";
import EmailSenha from "../components/EmailSenha";
import TextLink from "../components/TextLink";
import BlueButton from "../components/BlueButton";

function Login (props) {

    const [mail, onChangeEmail] = useState("");
    const [senha, onChangeSenha] = useState("");

    function pressEntrar () {
        console.warn("natalia linda");
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
                    //function={}
                />
            </View>

            <View style={styles.botao}>
                <BlueButton
                    text={"Entrar"}
                    press={pressEntrar}
                />
            </View>

            <View style={styles.cadastro}>
                <Text style={styles.cadastroTxt}>
                    Ainda não possui uma conta?
                </Text>
                <TextLink
                    text={"Cadastre-se"}
                    //function={}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        margin: 24,
    },
    pic: {
        alignItems: 'center',
    },
    esqueci: {
        alignItems: "flex-end",
    },
    botao: {
        marginTop: 90,
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
