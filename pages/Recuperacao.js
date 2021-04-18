import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import BlueButton from "../components/BlueButton";
import InputField from '../components/InputField';
import GenericModal from '../components/GenericModal';

import recoverPassword from "../services/recoverPassword"

import { Formik } from 'formik'
import * as yup from 'yup'

function Recuperacao({ props, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("Usuário não cadastrado.");

    async function recuperarSenha (values){
        await recoverPassword.getPassword(values.email)
            .catch(e => {
                setMessage("Usuário não cadastrado."); 
                setModalVisible(!modalVisible);
            })
            .then((v) => {
                setMessage("Senha enviada para o seu email.");
                setModalVisible(!modalVisible);
            });
    };

    useEffect(() => {
        if (modalVisible == false && message == "Senha enviada para o seu email."){
            navigation.navigate('Login')
        }
    }, [modalVisible])

    return (
        <View style={styles.page}>
            <Formik
                validationSchema={recoverSenhaValidation}
                initialValues={{ email: '' }}
                onSubmit={values => recuperarSenha(values)}
            >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                dirty,
                touched
            }) => (
                <>
                <Text>
                    Digite seu email:
                </Text>

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="email"
                    placeholder="usuario@email.br"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
                {(errors.email && touched.email) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                }

                <View style={styles.botao}>
                    <BlueButton
                        text={"Recuperar senha"}
                        press={handleSubmit}
                        disabled={!(isValid && dirty)}
                    />
                </View>
                </>
            )}
            </Formik>

            <GenericModal 
                message={message}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />

        </View>
    );
}

const recoverSenhaValidation = yup.object().shape({
    email: yup
        .string()
        .email("Por favor insira um email válido.")
        .required('Email é obrigatório.')
  })

const styles = StyleSheet.create({
    page: {
        margin: 24,
    },
    botao: {
        marginTop: 40,
    },
    cont: {
        marginTop: 24,
        width: "100%",
    },
    input: {
        margin: 7,
    },
});

export default Recuperacao;