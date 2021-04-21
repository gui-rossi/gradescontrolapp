import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import BlueButton from "../components/BlueButton";
import InputField from '../components/InputField';
import GenericModal from '../components/GenericModal';
import { BaseNavigationContainer } from '@react-navigation/native';
import GoBack from '../components/GoBack';

import recoverPassword from "../services/recoverPassword";

import { Formik } from 'formik'
import * as yup from 'yup'

function ModifyPassword({ props, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("Dados inválidos.");

    async function modificarSenha (values){
        // await recoverPassword.getPassword(values.email)
        //     .catch(e => {
        //         setMessage("Senha Velha incorreta."); 
        //         setModalVisible(!modalVisible);
        //     })
        //     .then((v) => {
        //         setMessage("Senha redefinida.");
        //         setModalVisible(!modalVisible);
        //     });
    };

    useEffect(() => {
        if (modalVisible == false && message == "Senha redefinida."){
            navigation.navigate('HomeProfessor')
        }
    }, [modalVisible])

    return (
        <>
        <GoBack
            name={"Alterar senha"}
            navigation={navigation}
        />
        <View style={styles.page}>
            <Formik
                validationSchema={modifySenhaValidation}
                initialValues={{ senha: '', novaSenha: '', confirmacaoNovaSenha: '' }}
                onSubmit={values => modificarSenha(values)}
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
                    Digite sua senha antiga e a senha nova:
                </Text>

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="senha"
                    placeholder="Senha Antiga*"
                    onChangeText={handleChange('senha')}
                    onBlur={handleBlur('senha')}
                    value={values.senha}
                />
                {(errors.senha && touched.senha) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.senha}</Text>
                }
                
                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="novaSenha"
                    placeholder="Senha Nova*"
                    onChangeText={handleChange('novaSenha')}
                    onBlur={handleBlur('novaSenha')}
                    value={values.novaSenha}
                />
                {(errors.novaSenha && touched.novaSenha) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.novaSenha}</Text>
                }

                <TextInput
                    style={styles.input}
                    underlineColorAndroid={"black"}
                    name="confirmacaoNovaSenha*"
                    placeholder="Confirmação da Senha Nova"
                    onChangeText={handleChange('confirmacaoNovaSenha')}
                    onBlur={handleBlur('confirmacaoNovaSenha')}
                    value={values.confirmacaoNovaSenha}
                />
                {(errors.confirmacaoNovaSenha && touched.confirmacaoNovaSenha) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmacaoNovaSenha}</Text>
                }

                <View style={styles.botao}>
                    <BlueButton
                        text={"Salvar"}
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
        </>
    );
}

const modifySenhaValidation = yup.object().shape({
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

export default ModifyPassword;